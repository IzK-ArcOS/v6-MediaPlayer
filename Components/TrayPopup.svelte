<script lang="ts">
  import { Runtime } from "../ts/runtime";
  import Bar from "./Bar.svelte";
  import "../css/tray.css";

  export let runtime: Runtime;

  const { State, Loaded, appMutator, path } = runtime;

  let current = "--:--";
  let duration = "--:--";

  function rewind() {
    runtime.Seek(-10);
  }

  function forward() {
    runtime.Seek(+10);
  }

  function toggle() {
    if ($State.paused) runtime.Play();
    else runtime.Pause();
  }

  State.subscribe((v) => {
    current = $Loaded ? runtime.formatTime(v.current) : "--:--";
    duration = $Loaded ? runtime.formatTime(v.duration) : "--:--";
  });
</script>

<div class="file">
  <img src={$appMutator.metadata.icon} alt="" /> <span>{$appMutator.metadata.name}</span>
</div>

<div class="controls">
  <button class="material-icons-round reverse" on:click={rewind} disabled={!$path || !$Loaded}>
    fast_rewind
  </button>
  <button
    class="material-icons-round play suggested"
    on:click={toggle}
    disabled={!$path || !$Loaded}
  >
    {$State.paused ? "play_arrow" : "pause"}
  </button>
  <button class="material-icons-round forward" on:click={forward} disabled={!$path || !$Loaded}>
    fast_forward
  </button>
</div>
<Bar {runtime} />
<div class="timestamps">
  <div class="current">{current}</div>
  <div class="duration">{duration}</div>
</div>
