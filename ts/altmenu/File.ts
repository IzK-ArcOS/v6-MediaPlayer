import { SEP_ITEM } from "$state/Desktop/ts/store";
import { ShutdownIcon } from "$ts/images/power";
import { ContextMenuItem } from "$types/app";
import { Runtime } from "../runtime";

export function FileMenu(runtime: Runtime): ContextMenuItem {
  return {
    caption: "File",
    subItems: [
      {
        caption: "Open...",
        icon: "file_open",
        action() {
          runtime.openFile();
        },
        accelerator: "Alt+O",
      },
      {
        caption: "Open file location",
        icon: "folder_open",
        action: () => {
          runtime.openFileLocation();
        },
        disabled: () => !runtime.path.get(),
        accelerator: "Alt+Shift+O",
      },
      SEP_ITEM,
      {
        caption: "Exit",
        action: () => {
          runtime.closeApp();
        },
        image: ShutdownIcon,
        accelerator: "Alt+Q",
      },
    ],
  };
}
