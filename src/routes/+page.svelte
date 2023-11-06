<script setup>
    import { onMount, onDestroy } from 'svelte';
    import {
        Fondo,
        Principal
    } from '$lib/index.js';

    import dayjs from 'dayjs'
    import 'dayjs/locale/es'

    export let data;

    let weather = null;

    $: {
        if (data && data.props && data.props.weatherData) {
            weather = data.props.weatherData;
        }
    }

    const weatherTranslations = {
        "light rain": "lluvia ligera",
        "broken clouds": "nubes rotas",
        "overcast clouds": "nublado",
        "scattered clouds": "nubes dispersas",
    };

    function translateWeatherDescription(description) {
        return weatherTranslations[description] || description;
    }

    function roundTemperature(temp) {
        return Math.round(temp);
    }

    function getWeatherIconUrl(iconCode) {
        return `http://openweathermap.org/img/wn/${iconCode}.png`;
    }

    let currentTime = "";
    let currentDay = "";
    let currentNameDay = "";
    let currentMonth = "";
    let interval = "";

    onMount(() => {
        updateDateTime();
        interval = setInterval(updateDateTime, 1000);
    });

    function updateDateTime() {
        dayjs.locale('es');
        currentTime = dayjs().format('hh:mm:ss A');
        currentDay = dayjs().format('dddd').replace(/^\w/, (c) => c.toUpperCase());
        currentNameDay = dayjs().format('DD');
        currentMonth = dayjs().format('MMMM');
    }

    onDestroy(() => {
        clearInterval(interval);
    });
  </script>
  

    <main class="lg:min-h-screen relative flex items-stretch justify-center" style="background-image: url('src/lib/assets/montanas-con-nieve-en-el-bosque_1920x1080_xtrafondos 1.png'); background-size: cover;">

        <section class="w-full lg:w-[80%] py-6 px-5 flex items-center justify-between flex-col lg:flex-row" style="font-family: 'Roboto';">
            <div class="w-full h-full p-5 flex-col flex justify-between rounded-md" style="background-image: url('src/lib/assets/Frame 1.png'); background-size: cover;">
                <div class="text-3xl text-white font-medium">
                    <h2>{currentTime}</h2>
                    <h2>{currentDay ? `${currentDay}, ${currentNameDay} de ${currentMonth}` : 'Cargando...'}</h2>
                </div>

                <div>
                    <h1 class="text-white text-6xl font-semibold pt-28"> 
                        {roundTemperature(data.props.weatherData.list[0].main.temp)}°
                    </h1>
                    <h2 class="text-white text-3xl font-medium">Bogotá, Colombia.</h2>
                </div>
            </div>

           
            <div class="flex flex-col w-full h-full" style="font-family: 'Poppins';">
                <div class="bg-[#7084F2] w-full flex items-center h-full p-5 text-xl font-medium text-white">
                    <img src={getWeatherIconUrl(weather && weather.list[0].weather[0].icon)} alt="Weather icon" width="70" height="70">
                    <p>
                        Hoy: {roundTemperature(weather && weather.list[0].main.temp)}°, 
                        {translateWeatherDescription(weather && weather.list[0].weather[0].description)}
                    </p>
                </div>
                
                <div class="bg-[#BAC5F0] w-full flex items-center h-full p-5 text-xl font-medium text-[#808080]">
                    <img src={getWeatherIconUrl(weather && weather.list[8].weather[0].icon)} alt="Weather icon" width="70" height="70">
                    <p>
                        Mañana: {roundTemperature(weather && weather.list[8].main.temp)}°, 
                        {translateWeatherDescription(weather && weather.list[8].weather[0].description)}
                    </p>
                </div>
                
                <div class="bg-[#E4E7F2] rounded-b-md lg:rounded-none w-full h-full px-10 p-5 text-xl font-medium text-[#808080]">
                    <p>Próximos 5 días:</p>
                    <ul class="overflow-y-auto scroll h-[40vh] mt-3">
                        {#each weather && weather.list.slice(8, 40, 8) as day (day.dt)}
                        <li class="flex items-center gap-3">
                            <img class="bg-blue-200" src={getWeatherIconUrl(day.weather[0].icon)} alt="Weather icon" width="50" height="50">
                            {new Date(day.dt * 1000).toLocaleDateString('es-ES')}: 
                            {roundTemperature(day.main.temp)}°, 
                            {translateWeatherDescription(day.weather[0].description)}
                        </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </section>
        <div class="absolute bottom-0 text-center lg:text-right lg:right-4 text-white/20 font-medium">
            <p>Developer: Jhon Rivero</p>
        </div>
    </main>
<style>

.scroll::-webkit-scrollbar {
    width: 16px;
  }

  .scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .scroll::-webkit-scrollbar-thumb {
    background-color: rgb(98, 82, 235);
    border-radius: 6px;
    border: 3px solid #f1f1f1;
  }

  .scroll {
    scrollbar-width: thin;
    scrollbar-color: purple #f1f1f1;
  }

</style>