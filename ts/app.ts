import { SafeMode } from "$state/Desktop/ts/store";
import { MediaPlayerIcon } from "$ts/images/apps";
import { HelpArticles } from "$ts/stores/articles";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const MediaPlayer: App = {
  metadata: {
    name: "Media Player",
    description: "Play audio files",
    author: "Izaak Kuipers",
    version: "3.0.0",
    icon: MediaPlayerIcon,
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "MediaPlayer",
  size: { w: 442, h: NaN },
  pos: { x: 100, y: 100 },
  minSize: { w: 442, h: 130 },
  maxSize: { w: NaN, h: NaN },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: true,
  },
  controls: {
    minimize: true,
    maximize: true,
    close: true,
  },
  acceleratorDescriptions: {
    "alt+o": "Open an audio file",
    "alt+shift+o": "Open file location of audio file",
  },
  glass: true,
  loadCondition: () => !SafeMode.get(),
  helpArticle: HelpArticles.mediaPlayer,
};
