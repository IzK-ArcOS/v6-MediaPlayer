<script lang="ts">
  import { Runtime } from "$apps/MediaPlayer/ts/runtime";

  export let runtime: Runtime;

  function rewind() {
    runtime.Seek(-10);
  }
</script>

<button class="material-icons-round reverse" on:click={rewind}>
  fast_rewind
</button>
