<script lang="ts">
  import { checkWeather, type WeatherResponse } from "./Weather";
  import Weather from "./Weather.svelte";

  let city = "";

  let weatherResponse: WeatherResponse | undefined | null = undefined;

  async function handleKeyPress(event: any) {
    if (event.key === "Enter") {
      weatherResponse = await checkWeather(city);
    }
  }
</script>

<div class="flex justify-center pt-8">
  <div class="p-6 bg-stone-300 shadow-lg rounded-lg">
    <div class="flex items-center mb-4">
      <input
        type="text"
        placeholder="Eingabefeld"
        spellcheck="false"
        bind:value={city}
        on:keypress={handleKeyPress}
        class="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        on:click={handleKeyPress}
        class="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <img src="public/search.svg" class="h-5 w-5" alt="search" />
      </button>
    </div>

    {#if weatherResponse === null}
      <div class="text-red-500 mb-4">
        <p>Ungültiger Ortsname</p>
      </div>
    {:else if weatherResponse === undefined}
      <div class="mb-4">
        <p>Trage bitte einen Ort ein!</p>
      </div>
    {:else}
      <Weather weatherResponse={weatherResponse}></Weather>
    {/if}
  </div>
</div>
