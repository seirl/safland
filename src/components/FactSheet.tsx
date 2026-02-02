import React, { useState } from 'react';
import { BookOpen, Battery, Globe, Leaf, Sun, AlertTriangle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { 
    FUEL_CONSUMPTION_L_PER_100KM_PAX, 
    GLOBAL_AVIATION_FUEL_CONSUMPTION_L_PER_YEAR, 
    PEOPLE_FED_PER_HECTARE, 
    JET_FUEL_PRICE_PER_L, 
    JET_FUEL_CO2E_PER_L, 
    SAF_EMISSION_REDUCTION,
    SAF_TYPES,
    FLIGHT_CLASSES
} from '../lib/utils';

const SOURCES = [
    { name: 'Simple Flying', url: 'https://simpleflying.com/most-fuel-efficient-long-haul-aircraft/' },
    { name: 'UK Govt (DEFRA)', url: 'https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2025' },
    { name: 'IEA', url: 'https://www.iea.org/reports/world-energy-outlook-2019' },
    { name: 'IATA', url: 'https://www.iata.org/en/iata-repository/pressroom/fact-sheets/fact-sheet-fuel/' },
    { name: 'Eurocontrol', url: 'https://ansperformance.eu/economics/cba/standard-inputs/latest/chapters/amount_of_emissions_released_by_fuel_burn.html' },
    { name: 'Cassidy et al. (UMN)', url: 'https://iopscience.iop.org/article/10.1088/1748-9326/8/3/034015' },
    { name: 'NREL', url: 'https://docs.nrel.gov/docs/fy24osti/85351.pdf' },
    { name: 'Transport & Env.', url: 'https://te-cdn.ams3.cdn.digitaloceanspaces.com/files/Biofuels-briefing-072021.pdf' },
    { name: 'US Dept. of Energy', url: 'https://www.energy.gov/eere/bioenergy/algal-biofuels' },
    { name: 'KIT', url: 'https://www.ksop.kit.edu/solar_energy.php' },
    { name: 'Argus Media', url: 'https://www.argusmedia.com/en/news-and-insights/market-opinion-and-analysis-blog/sustainable-aviation-fuel-market-outlook-europe' },
    { name: 'Aerospace Global', url: 'https://aerospaceglobalnews.com/news/argus-esaf-price-index/' },
    // Restored Sources
    { name: 'IPCC Sixth Assessment Report (AR6)', url: 'https://www.ipcc.ch/report/ar6/syr/' },
    { name: 'IEA Net Zero by 2050', url: 'https://www.iea.org/reports/net-zero-by-2050' },
    { name: 'Our World in Data: Environmental Impacts of Food', url: 'https://ourworldindata.org/environmental-impacts-of-food' },
    { name: 'ICCT: The real cost of green aviation', url: 'https://theicct.org/' },
    { name: 'Elsevier (Ren. Energy): Jatropha Failure', url: 'https://www.researchgate.net/publication/261954447_Jatropha_curcas_A_ten_year_story_from_hope_to_despair' },
];

export default function FactSheet() {
  const [isAssumptionsOpen, setIsAssumptionsOpen] = useState(false);

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
        <div className="mt-6 flex items-end justify-center gap-4 h-48 border-b border-stone-200 pb-2 overflow-x-auto">
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
                    <li><strong>Energy Hungry:</strong> Making one liter of e-fuel requires ~20-25 kWh of electricity. Scaling this to global aviation would require a massive increase in renewable energy production, competing with other sectors (like AI data centers or EV charging).</li>
                    <li><strong>Technology:</strong> Large-scale electrolyzers and carbon capture are still maturing.</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Section 7: Methodology */}
      <section className="space-y-4 pt-4 border-t border-stone-200">
        <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-stone-600" />
            Methodology
        </h3>
        <div className="prose prose-stone text-sm leading-relaxed text-stone-600">
            <div>
                This tool is designed to provide unbiased orders of magnitude regarding the land area required to decarbonize aviation. It does not advocate for or against any specific solution but aims to visualize the physical constraints of a "Net Zero" world.
            </div>
            
            <div className="mt-4">
                <strong>Methodology:</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li><strong>Fuel Consumption:</strong> Based on an average of 3.5 L/100km per passenger for modern wide-body aircraft.</li>
                    <li><strong>Yields:</strong> Crop yields (Corn, Soy, Palm) are based on global averages (source: Our World in Data, IEA). Algae and E-Fuel yields are theoretical potentials based on current pilot projects and thermodynamic limits.</li>
                    <li><strong>E-Fuel Yield Calculation:</strong> Assumes 1 hectare of solar PV generates ~1,100 MWh/year. With a ~45% Power-to-Liquid (PtL) efficiency and 9.6 kWh/L energy density for jet fuel, this results in ~52,000 Liters/ha.</li>
                    <li><strong>Land Equivalent:</strong> The "People Fed" comparison assumes an average of ~{PEOPLE_FED_PER_HECTARE} people fed per hectare of arable land (global average for a mixed diet).</li>
                </ul>
            </div>

            <div className="mt-4 bg-stone-50 p-4 rounded-lg text-[10px] text-stone-600 border border-stone-200">
                <button 
                    onClick={() => setIsAssumptionsOpen(!isAssumptionsOpen)}
                    className="flex items-center justify-between w-full font-bold text-stone-800 text-xs uppercase hover:text-emerald-700 transition-colors"
                >
                    <span>Detailed Assumptions & Constants</span>
                    {isAssumptionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {isAssumptionsOpen && (
                    <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-stone-300">
                                    <th className="py-2 font-semibold">Parameter</th>
                                    <th className="py-2 font-semibold">Value</th>
                                    <th className="py-2 font-semibold">Source / Note</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-200">
                                <tr className="bg-stone-100/50"><td colSpan={3} className="py-1 text-[10px] font-bold uppercase text-stone-500">Aviation Metrics</td></tr>
                                <tr>
                                    <td className="py-2 font-medium">Fuel Consumption</td>
                                    <td className="py-2 font-mono">{FUEL_CONSUMPTION_L_PER_100KM_PAX} L / 100km / pax</td>
                                    <td className="py-2 opacity-80 text-xs">
                                        <strong>Simple Flying / ICCT</strong>. Modern wide-bodies achieve ~3.0; fleet avg ~3.5.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">Class Multiplier</td>
                                    <td className="py-2 font-mono">Business = {FLIGHT_CLASSES.find(c => c.id === 'business')?.multiplier}x Economy</td>
                                    <td className="py-2 opacity-80 text-xs">
                                        <strong>UK Govt (DEFRA)</strong>. Standard factor ~2.9x due to lower seating density.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">Global Aviation Fuel</td>
                                    <td className="py-2 font-mono">{(GLOBAL_AVIATION_FUEL_CONSUMPTION_L_PER_YEAR / 1e9).toFixed(1)} Billion L/year</td>
                                    <td className="py-2 opacity-80 text-xs">
                                        <strong>IEA</strong>. 2023/24 volumes. 1 Mt jet fuel ≈ 1.25 Bn Liters.
                                    </td>
                                </tr>
                                
                                <tr className="bg-stone-100/50"><td colSpan={3} className="py-1 text-[10px] font-bold uppercase text-stone-500">General</td></tr>
                                <tr>
                                    <td className="py-2 font-medium">Food Production</td>
                                    <td className="py-2 font-mono">{PEOPLE_FED_PER_HECTARE} people / ha</td>
                                    <td className="py-2 opacity-80 text-xs">
                                        <strong>Cassidy et al.</strong> Global avg delivers ~6 people/ha after losses.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">Jet Fuel Price</td>
                                    <td className="py-2 font-mono">${JET_FUEL_PRICE_PER_L.toFixed(2)} / L</td>
                                    <td className="py-2 opacity-80 text-xs">
                                        <strong>IATA</strong>. Based on global index ~$90/bbl (1 bbl ≈ 159L).
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">Jet Fuel CO₂e</td>
                                    <td className="py-2 font-mono">{JET_FUEL_CO2E_PER_L} kg / L</td>
                                    <td className="py-2 opacity-80 text-xs">
                                        <strong>EIA / IPCC</strong>. Direct combustion only. Lifecycle is ~3.1 kg.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-medium">SAF Emission Red.</td>
                                    <td className="py-2 font-mono">{SAF_EMISSION_REDUCTION * 100}%</td>
                                    <td className="py-2 opacity-80 text-xs">
                                        <strong>IATA</strong>. Lifecycle reduction vs fossil jet. Varies by feedstock.
                                    </td>
                                </tr>

                                <tr className="bg-stone-100/50"><td colSpan={3} className="py-1 text-[10px] font-bold uppercase text-stone-500">Yields (L/ha/yr)</td></tr>
                                {SAF_TYPES.map(saf => (
                                    <tr key={saf.id}>
                                        <td className="py-2 font-medium pl-2 border-l-2" style={{ borderLeftColor: saf.color }}>{saf.name}</td>
                                        <td className="py-2 font-mono">{saf.yieldPerHa.toLocaleString()}</td>
                                        <td className="py-2 opacity-80 text-xs">
                                            {saf.id === 'corn' && <><strong>USDA / NREL</strong>. Avg corn yield ~11 t/ha → Ethanol → Jet.</>}
                                            {saf.id === 'soybean' && <><strong>Transport & Env.</strong> Low oil yield crop.</>}
                                            {saf.id === 'rapeseed' && <><strong>UFOP</strong>. Standard EU biodiesel feedstock.</>}
                                            {saf.id === 'palm' && <><strong>MPOB</strong>. High yield, high regional variability.</>}
                                            {saf.id === 'jatropha' && <><strong>Elsevier</strong>. Historically failed to scale; low yields on marginal land.</>}
                                            {saf.id === 'algae' && <><strong>US DoE</strong>. Projected scalable open-pond systems.</>}
                                            {saf.id === 'efuel' && <><strong>KIT</strong>. Theoretical max based on PV efficiency in high-irradiance zones.</>}
                                        </td>
                                    </tr>
                                ))}

                                <tr className="bg-stone-100/50"><td colSpan={3} className="py-1 text-[10px] font-bold uppercase text-stone-500">Price Multipliers</td></tr>
                                {SAF_TYPES.map(saf => (
                                    <tr key={saf.id + '-price'}>
                                        <td className="py-2 font-medium pl-2 border-l-2" style={{ borderLeftColor: saf.color }}>{saf.name}</td>
                                        <td className="py-2 font-mono">{saf.priceMultiplier}x Jet</td>
                                        <td className="py-2 opacity-80 text-xs">
                                            {saf.id === 'corn' && <><strong>NREL</strong>. Higher energy intensity than HEFA.</>}
                                            {['soybean', 'rapeseed', 'palm'].includes(saf.id) && <><strong>Argus Media</strong>. Premia narrowing as capacity increases.</>}
                                            {saf.id === 'jatropha' && <><strong>Elsevier</strong>.</>}
                                            {saf.id === 'algae' && <><strong>US DoE</strong>. Pre-commercial/Pilot cost basis.</>}
                                            {saf.id === 'efuel' && <><strong>Aerospace Global</strong>. High green premium due to electrolysis costs.</>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* Section 8: About */}
      <section className="space-y-4 pt-4 border-t border-stone-200">
        <h3 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-stone-600" />
            About
        </h3>
        <div className="prose prose-stone text-sm leading-relaxed text-stone-600">
            <p className="text-xs italic">
                Built by <a href="https://antoinepietri.fr/" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-600">Antoine Pietri</a> as an educational prototype. No conflict of interest or affiliation with energy companies.
            </p>
        </div>
      </section>

      <div className="bg-stone-100 p-4 rounded-lg text-xs text-stone-500">
        <p className="font-bold mb-2">Sources:</p>
        <ul className="space-y-2">
            {SOURCES.map((source, i) => (
                <li key={i}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-600 hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        {source.name}
                    </a>
                </li>
            ))}
        </ul>
      </div>

    </div>
  );
}
