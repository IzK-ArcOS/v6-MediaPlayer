<script lang="ts">
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  const { State } = runtime;
</script>

<div class="bar">
  <div
    class="inner"
    style="--w: {(100 / $State.duration) * $State.current}%;"
  />
</div>
