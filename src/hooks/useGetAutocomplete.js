import { useState } from 'react';

export default function useGetAutocomplete() {
  const [results, setResults] = useState(null);

  async function searchCities(query) {
    if (query.length >= 3) {
      try {
        const url = `https://x8ki-letl-twmt.n7.xano.io/api:ADz4CED1/cities?searchQuery=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        setResults(data.slice(0, 10));
      } catch (error) {
        console.error(error);
      }
    }
  }
  function resetCities() {
    setResults(null);
  }
  return { results, searchCities, resetCities };
}
