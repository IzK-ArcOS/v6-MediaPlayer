<script lang="ts">
  import { FileIcon } from "$ts/images/filesystem";
  import { getMimeIcon } from "$ts/server/fs/mime";
  import { pathToFriendlyPath } from "$ts/server/fs/util";
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  const { path } = runtime;

  let pathStr = "";
  let icon = FileIcon;

  path.subscribe((v) => {
    pathStr = pathToFriendlyPath(v);
    icon = getMimeIcon(v);
  });
</script>

<div class="file">
  <img src={icon} alt="" />
  <span>{pathStr}</span>
</div>
