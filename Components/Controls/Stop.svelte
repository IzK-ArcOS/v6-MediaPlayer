<script lang="ts">
  import { Runtime } from "$apps/MediaPlayer/ts/runtime";

  export let runtime: Runtime;

  function stop() {
    runtime.Stop();
  }
</script>

<button class="material-icons-round stop" on:click={stop}>stop</button>
