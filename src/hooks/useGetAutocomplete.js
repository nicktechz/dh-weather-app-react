import { useState } from 'react';
import cities from '../helpers/cities.json';

export default function useGetAutocomplete() {
  const [results, setResults] = useState(null);
  function searchCities(query) {
    const foundCities = cities
      .filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10);
    setResults(foundCities);
  }
  function resetCities() {
    setResults(null);
  }
  return { results, searchCities, resetCities };
}
