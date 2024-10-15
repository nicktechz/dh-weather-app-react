import { useState } from 'react';

export default function useGetAutocomplete() {
  const [cities, setCities] = useState(null);
  async function search(searchQuery) {
    const urlOptions = {
      searchQuery: searchQuery,
      apiKey: import.meta.env.VITE_GEOPIFY_API,
    };
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${urlOptions.searchQuery}&type=city&format=json&apiKey=${urlOptions.apiKey}`;
    if (searchQuery.length > 3) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const values = data.results;
        const formattedArr = values.map((element) => {
          const obj = {
            city: element.city,
            country: element.country,
            code: element.country_code,
          };
          return obj;
        });
        setCities([...formattedArr]);
      } catch (err) {
        console.error(err);
      }
    }
  }
  function resetCities() {
    setCities(null);
  }
  return { cities, search, resetCities };
}
