<script lang="ts">
  import { Runtime } from "$apps/MediaPlayer/ts/runtime";

  export let runtime: Runtime;

  function stop() {
    runtime.Stop();
  }
</script>

<div class="group stop">
  <button class="material-icons-round" on:click={stop}>stop</button>
</div>
