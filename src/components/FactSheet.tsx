import React from 'react';
import { BookOpen, Battery, Globe, Leaf, Sun, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';

export default function FactSheet() {
  return (
    <div className="space-y-8 p-6 pb-8 max-w-3xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Sustainable Aviation Explained</h2>
        <p className="text-stone-600 leading-relaxed">
          Understanding the pathways to decarbonize flight: from biofuels to synthetic e-fuels.
        </p>
      </div>

      {/* Section 1: The Hard Truth */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          The Fossil Fuel Problem
        </h3>
        <div className="prose prose-stone text-sm leading-relaxed text-stone-600">
          <p>
            To halt climate change, the scientific consensus (IPCC AR6) is clear: we must stop extracting fossil carbon and releasing it into the atmosphere. 
            While many sectors (ground transport, heating) can be electrified, aviation presents a unique physics problem.
          </p>
        </div>
      </section>

      {/* Section 2: The Battery Limit */}
      <section className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4">
        <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
          <Battery className="w-5 h-5 text-blue-500" />
          Why not batteries?
        </h3>
        <p className="text-sm text-stone-600">
          It comes down to <strong>energy density</strong>. Jet fuel packs a massive amount of energy into a small weight.
        </p>
        
        <div className="space-y-3 mt-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-stone-500 mb-1">
              <span>Jet Fuel (43 MJ/kg)</span>
            </div>
            <div className="h-4 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-stone-800 w-full"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs font-medium text-stone-500 mb-1">
              <span>Current Li-ion Battery (~0.9 MJ/kg)</span>
            </div>
            <div className="h-4 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[2%]"></div>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-stone-500 italic mt-2">
          To fly a Boeing 747 across the Atlantic on batteries, the battery alone would weigh 40x more than the entire plane currently does.
        </p>
      </section>

      {/* Section 4: Global Impact */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-600" />
          Aviation's Footprint
        </h3>
        <ul className="space-y-3 text-sm text-stone-600">
          <li className="flex gap-3">
            <span className="font-bold text-stone-900 min-w-[3rem]">2.5%</span>
            <span>of global CO₂ emissions come from aviation.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-stone-900 min-w-[3rem]">Top 6</span>
            <span>If aviation were a country, it would be the 6th largest emitter in the world, between Japan and Germany.</span>
          </li>
        </ul>
      </section>

      {/* Section 5: The Land Use Challenge */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-600" />
          The Scale of the Switch
        </h3>
        <p className="text-sm text-stone-600">
          Replacing 100% of global jet fuel with first-generation biofuels (like corn or soy) would require a staggering amount of land. E-fuels offer a way out of this land constraint.
        </p>

        {/* Visual Comparison */}
        <div className="mt-6 flex items-end gap-4 h-48 border-b border-stone-200 pb-2 overflow-x-auto">
            {/* Livestock */}
            <div className="flex flex-col items-center gap-2">
                <div 
                    className="bg-emerald-200 border border-emerald-400 relative group"
                    style={{ width: '140px', height: '140px' }} // ~3.8 scale
                >
                     <div className="absolute inset-0 flex items-center justify-center text-emerald-800 font-bold text-xs text-center p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        15M km²
                     </div>
                </div>
                <span className="text-[10px] font-medium text-stone-500 text-center w-32">Livestock Feed</span>
            </div>

            {/* Bio-SAF */}
            <div className="flex flex-col items-center gap-2">
                <div 
                    className="bg-amber-300 border border-amber-500 relative group"
                    style={{ width: '68px', height: '68px' }} // ~1.8 scale
                >
                    <div className="absolute inset-0 flex items-center justify-center text-amber-900 font-bold text-xs text-center p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        3.5M km²
                     </div>
                </div>
                <span className="text-[10px] font-medium text-stone-500 text-center w-24">100% Bio-SAF</span>
            </div>

            {/* Solar E-Fuel */}
            <div className="flex flex-col items-center gap-2">
                <div 
                    className="bg-cyan-400 border border-cyan-600 relative group"
                    style={{ width: '10px', height: '10px' }} // ~0.25 scale
                >
                     {/* Tooltip for small item */}
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-stone-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                        ~0.07M km²
                     </div>
                </div>
                <span className="text-[10px] font-medium text-stone-500 text-center w-20">100% E-Fuel</span>
            </div>
        </div>
        <p className="text-xs text-stone-400 italic text-center">
            Relative land area comparison (Squares proportional to area)
        </p>

        <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h4 className="font-bold text-amber-900 text-sm mb-2">Land for 100% Bio-SAF</h4>
                <p className="text-2xl font-mono text-amber-800">~3.5 Million km²</p>
                <p className="text-xs text-amber-700 mt-1">Roughly the size of India. This assumes current crop yields.</p>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                <h4 className="font-bold text-cyan-900 text-sm mb-2">Land for 100% E-Fuel (Solar)</h4>
                <p className="text-2xl font-mono text-cyan-800">~0.07 Million km²</p>
                <p className="text-xs text-cyan-700 mt-1">Roughly the size of Ireland. Solar is 50x more efficient than photosynthesis.</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <h4 className="font-bold text-emerald-900 text-sm mb-2">Land for Livestock Feed</h4>
                <p className="text-2xl font-mono text-emerald-800">~15 Million km²</p>
                <p className="text-xs text-emerald-700 mt-1">We currently use 5x more land just to grow food for animals.</p>
            </div>
        </div>
      </section>

      {/* Section 6: E-Fuels */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <Sun className="w-5 h-5 text-cyan-600" />
          The E-Fuel Promise (Power-to-Liquid)
        </h3>
        <p className="text-sm text-stone-600">
            E-fuels are synthetic kerosene made by combining hydrogen (from water + renewable electricity) with captured CO₂.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-800 text-xs mb-2 uppercase">The Good</h4>
                <ul className="text-xs text-stone-600 space-y-2 list-disc pl-3">
                    <li><strong>Land Efficiency:</strong> Solar panels are ~50x more efficient than photosynthesis, requiring vastly less land.</li>
                    <li><strong>Scalability:</strong> Can be produced in deserts or offshore, avoiding competition with food crops.</li>
                    <li><strong>Clean Burn:</strong> Fewer particulates and aromatics than fossil jet fuel.</li>
                </ul>
            </div>
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                <h4 className="font-bold text-stone-800 text-xs mb-2 uppercase">The Challenge</h4>
                <ul className="text-xs text-stone-600 space-y-2 list-disc pl-3">
                    <li><strong>Cost:</strong> Currently 4-6x more expensive than fossil fuel due to high electricity needs.</li>
                    <li><strong>Energy Hungry:</strong> Making one liter of e-fuel requires ~20-25 kWh of electricity.</li>
                    <li><strong>Technology:</strong> Large-scale electrolyzers and carbon capture are still maturing.</li>
                </ul>
            </div>
        </div>
        
        <div className="mt-3 bg-stone-50 p-4 rounded-lg text-[10px] text-stone-600 border border-stone-200">
            <p className="font-semibold mb-1">🧮 How we calculated the yield (52,000 L/ha):</p>
            <p className="leading-relaxed opacity-80">
                Assumes 1 hectare of solar PV generates ~1,000-1,200 MWh/year (conservative global avg). 
                The Power-to-Liquid (PtL) process has a ~40-50% efficiency (thermodynamic losses from electrolysis & synthesis). 
                <br/>
                <span className="font-mono">1,100,000 kWh (Solar) × 0.45 (Efficiency) ÷ 9.6 kWh/L (Jet Fuel Energy) ≈ 51,562 Liters.</span>
            </p>
        </div>
      </section>

      <div className="bg-stone-100 p-4 rounded-lg text-xs text-stone-500">
        <p className="font-bold mb-2">Sources:</p>
        <ul className="space-y-2">
            <li>
                <a href="https://www.ipcc.ch/report/ar6/syr/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-600 hover:underline">
                    <ExternalLink className="w-3 h-3" />
                    IPCC Sixth Assessment Report (AR6)
                </a>
            </li>
            <li>
                <a href="https://www.iea.org/reports/net-zero-by-2050" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-600 hover:underline">
                    <ExternalLink className="w-3 h-3" />
                    IEA Net Zero by 2050
                </a>
            </li>
            <li>
                <a href="https://ourworldindata.org/environmental-impacts-of-food" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-600 hover:underline">
                    <ExternalLink className="w-3 h-3" />
                    Our World in Data: Environmental Impacts of Food
                </a>
            </li>
            <li>
                <a href="https://theicct.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-600 hover:underline">
                    <ExternalLink className="w-3 h-3" />
                    ICCT: The real cost of green aviation
                </a>
            </li>
        </ul>
      </div>

    </div>
  );
}
