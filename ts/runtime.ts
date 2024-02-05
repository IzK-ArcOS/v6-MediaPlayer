import { getAppById, spawnApp, spawnOverlay } from "$ts/apps";
import { AppRuntime } from "$ts/apps/runtime";
import { MediaPlayerIcon } from "$ts/images/apps";
import { AudioMimeIcon, VideoMimeIcon } from "$ts/images/mime";
import { Process } from "$ts/process";
import { getParentDirectory } from "$ts/server/fs/dir";
import { readFile } from "$ts/server/fs/file";
import { getMimeIcon } from "$ts/server/fs/mime";
import { FileProgress } from "$ts/server/fs/progress";
import { parseExtension, pathToFriendlyName, pathToFriendlyPath } from "$ts/server/fs/util";
import { MimeTypeIcons } from "$ts/stores/filesystem";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import { MediaPlayerAccelerators } from "./accelerators";
import { MediaPlayerAltMenu } from "./altmenu";
import { PlayerState } from "./types";

export class Runtime extends AppRuntime {
  public path = Store<string>();
  public url = Store<string>();
  public player: HTMLVideoElement;
  public State = Store<PlayerState>({ paused: true, current: 0, duration: 0 });
  public isVideo = Store<boolean>(false);
  public Loaded = Store<boolean>(false);

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    this.loadAltMenu(...MediaPlayerAltMenu(this))
    this.process.accelerator.store.push(...MediaPlayerAccelerators(this))
    this.openedFile.subscribe(async (v) => {
      if (!v) return;

      await this.readFile(v);
    });

    if (process.args.length && typeof process.args[0] === "string") {
      this.handleOpenFile(process.args[0])
    }
  }

  async readFile(v: string) {
    this.path.set(v);
    this.Loaded.set(false);

    const { setDone, setErrors } = await this.LoadProgress(v);

    const file = await readFile(v);


    if (!file) {
      setErrors(1);
      setDone(1);

      this.Loaded.set(true);


      return;
    }

    const ext = parseExtension(file.path);

    this.isVideo.set(MimeTypeIcons[VideoMimeIcon].includes(ext))
    this.url.set(URL.createObjectURL(file.data));
    this.setWindowTitle(pathToFriendlyName(v), false)
    this.setWindowIcon(getMimeIcon(v))

    this.Reset();

    setDone(1);

    setTimeout(() => {
      this.player.play();
      this.Loaded.set(true);

    });
  }

  public setPlayer(player: HTMLVideoElement) {
    this.player = player;

    this.player.addEventListener("timeupdate", () => this.updateState());
    this.player.addEventListener("pause", () => this.updateState());
    this.player.addEventListener("play", () => this.updateState());
  }

  public Reset() {
    if (!this.player) return;

    this.player.pause();
    this.player.src = this.url.get();
    this.player.currentTime = 0;
  }

  public Play() {
    if (!this.player) return;

    this.player.play();
  }

  public Pause() {
    if (!this.player) return;

    this.player.pause();
  }

  public Seek(mod: number) {
    if (!this.player) return;

    this.player.currentTime += mod;
  }

  public Stop() {
    if (!this.player) return

    this.player.pause();
    this.player.currentTime = 0;
  }

  public updateState() {
    if (!this.player) return {
      paused: true,
      current: 0,
      duration: 0,
    };

    const state = {
      paused: this.player.paused,
      current: this.player.currentTime,
      duration: this.player.duration
    }

    this.State.set(state);
  }

  public formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  public openFileLocation() {
    const path = this.path.get();

    if (!path) return

    const split = path.split("/");
    const filename = split[split.length - 1];

    spawnApp("FileManager", 0, [path.replace(filename, "") || ".", path])
  }

  public openFile() {
    spawnOverlay(getAppById("LoadSaveDialog"), this.pid, [
      {
        title: "Select an audio or video file to open",
        icon: MediaPlayerIcon,
        startDir: getParentDirectory(this.path.get() || "./"),
        extensions: [...MimeTypeIcons[AudioMimeIcon], ...MimeTypeIcons[VideoMimeIcon]]
      },
    ]);
  }

  public async LoadProgress(v: string = this.path.get()) {
    return await FileProgress({
      caption: "Loading this amazing file...",
      subtitle: `Home/${pathToFriendlyPath(v)}`,
      icon: MediaPlayerIcon,
      max: 1,
      done: 0,
      type: "quantity",
      waiting: false,
      working: true,
      errors: 0
    }, this.pid)
  }
}