import { SEP_ITEM } from "$state/Desktop/ts/store";
import { ContextMenuItem } from "$types/app";
import { Runtime } from "../runtime";

export function AudioMenu(runtime: Runtime): ContextMenuItem {
  return {
    caption: "Playback",
    subItems: [
      {
        caption: "Play",
        icon: "play_arrow",
        action() {
          runtime.Play();
        },
      },
      {
        caption: "Pause",
        icon: "pause",
        action() {
          runtime.Pause();
        },
      },
      SEP_ITEM,
      {
        caption: "Stop",
        icon: "stop",
        action() {
          runtime.Stop();
        },
      },
    ],
  };
}
