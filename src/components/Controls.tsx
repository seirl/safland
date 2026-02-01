import React from 'react';
import { Plane, Users, Leaf, Info, Droplets, MapPin, Armchair, Repeat, Wind, DollarSign, ArrowRight } from 'lucide-react';
import { SAF_TYPES, SafType, cn, FLIGHT_CLASSES, FlightClass } from '../lib/utils';
import * as Motion from 'motion/react-client';

interface ControlsProps {
  distance: number;
  setDistance: (d: number) => void;
  isRoundtrip: boolean;
  setIsRoundtrip: (b: boolean) => void;
  passengers: number;
  setPassengers: (p: number) => void;
  isWholePlane: boolean;
  setIsWholePlane: (b: boolean) => void;
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
}

const CITIES = [
  { name: 'Paris', coords: [48.8566, 2.3522] },
  { name: 'New York', coords: [40.7128, -74.0060] },
  { name: 'Singapore', coords: [1.3521, 103.8198] },
  { name: 'Dubai', coords: [25.2048, 55.2708] },
  { name: 'London', coords: [51.5074, -0.1278] },
  { name: 'Tokyo', coords: [35.6762, 139.6503] },
  { name: 'São Paulo', coords: [-23.5505, -46.6333] },
  { name: 'Zürich', coords: [47.3769, 8.5417] },
];

export default function Controls({
  distance,
  setDistance,
  isRoundtrip,
  setIsRoundtrip,
  passengers,
  setPassengers,
  isWholePlane,
  setIsWholePlane,
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
  setFlightClass
}: ControlsProps) {

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

      {/* Flight Inputs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Flight Details</h2>
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

            <div className="flex items-center gap-4 pt-2">
                <button 
                    onClick={() => setIsWholePlane(false)}
                    className={cn(
                        "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border",
                        !isWholePlane 
                            ? "bg-stone-800 text-white border-stone-800 shadow-md" 
                            : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                    )}
                >
                    <Users className="w-4 h-4" />
                    1 Passenger
                </button>
                <button 
                    onClick={() => setIsWholePlane(true)}
                    className={cn(
                        "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border",
                        isWholePlane 
                            ? "bg-stone-800 text-white border-stone-800 shadow-md" 
                            : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                    )}
                >
                    <Plane className="w-4 h-4" />
                    Whole Plane
                </button>
            </div>

            {isWholePlane ? (
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
                        {areaNeeded < 1 ? areaNeeded.toPrecision(2) : areaNeeded.toFixed(1)}
                    </p>
                    <span className="text-lg font-medium text-stone-500">hectare-years</span>
                </div>
                
                <p className="text-xs text-stone-400 mt-2 italic">
                    *Equivalent to a square of {Math.round(Math.sqrt(areaNeeded * 10000))}m x {Math.round(Math.sqrt(areaNeeded * 10000))}m
                </p>
            </div>

            {/* Land Area Tooltip - Triggers on card hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-stone-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
                "Hectare-Year" means 1 hectare of land occupied for 1 full year to produce this amount of fuel.
            </div>
        </div>

        {/* Secondary Metrics */}
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
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-stone-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
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
                 <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-stone-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100]">
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
      </section>

      {/* Location Control */}
      <section>
         <label className="text-xs font-medium text-stone-500 mb-2 block">Center Map On</label>
         <div className="flex flex-wrap gap-2">
            {CITIES.map(city => (
                <button
                    key={city.name}
                    onClick={() => setCity(city.name)}
                    className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                        currentCity === city.name
                            ? "bg-stone-800 text-white border-stone-800"
                            : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                    )}
                >
                    {city.name}
                </button>
            ))}
         </div>
      </section>

    </div>
  );
}
