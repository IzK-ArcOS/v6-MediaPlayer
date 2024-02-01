<script lang="ts">
  import { Runtime } from "$apps/MediaPlayer/ts/runtime";

  export let runtime: Runtime;

  const { State } = runtime;

  function play() {
    runtime.Play();
  }

  function pause() {
    runtime.Pause();
  }
</script>

<div class="group playpause">
  <button
    class="material-icons-round play"
    on:click={play}
    class:suggested={!$State.paused}
  >
    play_arrow
  </button>
  <button
    class="material-icons-round pause"
    on:click={pause}
    class:suggested={$State.paused}
  >
    pause
  </button>
</div>
