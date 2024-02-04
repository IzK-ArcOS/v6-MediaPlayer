<script lang="ts">
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  const { State, Loaded } = runtime;
</script>

<div class="bar" class:bounce={!$Loaded}>
  <div
    class="inner"
    style="--w: {(100 / $State.duration) * $State.current}%;"
  />
</div>
