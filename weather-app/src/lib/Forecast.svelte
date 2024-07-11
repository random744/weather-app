<script lang="ts">
  import DayForecast from "./DayForecast.svelte";
  import type { Day } from "./interfaces";

  export let days: Array<Day>;
</script>

<div class="flex gap-4">
  {#each days as day}
    <DayForecast {day}></DayForecast>
  {/each}
</div>
