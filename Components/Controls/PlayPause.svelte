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

  function toggle() {
    if ($State.paused) runtime.Play();
    else runtime.Pause();
  }
</script>

<div class="group playpause">
  <button class="material-icons-round play suggested" on:click={toggle}>
    {$State.paused ? "play_arrow" : "pause"}
  </button>
</div>
