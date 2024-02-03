<script lang="ts">
  import { Runtime } from "$apps/MediaPlayer/ts/runtime";

  export let runtime: Runtime;

  function forward() {
    runtime.Seek(+10);
  }
</script>

<button class="material-icons-round forward" on:click={forward}>
  fast_forward
</button>
