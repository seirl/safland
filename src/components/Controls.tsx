import React from 'react';
import { Plane, Users, Leaf, Info, Droplets, MapPin, Armchair, Repeat, Wind, DollarSign } from 'lucide-react';
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
    <div className="flex flex-col gap-6 p-6 pb-24">
      
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
            <div>
                <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-stone-500">Flight Distance (one-way)</label>
                    <button 
                        onClick={() => setIsRoundtrip(!isRoundtrip)}
                        className={cn(
                            "flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border transition-colors",
                            isRoundtrip 
                                ? "bg-blue-50 text-blue-700 border-blue-200" 
                                : "bg-stone-50 text-stone-500 border-stone-200 hover:border-stone-300"
                        )}
                    >
                        <Repeat className="w-3 h-3" />
                        Roundtrip
                    </button>
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
        <div className="grid grid-cols-2 gap-2">
            {SAF_TYPES.map((saf) => (
                <button
                    key={saf.id}
                    onClick={() => setSelectedSaf(saf)}
                    className={cn(
                        "p-3 rounded-xl text-left border transition-all relative overflow-hidden group",
                        selectedSaf.id === saf.id 
                            ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500" 
                            : "border-stone-200 bg-white hover:border-stone-300"
                    )}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <div 
                            className="w-3 h-3 rounded-full shadow-sm" 
                            style={{ backgroundColor: saf.color }}
                        />
                        <span className="text-sm font-medium text-stone-800">{saf.name}</span>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-tight">
                        {saf.description}
                    </p>
                </button>
            ))}
        </div>
      </section>

      {/* Results */}
      <section className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3">
        <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg border border-stone-100 shadow-sm">
                <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <div>
                <p className="text-xs text-stone-500 font-medium uppercase">Fuel Required</p>
                <p className="text-xl font-bold text-stone-900 font-mono">
                    {Math.round(fuelNeeded).toLocaleString()} <span className="text-sm font-sans font-normal text-stone-500">Liters</span>
                </p>
            </div>
        </div>

        <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg border border-stone-100 shadow-sm">
                <MapPin className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
                <p className="text-xs text-stone-500 font-medium uppercase">Land Area Needed</p>
                <p className="text-2xl font-bold text-stone-900 font-mono">
                    {areaNeeded < 1 ? areaNeeded.toPrecision(2) : areaNeeded.toFixed(1)} <span className="text-sm font-sans font-normal text-stone-500">Hectares</span>
                </p>
                <p className="text-xs text-stone-500 mt-1">
                    {selectedSaf.harvestFrequency}
                </p>
            </div>
        </div>

        <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg border border-stone-100 shadow-sm">
                <Wind className="w-5 h-5 text-stone-500" />
            </div>
            <div>
                <p className="text-xs text-stone-500 font-medium uppercase">Fossil Emissions Avoided</p>
                <p className="text-xl font-bold text-stone-900 font-mono">
                    {Math.round(emissionsAvoided).toLocaleString()} <span className="text-sm font-sans font-normal text-stone-500">kg CO₂e</span>
                </p>
                <p className="text-xs text-stone-400 mt-0.5">
                    ~80% reduction vs fossil jet fuel
                </p>
            </div>
        </div>

        <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg border border-stone-100 shadow-sm">
                <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div>
                <p className="text-xs text-stone-500 font-medium uppercase">Estimated Fuel Cost</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold text-stone-900 font-mono">
                        ${Math.round(safCost).toLocaleString()}
                    </p>
                    <span className="text-xs text-stone-400 line-through">
                        ${Math.round(fossilCost).toLocaleString()}
                    </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                    SAF vs Fossil Jet Fuel (~{selectedSaf.priceMultiplier}x premium)
                </p>
            </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-stone-200/50">
             <p className="text-xs text-stone-400 italic">
                *Equivalent to a square of {Math.round(Math.sqrt(areaNeeded * 10000))}m x {Math.round(Math.sqrt(areaNeeded * 10000))}m
             </p>
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
