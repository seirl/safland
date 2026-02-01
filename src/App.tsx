/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import MapView from './components/Map';
import Controls from './components/Controls';
import FactSheet from './components/FactSheet';
import { SAF_TYPES, FUEL_CONSUMPTION_L_PER_100KM_PAX, DEFAULT_PASSENGERS, FLIGHT_CLASSES, JET_FUEL_CO2E_PER_L, SAF_EMISSION_REDUCTION, cn, JET_FUEL_PRICE_PER_L, SAF_PRICE_PREMIUM_MULTIPLIER } from './lib/utils';
import { Calculator, BookOpen } from 'lucide-react';

const CITIES = {
  'Paris': [48.8566, 2.3522],
  'New York': [40.7128, -74.0060],
  'Singapore': [1.3521, 103.8198],
  'Dubai': [25.2048, 55.2708],
  'London': [51.5074, -0.1278],
  'Tokyo': [35.6762, 139.6503],
  'São Paulo': [-23.5505, -46.6333],
  'Zürich': [47.3769, 8.5417],
} as const;

type Tab = 'calculator' | 'facts';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  
  // Calculator State
  const [distance, setDistance] = useState(6000); // km
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  const [passengers, setPassengers] = useState(DEFAULT_PASSENGERS);
  const [isWholePlane, setIsWholePlane] = useState(false);
  const [selectedSaf, setSelectedSaf] = useState(SAF_TYPES[0]);
  const [currentCityName, setCurrentCityName] = useState('Paris');
  const [flightClass, setFlightClass] = useState(FLIGHT_CLASSES[0]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setCurrentCityName('My Location');
        },
        (error) => {
          console.log('Geolocation not available or denied', error);
        }
      );
    }
  }, []);

  // Calculations
  const fuelNeeded = useMemo(() => {
    const pax = isWholePlane ? passengers : 1;
    const classMultiplier = isWholePlane ? 1 : flightClass.multiplier;
    const tripMultiplier = isRoundtrip ? 2 : 1;
    
    // (L/100km/pax * distance * pax * multiplier * trip) / 100
    return (FUEL_CONSUMPTION_L_PER_100KM_PAX * distance * pax * classMultiplier * tripMultiplier) / 100;
  }, [distance, passengers, isWholePlane, flightClass, isRoundtrip]);

  const areaNeeded = useMemo(() => {
    // Fuel (L) / Yield (L/ha)
    return fuelNeeded / selectedSaf.yieldPerHa;
  }, [fuelNeeded, selectedSaf]);

  const emissionsAvoided = useMemo(() => {
    // Fuel (L) * CO2e/L * Reduction Factor
    return fuelNeeded * JET_FUEL_CO2E_PER_L * SAF_EMISSION_REDUCTION;
  }, [fuelNeeded]);

  const costs = useMemo(() => {
    const fossil = fuelNeeded * JET_FUEL_PRICE_PER_L;
    const saf = fossil * selectedSaf.priceMultiplier;
    return { fossil, saf };
  }, [fuelNeeded, selectedSaf]);

  const currentCityCoords = useMemo(() => {
    if (currentCityName === 'My Location' && userLocation) {
        return userLocation;
    }
    return CITIES[currentCityName as keyof typeof CITIES] || CITIES['Paris'];
  }, [currentCityName, userLocation]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-stone-100 font-sans">
      
      {/* Sidebar (Controls & Content) */}
      <div className="w-full md:w-[480px] md:flex-shrink-0 bg-white border-r border-stone-200 flex flex-col h-[50vh] md:h-full z-20 shadow-xl md:shadow-none">
        
        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200">
            <button 
                onClick={() => setActiveTab('calculator')}
                className={cn(
                    "flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors border-b-2",
                    activeTab === 'calculator' 
                        ? "border-emerald-600 text-emerald-700 bg-emerald-50/30" 
                        : "border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                )}
            >
                <Calculator className="w-4 h-4" />
                Calculator
            </button>
            <button 
                onClick={() => setActiveTab('facts')}
                className={cn(
                    "flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors border-b-2",
                    activeTab === 'facts' 
                        ? "border-blue-600 text-blue-700 bg-blue-50/30" 
                        : "border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                )}
            >
                <BookOpen className="w-4 h-4" />
                Learn More
            </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
            {activeTab === 'calculator' ? (
                <Controls 
                    distance={distance}
                    setDistance={setDistance}
                    isRoundtrip={isRoundtrip}
                    setIsRoundtrip={setIsRoundtrip}
                    passengers={passengers}
                    setPassengers={setPassengers}
                    isWholePlane={isWholePlane}
                    setIsWholePlane={setIsWholePlane}
                    selectedSaf={selectedSaf}
                    setSelectedSaf={setSelectedSaf}
                    fuelNeeded={fuelNeeded}
                    areaNeeded={areaNeeded}
                    emissionsAvoided={emissionsAvoided}
                    safCost={costs.saf}
                    fossilCost={costs.fossil}
                    setCity={setCurrentCityName}
                    currentCity={currentCityName}
                    flightClass={flightClass}
                    setFlightClass={setFlightClass}
                />
            ) : (
                <FactSheet />
            )}
        </div>
      </div>

      {/* Map Layer */}
      <div className="flex-1 h-[50vh] md:h-full relative z-0">
        <MapView 
            center={currentCityCoords as [number, number]} 
            areaHectares={areaNeeded}
            safType={selectedSaf}
            isWholePlane={isWholePlane}
        />
      </div>
      
    </div>
  );
}

