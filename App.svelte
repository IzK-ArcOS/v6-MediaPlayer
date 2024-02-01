<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";
  import Controls from "./Components/Controls.svelte";
  import Bar from "./Components/Bar.svelte";
  import File from "./Components/File.svelte";

  export let runtime: Runtime;

  let audio: HTMLAudioElement;

  onMount(() => {
    runtime.setPlayer(audio);
  });

  const { State, path } = runtime;
</script>

<audio bind:this={audio}></audio>
{#if $State && $path}
  <Controls {runtime} />
  <Bar {runtime} />
  <File {runtime} />
{/if}
