<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";
  import Controls from "./Components/Controls.svelte";
  import Bar from "./Components/Bar.svelte";
  import File from "./Components/File.svelte";

  export let runtime: Runtime;

  let audio: HTMLVideoElement;

  onMount(() => {
    runtime.setPlayer(audio);
  });

  const { State, path, isVideo } = runtime;
</script>

<video bind:this={audio} class:show={$isVideo}>
  <track kind="captions" /></video
>
{#if $State && $path}
  <Bar {runtime} />
  <Controls {runtime} />

  <!-- <File {runtime} /> -->
{:else}
  <h2>No File Opened!</h2>
  <p>Select an audio to play from the File Menu or by pressing Alt+O.</p>
{/if}
