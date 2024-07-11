<script lang="ts">
  import Forecast from "./Forecast.svelte";
  import type { WeatherResponse } from "./Weather";

  export let weatherResponse: WeatherResponse;
</script>

<div class="flex flex-col gap-5">
  <div class="text-center">
    {#if weatherResponse.icon}
      <img src={weatherResponse.icon} class="mx-auto h-20 w-20" alt="temp" />
    {/if}
    <h1 class="text-3xl font-bold mb-2">{weatherResponse.temperature}°C</h1>
    <h2 class="text-xl font-semibold text-gray-700 mb-4">
      {weatherResponse.city}
    </h2>
    <div class="flex justify-center space-x-8">
      <div class="flex items-center space-x-2">
        <img src="public/humidity.svg" class="h-6 w-6" alt="humidity" />
        <div>
          <p class="text-lg font-medium">{weatherResponse.humidity} %rH</p>
          <p class="text-sm text-gray-500">Feuchtigkeit</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <img src="public/wind.svg" class="h-6 w-6" alt="wind" />
        <div>
          <p class="text-lg font-medium">{weatherResponse.wind} km/h</p>
          <p class="text-sm text-gray-500">Geschwindigkeit</p>
        </div>
      </div>
      <br />
    </div>
  </div>

  <Forecast days={weatherResponse.forecast}></Forecast>
</div>
