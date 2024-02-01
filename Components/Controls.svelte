<script lang="ts">
  import { Runtime } from "../ts/runtime";
  import PlayPause from "./Controls/PlayPause.svelte";
  import Seek from "./Controls/Seek.svelte";
  import Stop from "./Controls/Stop.svelte";
  import Time from "./Controls/Time.svelte";

  export let runtime: Runtime;
</script>

<div class="controls">
  <PlayPause {runtime} />
  <Seek {runtime} />
  <Stop {runtime} />
  <Time {runtime} />
</div>
