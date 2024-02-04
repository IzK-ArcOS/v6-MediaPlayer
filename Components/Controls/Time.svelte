<script lang="ts">
  import { Runtime } from "$apps/MediaPlayer/ts/runtime";

  export let runtime: Runtime;

  const { State, Loaded } = runtime;

  let current = "--:--";
  let duration = "--:--";

  State.subscribe((v) => {
    current = $Loaded ? runtime.formatTime(v.current) : "--:--";
    duration = $Loaded ? runtime.formatTime(v.duration) : "--:--";
  });
</script>

<div class="timestamp">
  {current} / {duration}
</div>
