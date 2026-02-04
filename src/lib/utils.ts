import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SAF_TYPES = [
  {
    id: 'corn',
    name: 'Corn (Ethanol)',
    yieldPerHa: 2700, // Avg of 2500-2900
    color: '#FACC15', // Yellow
    emoji: '🌽',
    description: 'Starch-based ethanol converted to jet fuel. Requires significant arable land.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 2.75 // Avg of 2.5-3.0
  },
  {
    id: 'soybean',
    name: 'Soybean (HEFA)',
    yieldPerHa: 630, // Updated to 630 based on Mero et al. (2025)
    color: '#4ADE80', // Green
    emoji: '🫘',
    description: 'Oilseed crop. Lower yield per hectare compared to palm or algae.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 1.75 // Avg of 1.5-2.0
  },
  {
    id: 'rapeseed',
    name: 'Rapeseed (HEFA)',
    yieldPerHa: 1700, // Updated to 1700 based on UFOP (2025)
    color: '#F59E0B', // Amber
    emoji: '🌼',
    description: 'Common oilseed in Europe/NA. Moderate yield.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 1.75 // Avg of 1.5-2.0
  },
  {
    id: 'palm',
    name: 'Palm Oil (HEFA)',
    yieldPerHa: 4250, // Updated to 4250 based on MPOB (2024)
    color: '#EA580C', // Orange
    emoji: '🌴',
    description: 'High yield oil crop, but major concerns about deforestation and biodiversity.',
    harvestFrequency: 'Continuous harvest (Year-round)',
    priceMultiplier: 1.75 // Aligned with HEFA
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane (MO-HEFA)',
    yieldPerHa: 2450, // Based on Mero et al. (2025)
    color: '#EC4899', // Pink
    emoji: '🎋',
    description: 'High yield crop. Pathway via microbial oil or ethanol-to-jet.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 1.85 // Based on Cet Journal (2024)
  },
  {
    id: 'jatropha',
    name: 'Jatropha',
    yieldPerHa: 550, // Avg of 400-700
    color: '#84CC16', // Lime
    emoji: '🌿',
    description: 'Hardy plant for marginal soils, but seeds are toxic and difficult to harvest.',
    harvestFrequency: 'Annual/Bi-annual',
    priceMultiplier: 3.0
  },
  {
    id: 'algae',
    name: 'Algae',
    yieldPerHa: 25000,
    color: '#065F46', // Dark Green
    emoji: '🦠',
    description: 'Microalgae grown in ponds. Extremely high theoretical yield but technically challenging.',
    harvestFrequency: 'Continuous harvest (Daily/Weekly)',
    priceMultiplier: 8.0
  },
  {
    id: 'efuel',
    name: 'E-Fuel (Solar)',
    yieldPerHa: 52000,
    color: '#06B6D4', // Cyan
    emoji: '☀️',
    description: 'Synthetic kerosene made from renewable electricity and CO2. Extremely land-efficient.',
    harvestFrequency: 'Requires 1 year of solar output',
    priceMultiplier: 13.0 // Updated to 13x based on Aerospace Global source
  }
] as const;

export type SafType = typeof SAF_TYPES[number];

export const FLIGHT_CLASSES = [
  { id: 'economy', name: 'Economy', multiplier: 1.0 },
  { id: 'business', name: 'Business', multiplier: 2.9 }, // Updated to 2.9x based on UK Govt (DEFRA)
] as const;

export type FlightClass = typeof FLIGHT_CLASSES[number];

// Flight heuristics
export const FUEL_CONSUMPTION_L_PER_100KM_PAX = 3.5; // Fleet avg ~3.5
export const DEFAULT_PASSENGERS = 250; // Typical widebody
export const DEFAULT_SPEED_KPH = 850;

// Emissions
export const JET_FUEL_CO2E_PER_L = 2.54; // kg CO2e per liter of jet fuel (combustion)
export const SAF_EMISSION_REDUCTION = 0.8; // Average 80% reduction in lifecycle emissions

// Costs (USD)
export const JET_FUEL_PRICE_PER_L = 0.65; // Updated to $0.65/L
export const SAF_PRICE_PREMIUM_MULTIPLIER = 2.5; // SAF is typically 2-3x more expensive

// Global Stats
export const GLOBAL_AVIATION_FUEL_CONSUMPTION_L_PER_YEAR = 375_000_000_000; // Updated to 375 Bn L
export const PEOPLE_FED_PER_HECTARE = 6.0; // Updated to 6 people/ha
