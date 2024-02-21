import { MediaPlayerIcon } from "$ts/images/apps";
import { AudioMimeIcon, VideoMimeIcon } from "$ts/images/mime";
import { openFileWithApp } from "$ts/server/fs/open";
import { MimeTypeIcons } from "$ts/stores/filesystem";
import { FileHandler } from "$types/fs";

export const MediaPlayerHandler: FileHandler = {
  name: "Play Media",
  description: "Open this file in Media Player",
  extensions: [...MimeTypeIcons[AudioMimeIcon], ...MimeTypeIcons[VideoMimeIcon]],
  image: MediaPlayerIcon,
  handler(file) {
    openFileWithApp("MediaPlayer", file);
  },
};
