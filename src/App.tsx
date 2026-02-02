/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import MapView from './components/Map';
import Controls from './components/Controls';
import FactSheet from './components/FactSheet';
import { SAF_TYPES, FUEL_CONSUMPTION_L_PER_100KM_PAX, DEFAULT_PASSENGERS, FLIGHT_CLASSES, JET_FUEL_CO2E_PER_L, SAF_EMISSION_REDUCTION, cn, JET_FUEL_PRICE_PER_L, SAF_PRICE_PREMIUM_MULTIPLIER, GLOBAL_AVIATION_FUEL_CONSUMPTION_L_PER_YEAR } from './lib/utils';
import { CITIES } from './lib/cities';
import { Calculator, BookOpen } from 'lucide-react';

type Tab = 'calculator' | 'facts';
type Scope = 'pax' | 'plane' | 'global';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  
  // Calculator State
  const [distance, setDistance] = useState(9000); // km
  const [isRoundtrip, setIsRoundtrip] = useState(true);
  const [passengers, setPassengers] = useState(DEFAULT_PASSENGERS);
  const [scope, setScope] = useState<Scope>('pax');
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

  const handleSetCity = (city: string) => {
    if (city === 'My Location') {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                    setCurrentCityName('My Location');
                },
                (error) => {
                    console.error('Geolocation failed', error);
                    alert("Could not retrieve your location. Please check browser permissions.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    } else {
        setCurrentCityName(city);
    }
  };

  // Calculations
  const fuelNeeded = useMemo(() => {
    if (scope === 'global') {
        return GLOBAL_AVIATION_FUEL_CONSUMPTION_L_PER_YEAR;
    }

    const pax = scope === 'plane' ? passengers : 1;
    const classMultiplier = scope === 'plane' ? 1 : flightClass.multiplier;
    const tripMultiplier = isRoundtrip ? 2 : 1;
    
    // (L/100km/pax * distance * pax * multiplier * trip) / 100
    return (FUEL_CONSUMPTION_L_PER_100KM_PAX * distance * pax * classMultiplier * tripMultiplier) / 100;
  }, [distance, passengers, scope, flightClass, isRoundtrip]);

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
    if ((currentCityName === 'My Location' || currentCityName === 'Custom Location') && userLocation) {
        return userLocation;
    }
    const city = CITIES.find(c => c.name === currentCityName);
    return city ? [city.lat, city.lon] : [48.8566, 2.3522]; // Default to Paris
  }, [currentCityName, userLocation]);

  const isContextOpen = activeTab === 'facts';

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-stone-100 font-sans">
      
      {/* Sidebar (Controls & Content) */}
      <div className={cn(
          "bg-white border-r border-stone-200 flex flex-col z-20 shadow-xl md:shadow-none transition-all duration-300 ease-in-out",
          isContextOpen ? "w-full h-full" : "w-full md:w-[540px] h-[60vh] md:h-full flex-shrink-0"
      )}>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 flex-shrink-0">
            <div className="flex w-full md:w-[540px]">
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
                            : "border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                    )}
                >
                    <BookOpen className="w-4 h-4" />
                    Context & Methodology
                </button>
            </div>
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
                    scope={scope}
                    setScope={setScope}
                    selectedSaf={selectedSaf}
                    setSelectedSaf={setSelectedSaf}
                    fuelNeeded={fuelNeeded}
                    areaNeeded={areaNeeded}
                    emissionsAvoided={emissionsAvoided}
                    safCost={costs.saf}
                    fossilCost={costs.fossil}
                    setCity={handleSetCity}
                    currentCity={currentCityName}
                    flightClass={flightClass}
                    setFlightClass={setFlightClass}
                    onOpenContext={() => setActiveTab('facts')}
                />
            ) : (
                <FactSheet />
            )}
        </div>
      </div>

      {/* Map Layer */}
      <div className={cn(
          "relative z-0 transition-all duration-300",
          isContextOpen ? "hidden" : "flex-1"
      )}>
        <MapView 
            center={currentCityCoords as [number, number]} 
            areaHectares={areaNeeded}
            safType={selectedSaf}
            scope={scope}
            onCenterChange={(newCenter) => {
                setUserLocation(newCenter);
                setCurrentCityName('Custom Location');
            }}
        />
      </div>
      
    </div>
  );
}

