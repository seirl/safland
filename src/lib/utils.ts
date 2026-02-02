import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SAF_TYPES = [
  {
    id: 'corn',
    name: 'Corn (Ethanol)',
    yieldPerHa: 2800, // Liters per hectare per year
    color: '#FACC15', // Yellow
    emoji: '🌽',
    description: 'Starch-based ethanol converted to jet fuel. Requires significant arable land.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 3.5
  },
  {
    id: 'soybean',
    name: 'Soybean (HEFA)',
    yieldPerHa: 600,
    color: '#4ADE80', // Green
    emoji: '🫘',
    description: 'Oilseed crop. Lower yield per hectare compared to palm or algae.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 2.5
  },
  {
    id: 'rapeseed',
    name: 'Rapeseed (HEFA)',
    yieldPerHa: 1200,
    color: '#F59E0B', // Amber
    emoji: '🌼',
    description: 'Common oilseed in Europe/NA. Moderate yield.',
    harvestFrequency: 'Annual harvest',
    priceMultiplier: 2.5
  },
  {
    id: 'palm',
    name: 'Palm Oil (HEFA)',
    yieldPerHa: 4500,
    color: '#EA580C', // Orange
    emoji: '🌴',
    description: 'High yield oil crop, but major concerns about deforestation and biodiversity.',
    harvestFrequency: 'Continuous harvest (Year-round)',
    priceMultiplier: 2.2
  },
  {
    id: 'jatropha',
    name: 'Jatropha',
    yieldPerHa: 400,
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
    priceMultiplier: 5.0
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
export const JET_FUEL_CO2E_PER_L = 2.54; // kg CO2e per liter of jet fuel (combustion)
export const SAF_EMISSION_REDUCTION = 0.8; // Average 80% reduction in lifecycle emissions

// Costs (USD)
export const JET_FUEL_PRICE_PER_L = 0.60; // Approx global average (2025 forecast)
export const SAF_PRICE_PREMIUM_MULTIPLIER = 2.5; // SAF is typically 2-3x more expensive

// Global Stats
export const GLOBAL_AVIATION_FUEL_CONSUMPTION_L_PER_YEAR = 375_000_000_000; // ~300 Million Tonnes converted to Liters
export const PEOPLE_FED_PER_HECTARE = 5.0; // Global avg (mixed diet)
