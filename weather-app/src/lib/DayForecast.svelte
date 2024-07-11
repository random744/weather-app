<script lang="ts">
  import type { Day } from "./interfaces";

  export let day: Day;
</script>

<div class="card bg-primary text-base-100 w-[12rem]">
  <div class="card-body flex flex-col items-center">
    <h5 class="card-title">{day.dayName}</h5>
    <h6 class="card-subtitle">{day.readableDate}</h6>
    <div>
      {day.averageTemp}
    </div>
    <img src={day.icon} class="h-20 w-20" alt="temp" />
  </div>
</div>
