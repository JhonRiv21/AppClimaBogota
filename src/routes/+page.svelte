<script setup>
    import { onMount } from 'svelte';
    import {
        Fondo,
        Principal
    } from '$lib/index.js';
  
    let data;
  
    onMount(async () => {
    const res = await fetch(`/?city=Bogotá`);
    const responseBody = await res.text();
    console.log("Respuesta del servidor:", responseBody);

    if (res.ok) {
        data = JSON.parse(responseBody);
    } else {
        console.error("Error al cargar datos en el frontend:", responseBody);
    }
    });
    $ : {
        console.log(data)
    }
  </script>
  

    <main class="h-screen flex justify-center items-center" style="background-image: url('src/lib/assets/montanas-con-nieve-en-el-bosque_1920x1080_xtrafondos 1.png'); background-size: cover;">

        <section class="w-full lg:w-[80%] py-6 px-5 flex h-full items-center justify-between flex-col lg:flex-row" style="font-family: 'Roboto';">
            <div class="w-full h-full p-5 flex-col flex justify-between rounded-md" style="background-image: url('src/lib/assets/Frame 1.png'); background-size: cover;">
                <div class="text-3xl text-white font-medium">
                    <h2>3:29 PM</h2>
                    <h2>Martes, 25 de enero.</h2>
                </div>

                <div>
                    <h1 class="text-white text-6xl font-semibold"> {data && data.list && data.list[0] ? `${data.list[0].main.temp}°` : 'Cargando...'}</h1>
                    <h2 class="text-white text-3xl font-medium">Bogotá, Colombia.</h2>
                </div>
            </div>

            <div class="flex flex-col w-full h-full" style="font-family: 'Poppins';">
                <div class="bg-[#7084F2] w-full h-full p-5 text-xl font-medium text-white">
                    <p>Hoy:</p>
                </div>
                
                <div class="bg-[#BAC5F0] w-full h-full p-5 text-xl font-medium text-[#808080]">
                    <p>Mañana:</p>
                </div>

                <div class="bg-[#E4E7F2] rounded-b-md lg:rounded-none w-full h-full p-5 text-xl font-medium text-[#808080]">
                    <p>Próximos 5 días:</p>
                </div>
            </div>
        </section>

    </main>
