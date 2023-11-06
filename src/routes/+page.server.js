import { API_CLIMA } from "$env/static/private";

export const load = async ({ locals, params }) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Bogotá,co&units=metric&appid=${API_CLIMA}`);
    
    if (response.ok) {
        const data = await response.json(); 
        console.log(data);
        return {
            props: {
                weatherData: data
            }
        };
    }
};
