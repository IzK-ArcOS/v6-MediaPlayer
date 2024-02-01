import { ContextMenuItem } from "$types/app";
import { AudioMenu } from "./altmenu/Audio";
import { FileMenu } from "./altmenu/File";
import { Runtime } from "./runtime";

export function MediaPlayerAltMenu(runtime: Runtime): ContextMenuItem[] {
  return [
    FileMenu(runtime),
    AudioMenu(runtime)
  ]
}