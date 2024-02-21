<script lang="ts">
  import { Runtime } from "$apps/MediaPlayer/ts/runtime";

  export let runtime: Runtime;

  function rewind() {
    runtime.Seek(-10);
  }

  function forward() {
    runtime.Seek(+10);
  }
</script>

<div class="group seek">
  <button class="material-icons-round reverse" on:click={rewind}> fast_rewind </button>
  <button class="material-icons-round forward" on:click={forward}> fast_forward </button>
</div>
