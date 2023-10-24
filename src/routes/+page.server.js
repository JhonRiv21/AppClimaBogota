import { API_CLIMA } from "$env/static/private";

export async function get({ query }) {
    const apiKey = API_CLIMA;
    const city = query.get('city') || 'Bogotá';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
    const data = await response.json();
  
    if (response.ok) {
      return {
        body: data
      };
    } else {
      return {
        status: response.status,
        body: data
      };
    }
  }
  