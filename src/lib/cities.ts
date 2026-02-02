export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export const CITIES: City[] = [
  // Europe
  { name: 'Paris', lat: 48.8566, lon: 2.3522, country: 'France' },
  { name: 'London', lat: 51.5074, lon: -0.1278, country: 'United Kingdom' },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050, country: 'Germany' },
  { name: 'Madrid', lat: 40.4168, lon: -3.7038, country: 'Spain' },
  { name: 'Rome', lat: 41.9028, lon: 12.4964, country: 'Italy' },
  { name: 'Amsterdam', lat: 52.3676, lon: 4.9041, country: 'Netherlands' },
  { name: 'Zürich', lat: 47.3769, lon: 8.5417, country: 'Switzerland' },
  { name: 'Frankfurt', lat: 50.1109, lon: 8.6821, country: 'Germany' },
  { name: 'Istanbul', lat: 41.0082, lon: 28.9784, country: 'Turkey' },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173, country: 'Russia' },
  
  // North America
  { name: 'New York', lat: 40.7128, lon: -74.0060, country: 'USA' },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, country: 'USA' },
  { name: 'Chicago', lat: 41.8781, lon: -87.6298, country: 'USA' },
  { name: 'Toronto', lat: 43.6532, lon: -79.3832, country: 'Canada' },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194, country: 'USA' },
  { name: 'Mexico City', lat: 19.4326, lon: -99.1332, country: 'Mexico' },
  { name: 'Vancouver', lat: 49.2827, lon: -123.1207, country: 'Canada' },
  { name: 'Miami', lat: 25.7617, lon: -80.1918, country: 'USA' },
  { name: 'Atlanta', lat: 33.7490, lon: -84.3880, country: 'USA' },
  
  // Asia
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'Japan' },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, country: 'Singapore' },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, country: 'UAE' },
  { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, country: 'China' },
  { name: 'Shanghai', lat: 31.2304, lon: 121.4737, country: 'China' },
  { name: 'Beijing', lat: 39.9042, lon: 116.4074, country: 'China' },
  { name: 'Seoul', lat: 37.5665, lon: 126.9780, country: 'South Korea' },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, country: 'India' },
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, country: 'India' },
  { name: 'Bangkok', lat: 13.7563, lon: 100.5018, country: 'Thailand' },
  
  // South America
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333, country: 'Brazil' },
  { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816, country: 'Argentina' },
  { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729, country: 'Brazil' },
  { name: 'Santiago', lat: -33.4489, lon: -70.6693, country: 'Chile' },
  { name: 'Bogotá', lat: 4.7110, lon: -74.0721, country: 'Colombia' },
  
  // Oceania
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, country: 'Australia' },
  { name: 'Melbourne', lat: -37.8136, lon: 144.9631, country: 'Australia' },
  { name: 'Auckland', lat: -36.8485, lon: 174.7633, country: 'New Zealand' },
  
  // Africa
  { name: 'Cairo', lat: 30.0444, lon: 31.2357, country: 'Egypt' },
  { name: 'Johannesburg', lat: -26.2041, lon: 28.0473, country: 'South Africa' },
  { name: 'Lagos', lat: 6.5244, lon: 3.3792, country: 'Nigeria' },
  { name: 'Nairobi', lat: -1.2921, lon: 36.8219, country: 'Kenya' },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241, country: 'South Africa' }
].sort((a, b) => a.name.localeCompare(b.name));
