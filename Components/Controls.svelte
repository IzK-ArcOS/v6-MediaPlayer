<script lang="ts">
  import { Runtime } from "../ts/runtime";
  import Forward from "./Controls/Forward.svelte";
  import PlayPause from "./Controls/PlayPause.svelte";
  import Rewind from "./Controls/Rewind.svelte";
  import Stop from "./Controls/Stop.svelte";
  import Time from "./Controls/Time.svelte";

  export let runtime: Runtime;
</script>

<div class="controls">
  <Rewind {runtime} />
  <PlayPause {runtime} />
  <Forward {runtime} />
  <Stop {runtime} />
  <Time {runtime} />
</div>
