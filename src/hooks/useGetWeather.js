import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../services';

export const useGetWeather = (lat, long) => {
  const response = useQuery({
    queryKey: ['weather', lat, long],
    queryFn: () => fetchWeather(lat, long),
  });
  return response;
};
