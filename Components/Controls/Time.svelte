<script lang="ts">
  import { Runtime } from "$apps/MediaPlayer/ts/runtime";

  export let runtime: Runtime;

  const { State } = runtime;

  let current = "--:--";
  let duration = "--:--";

  State.subscribe((v) => {
    current = runtime.formatTime(v.current);
    duration = runtime.formatTime(v.duration);
  });
</script>

<div class="timestamp">
  {current} / {duration}
</div>
