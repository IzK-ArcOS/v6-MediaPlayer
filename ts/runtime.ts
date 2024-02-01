import { AppRuntime } from "$ts/apps/runtime";
import { MediaPlayerIcon } from "$ts/images/apps";
import { Process } from "$ts/process";
import { readFile } from "$ts/server/fs/file";
import { getMimeIcon } from "$ts/server/fs/mime";
import { FileProgress } from "$ts/server/fs/progress";
import { pathToFriendlyName, pathToFriendlyPath } from "$ts/server/fs/util";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";
import { PlayerState } from "./types";

export class Runtime extends AppRuntime {
  public path = Store<string>();
  public url = Store<string>();
  public player = document.createElement("audio");
  public State = Store<PlayerState>({ paused: true, current: 0, duration: 100 });

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    this.openedFile.subscribe(async (v) => {
      if (!v) return;

      await this.readFile(v);
    });
  }

  async readFile(v: string) {
    this.path.set(v);

    const { setDone, setErrors } = await this.LoadProgress(v);

    const file = await readFile(v);

    if (!file) {
      setErrors(1);
      setDone(1);

      return;
    }

    this.url.set(URL.createObjectURL(file.data));
    this.setWindowTitle(pathToFriendlyName(v), false)
    this.setWindowIcon(getMimeIcon(v))

    this.Reset();

    setDone(1);

    setTimeout(() => {
      this.player.play();
    });
  }

  public setPlayer(player: HTMLAudioElement) {
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
      duration: 100,
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