import React, { useState, useRef, useEffect } from 'react';
import { Plane, Users, Leaf, Info, Droplets, MapPin, Armchair, Repeat, Wind, DollarSign, ArrowRight, Search, Check, Globe, BookOpen } from 'lucide-react';
import { SAF_TYPES, SafType, cn, FLIGHT_CLASSES, FlightClass, PEOPLE_FED_PER_HECTARE } from '../lib/utils';
import { CITIES } from '../lib/cities';
import * as Motion from 'motion/react-client';

interface ControlsProps {
  distance: number;
  setDistance: (d: number) => void;
  isRoundtrip: boolean;
  setIsRoundtrip: (b: boolean) => void;
  passengers: number;
  setPassengers: (p: number) => void;
  scope: 'pax' | 'plane' | 'global';
  setScope: (s: 'pax' | 'plane' | 'global') => void;
  selectedSaf: SafType;
  setSelectedSaf: (s: SafType) => void;
  fuelNeeded: number;
  areaNeeded: number;
  emissionsAvoided: number;
  safCost: number;
  fossilCost: number;
  setCity: (city: string) => void;
  currentCity: string;
  flightClass: FlightClass;
  setFlightClass: (c: FlightClass) => void;
  onOpenContext: () => void;
}

export default function Controls({
  distance,
  setDistance,
  isRoundtrip,
  setIsRoundtrip,
  passengers,
  setPassengers,
  scope,
  setScope,
  selectedSaf,
  setSelectedSaf,
  fuelNeeded,
  areaNeeded,
  emissionsAvoided,
  safCost,
  fossilCost,
  setCity,
  currentCity,
  flightClass,
  setFlightClass,
  onOpenContext
}: ControlsProps) {

  const CITY_CHOICES = [
    { name: 'My Location', isSpecial: true },
    { name: 'Paris', isSpecial: false },
    { name: 'New York', isSpecial: false },
    { name: 'San Francisco', isSpecial: false },
    { name: 'London', isSpecial: false },
    { name: 'Berlin', isSpecial: false },
    { name: 'Zürich', isSpecial: false },
    { name: 'Singapore', isSpecial: false },
    { name: 'Dubai', isSpecial: false },
  ];

  return (
    <div className="flex flex-col gap-4 p-3 md:gap-6 md:p-6 pb-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-emerald-600" />
          SAF Footprint
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Visualize the land required to fuel your flight with sustainable sources.
        </p>
      </div>

      {/* Scope Selection (Top) */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Scope</h2>
        <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
                onClick={() => setScope('pax')}
                className={cn(
                    "flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center gap-1",
                    scope === 'pax'
                        ? "bg-white text-stone-900 shadow-sm ring-1 ring-black/5"
                        : "text-stone-500 hover:text-stone-700"
                )}
            >
                <Users className="w-4 h-4" />
                Single Passenger
            </button>
            <button
                onClick={() => setScope('plane')}
                className={cn(
                    "flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center gap-1",
                    scope === 'plane'
                        ? "bg-white text-stone-900 shadow-sm ring-1 ring-black/5"
                        : "text-stone-500 hover:text-stone-700"
                )}
            >
                <Plane className="w-4 h-4" />
                Whole Plane
            </button>
            <button
                onClick={() => setScope('global')}
                className={cn(
                    "flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center gap-1",
                    scope === 'global'
                        ? "bg-white text-stone-900 shadow-sm ring-1 ring-black/5"
                        : "text-stone-500 hover:text-stone-700"
                )}
            >
                <Globe className="w-4 h-4" />
                Global Fleet
            </button>
        </div>
      </section>

      {/* Flight Inputs (Hidden for Global) */}
      {scope !== 'global' && (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Estimation Parameters</h2>
        </div>
        
        <div className="space-y-3">
            {/* Trip Type Segmented Control */}
            <div className="flex p-1 bg-stone-100 rounded-lg">
                <button 
                    onClick={() => setIsRoundtrip(false)}
                    className={cn(
                        "flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2",
                        !isRoundtrip 
                            ? "bg-white text-stone-800 shadow-sm ring-1 ring-black/5" 
                            : "text-stone-500 hover:text-stone-700"
                    )}
                >
                    <ArrowRight className="w-3 h-3" />
                    One-way
                </button>
                <button 
                    onClick={() => setIsRoundtrip(true)}
                    className={cn(
                        "flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2",
                        isRoundtrip 
                            ? "bg-white text-stone-800 shadow-sm ring-1 ring-black/5" 
                            : "text-stone-500 hover:text-stone-700"
                    )}
                >
                    <Repeat className="w-3 h-3" />
                    Roundtrip
                </button>
            </div>

            <div>
                <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-stone-500">Flight Distance (one-way)</label>
                </div>
                <div className="flex items-center gap-3">
                    <input 
                        type="range" 
                        min="100" 
                        max="15000" 
                        step="100"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <span className="w-16 text-right font-mono text-stone-700">{distance}km</span>
                </div>
            </div>

            {scope === 'plane' ? (
                 <Motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2"
                 >
                    <label className="text-xs font-medium text-stone-500 mb-1 block">Passengers</label>
                    <div className="flex items-center gap-3">
                        <input 
                            type="range" 
                            min="50" 
                            max="600" 
                            step="10"
                            value={passengers}
                            onChange={(e) => setPassengers(Number(e.target.value))}
                            className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-600"
                        />
                        <span className="w-16 text-right font-mono text-stone-700">{passengers}</span>
                    </div>
                </Motion.div>
            ) : (
                <Motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2"
                 >
                    <label className="text-xs font-medium text-stone-500 mb-2 block">Cabin Class</label>
                    <div className="flex gap-2">
                        {FLIGHT_CLASSES.map((fc) => (
                            <button
                                key={fc.id}
                                onClick={() => setFlightClass(fc)}
                                className={cn(
                                    "flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 border",
                                    flightClass.id === fc.id
                                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                        : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                                )}
                            >
                                <Armchair className="w-3 h-3" />
                                {fc.name}
                            </button>
                        ))}
                    </div>
                </Motion.div>
            )}
        </div>
      </section>
      )}

      <hr className="border-stone-100" />

      {/* SAF Selection */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Feedstock Source</h2>
        <div className="grid grid-cols-2 gap-3">
            {SAF_TYPES.map((saf) => (
                <button
                    key={saf.id}
                    onClick={() => setSelectedSaf(saf)}
                    className={cn(
                        "flex flex-col gap-2 p-3 rounded-xl text-left border-2 transition-all relative overflow-hidden group hover:shadow-md h-full",
                        selectedSaf.id === saf.id 
                            ? "bg-opacity-10" 
                            : "bg-white border-stone-100 hover:border-stone-200"
                    )}
                    style={{ 
                        borderColor: selectedSaf.id === saf.id ? saf.color : undefined,
                        backgroundColor: selectedSaf.id === saf.id ? `${saf.color}15` : undefined // 15 = ~8% opacity hex
                    }}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                             <div className="text-xl">{saf.emoji}</div>
                             <span className="text-sm font-bold text-stone-800 leading-tight">{saf.name}</span>
                        </div>
                        {selectedSaf.id === saf.id && (
                            <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: saf.color }}
                            />
                        )}
                    </div>
                    
                    <p className="text-[10px] text-stone-500 leading-snug">
                        {saf.description}
                    </p>
                </button>
            ))}
        </div>
      </section>

      {/* Results */}
      <section className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-4">
        
        {/* Hero Metric: Land Area */}
        <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm relative overflow-visible group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none overflow-hidden h-full w-full">
                 <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                    <MapPin className="w-32 h-32 text-emerald-900" />
                 </div>
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-emerald-100 rounded-md">
                        <MapPin className="w-4 h-4 text-emerald-700" />
                    </div>
                    <p className="text-sm text-stone-500 font-medium uppercase tracking-wide">Land Area Needed</p>
                    <Info className="w-3 h-3 text-stone-300" />
                </div>
                
                <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-stone-900 font-mono tracking-tight">
                        {areaNeeded >= 10000 
                            ? (areaNeeded / 100).toLocaleString(undefined, { maximumFractionDigits: 1 }) 
                            : (areaNeeded < 1 ? areaNeeded.toPrecision(2) : areaNeeded.toFixed(1))
                        }
                    </p>
                    <span className="text-lg font-medium text-stone-500">
                        {areaNeeded >= 10000 ? "km²" : "hectare-years"}
                    </span>
                </div>
                
                <p className="text-xs text-stone-400 mt-2 italic">
                    {(() => {
                        const peopleYears = areaNeeded * PEOPLE_FED_PER_HECTARE;
                        if (peopleYears >= 1) {
                            return `*Requires as much land as feeding ~${Math.round(peopleYears).toLocaleString()} people for a year.`;
                        } else {
                            return `*Requires as much land as feeding 1 person for ~${Math.round(peopleYears * 365)} days.`;
                        }
                    })()}
                </p>
            </div>

            {/* Land Area Tooltip - Triggers on card hover or active */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-stone-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none z-[100]">
                "Hectare-Year" means 1 hectare of land occupied for 1 full year to produce this amount of fuel.
            </div>
        </div>

        {/* Secondary Metrics */}
        {scope !== 'global' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Fuel */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between h-28">
                <div className="flex items-start justify-between">
                    <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Fuel</p>
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div>
                    <p className="text-lg font-bold text-stone-900 font-mono leading-none">
                        {Math.round(fuelNeeded).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1">Liters</p>
                </div>
            </div>

            {/* Emissions */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between h-28 group relative">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1">
                        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">CO₂ Saved</p>
                        <Info className="w-3 h-3 text-stone-300" />
                    </div>
                    <Wind className="w-3.5 h-3.5 text-stone-400" />
                </div>
                <div>
                    <p className="text-lg font-bold text-stone-900 font-mono leading-none">
                        {Math.round(emissionsAvoided).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1">kg CO₂e</p>
                </div>
                {/* Emissions Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-stone-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none z-[100]">
                    SAF reduces lifecycle emissions by ~80% compared to fossil jet fuel. The remaining 20% comes from production, transport, and non-CO2 effects.
                </div>
            </div>

            {/* Cost */}
            <div className="col-span-2 md:col-span-1 p-3 bg-white rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between h-28 group relative">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1">
                        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Cost Premium</p>
                        <Info className="w-3 h-3 text-stone-300" />
                    </div>
                    <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div>
                    <p className="text-lg font-bold text-amber-700 font-mono leading-none">
                        +${Math.round(safCost - fossilCost).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            {selectedSaf.priceMultiplier}x more expensive
                        </span>
                    </div>
                </div>
                 {/* Cost Tooltip */}
                 <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-stone-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none z-[100]">
                    <div className="flex justify-between mb-1">
                        <span>Fossil Jet Fuel:</span>
                        <span>${Math.round(fossilCost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-amber-300">
                        <span>SAF Cost:</span>
                        <span>${Math.round(safCost).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
        )}
      </section>

      {/* Location Control */}
      <section>
         <label className="text-xs font-medium text-stone-500 mb-2 block">Center Map On</label>
         <div className="flex flex-wrap gap-2">
            {CITY_CHOICES.map(city => (
                <button
                    key={city.name}
                    onClick={() => setCity(city.name)}
                    className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border transition-colors flex items-center gap-1",
                        currentCity === city.name
                            ? "bg-stone-800 text-white border-stone-800"
                            : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                    )}
                >
                    {city.isSpecial && <MapPin className="w-3 h-3" />}
                    {city.name}
                </button>
            ))}
         </div>
      </section>

    </div>
  );
}
