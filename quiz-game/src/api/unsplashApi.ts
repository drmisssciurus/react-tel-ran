import type { City, CityPhoto } from '../types';

const API_URL = 'https://api.unsplash.com/photos/random';

type UnsplashResponse = {
  alt_description: string | null;
  urls: {
    regular: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
  };
};

export async function loadCityPhoto(city: City): Promise<CityPhoto> {
  const accessKey = import.meta.env.VITE_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('Missing access key');
  }
  const params = new URLSearchParams({
    query: city.searchQuery,
    orientation: 'landscape',
    content_filter: 'high',
    client_id: accessKey,
  });
  const response = await fetch(`${API_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to load photo: ${response.statusText}`);
  }
  const data = (await response.json()) as UnsplashResponse;
  return {
    url: data.urls.regular,
    alt: data.alt_description ?? `${city.name}, ${city.country}`,
    autorName: data.user.name,
    photoUrl: data.links.html,
  };
}
