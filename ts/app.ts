import { MediaPlayerIcon } from "$ts/images/apps";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const MediaPlayer: App = {
  metadata: {
    name: "Media Player",
    description: "Play audio files",
    author: "Izaak Kuipers",
    version: "3.0.0",
    icon: MediaPlayerIcon
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "MediaPlayer",
  size: { w: 442, h: NaN },
  pos: { x: 100, y: 100 },
  minSize: { w: 442, h: 130 },
  maxSize: { w: 442, h: NaN },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: false
  },
  controls: {
    minimize: true,
    maximize: false,
    close: true
  },
  glass: true
}