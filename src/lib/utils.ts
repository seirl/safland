import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SAF_TYPES = [
  {
    id: 'corn',
    name: 'Corn (Ethanol-to-Jet)',
    yieldPerHa: 2800, // Liters per hectare per year
    color: '#FACC15', // Yellow
    description: 'Starch-based ethanol converted to jet fuel. Requires significant arable land.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 3.5 // ~3-4x fossil fuel
  },
  {
    id: 'soybean',
    name: 'Soybean (HEFA)',
    yieldPerHa: 600,
    color: '#4ADE80', // Green
    description: 'Oilseed crop. Lower yield per hectare compared to palm or algae.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 2.5 // ~2-3x fossil fuel
  },
  {
    id: 'rapeseed',
    name: 'Rapeseed/Canola (HEFA)',
    yieldPerHa: 1200,
    color: '#F59E0B', // Amber
    description: 'Common oilseed in Europe/NA. Moderate yield.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 2.5
  },
  {
    id: 'palm',
    name: 'Palm Oil (HEFA)',
    yieldPerHa: 4500,
    color: '#EA580C', // Orange
    description: 'High yield oil crop, but major concerns about deforestation and biodiversity.',
    harvestFrequency: 'Continuous harvest (Year-round)',
    priceMultiplier: 2.2 // Often cheapest bio-feedstock, but high environmental cost
  },
  {
    id: 'algae',
    name: 'Algae (Open Pond)',
    yieldPerHa: 25000,
    color: '#065F46', // Dark Green
    description: 'Microalgae grown in ponds. Extremely high theoretical yield but technically challenging.',
    harvestFrequency: 'Continuous harvest (Daily/Weekly)',
    priceMultiplier: 8.0 // Still experimental/expensive
  },
  {
    id: 'jatropha',
    name: 'Jatropha',
    yieldPerHa: 1500,
    color: '#84CC16', // Lime
    description: 'Hardy plant that can grow in marginal soils.',
    harvestFrequency: 'Annual/Bi-annual',
    priceMultiplier: 3.0
  },
  {
    id: 'efuel',
    name: 'E-Fuel (Solar PtL)',
    yieldPerHa: 52000,
    color: '#06B6D4', // Cyan
    description: 'Synthetic kerosene made from renewable electricity and CO2. Extremely land-efficient.',
    harvestFrequency: 'Requires 1 year of solar output',
    priceMultiplier: 5.0 // Currently 4-6x fossil fuel due to high electricity costs
  }
] as const;

export type SafType = typeof SAF_TYPES[number];

export const FLIGHT_CLASSES = [
  { id: 'economy', name: 'Economy', multiplier: 1.0 },
  { id: 'business', name: 'Business', multiplier: 2.5 }, // Heuristic: Business takes ~2.5x space/weight
] as const;

export type FlightClass = typeof FLIGHT_CLASSES[number];

// Flight heuristics
export const FUEL_CONSUMPTION_L_PER_100KM_PAX = 3.5; // Average modern aircraft
export const DEFAULT_PASSENGERS = 250; // Typical widebody
export const DEFAULT_SPEED_KPH = 850;

// Emissions
export const JET_FUEL_CO2E_PER_L = 2.5; // kg CO2e per liter of jet fuel (combustion)
export const SAF_EMISSION_REDUCTION = 0.8; // Average 80% reduction in lifecycle emissions

// Costs (USD)
export const JET_FUEL_PRICE_PER_L = 0.85; // Approx global average
export const SAF_PRICE_PREMIUM_MULTIPLIER = 2.5; // SAF is typically 2-3x more expensive
