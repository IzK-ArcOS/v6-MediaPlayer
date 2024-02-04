<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";
  import Controls from "./Components/Controls.svelte";
  import Bar from "./Components/Bar.svelte";
  import File from "./Components/File.svelte";
  import { MediaPlayerIcon } from "$ts/images/apps";

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
  {#if !$isVideo}
    <div class="audio-visual">
      <span class="material-icons-round">music_note</span>
    </div>
  {/if}
  <Bar {runtime} />
  <Controls {runtime} />

  <!-- <File {runtime} /> -->
{:else}
  <div class="no-file">
    <img src={MediaPlayerIcon} alt="" />
    <h2>No File Opened!</h2>
    <p>Select a file to play from the File Menu or by pressing Alt+O.</p>
  </div>
{/if}
