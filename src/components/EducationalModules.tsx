import React, { useState } from 'react';
import { BookOpen, ChevronDown, Landmark, GraduationCap, Truck, FileCheck } from 'lucide-react';

interface ModuleItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

export const EducationalModules: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [openId, setOpenId] = useState<string>('property-tax');

  const toggle = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  const modules: ModuleItem[] = [
    {
      id: 'property-tax',
      title: "Myth vs. Reality: Wisconsin Collects 0% State Property Tax",
      subtitle: "Where your property tax really goes versus where state revenue originates",
      icon: Landmark,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700">
          <p>
            A common public misconception is that state taxes paid on property are funneled to other counties. In reality, the <strong>State of Wisconsin collects zero state property tax</strong> (the remaining 0.169-mill state forestry tax was permanently eliminated in the 2017–19 biennial budget).
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <h5 className="font-bold text-slate-900 mb-1.5 uppercase tracking-wide text-[11px]">
              Where 100% of Wisconsin Property Taxes Actually Go:
            </h5>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li><strong>K-12 School Districts:</strong> ~44% (voter-approved local school operations & referendums)</li>
              <li><strong>Municipalities (Cities, Villages, Towns):</strong> ~23% (police, fire, public works)</li>
              <li><strong>County Governments:</strong> ~19% (county highways, sheriff, courts, social services)</li>
              <li><strong>Technical College Districts:</strong> ~8% (MATC, Madison College, etc.)</li>
              <li><strong>Special Taxing Districts:</strong> ~6% (sewerage, lake districts)</li>
            </ul>
          </div>
          <p>
            By contrast, the <strong>Wisconsin state general fund</strong> is funded almost entirely by <strong>Individual Income Tax (~50%)</strong> and the <strong>5.0% State Sales Tax (~35%)</strong>. When state dollars flow back to counties, they are state income and sales tax dollars being redistributed.
          </p>
        </div>
      ),
    },
    {
      id: 'school-aids',
      title: "How Public School Equalization Works (Wis. Stat. Ch. 121)",
      subtitle: "Why low-property-wealth districts receive higher state aid per pupil",
      icon: GraduationCap,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700">
          <p>
            The Wisconsin Department of Public Instruction (DPI) distributes over $6 billion annually in general school aids. Under Wisconsin's constitutionally mandated equalization formula, the state acts as an "equalizer" of local tax bases:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div>
              <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase">
                Property-Poor / Rural Districts
              </span>
              <p className="text-slate-600">
                Because equalized property value per member is low, the state subsidizes up to <strong>60% to 75%+</strong> of the district's shared cost per pupil to ensure equal educational opportunity regardless of local zip code.
              </p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase">
                Property-Wealthy / Suburban Districts
              </span>
              <p className="text-slate-600">
                Districts with high commercial or residential property wealth per student can fund schools with lower tax mill rates and therefore receive very low state equalization aid (sometimes under 10% of costs).
              </p>
            </div>
          </div>
          <p>
            This structural equalization is why rural and northern counties show high "Return on Tax Dollar" ratios: their schools are heavily subsidized by income tax generated in urban/suburban economic centers.
          </p>
        </div>
      ),
    },
    {
      id: 'road-aids',
      title: "How Transportation Aid Works (WisDOT GTA § 86.30)",
      subtitle: "Why road mileage aids redistribute state dollars from cities to rural counties",
      icon: Truck,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700">
          <p>
            Wisconsin's <strong>General Transportation Aids (GTA)</strong> program returns state fuel taxes and vehicle registration fees to local governments to help maintain local roads, streets, and bridges.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5">
            <h5 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
              Mileage vs. Share-of-Costs Distribution:
            </h5>
            <p className="text-slate-600">
              Towns and rural counties are compensated heavily on a <strong>per-mile rate (exceeding $2,700+ per road mile)</strong>. Because rural jurisdictions maintain thousands of miles of paved and gravel roads with few residents, their <strong>per-capita transportation aid is dramatically higher</strong> than in dense urban areas like Milwaukee, where thousands of residents share the same mile of city pavement.
            </p>
          </div>
          <p>
            State highway aids effectively transfer user fees collected from statewide drivers to maintain the critical rural road and agricultural logistics network.
          </p>
        </div>
      ),
    },
    {
      id: 'act-12',
      title: "2023 Wisconsin Act 12: The Bipartisan Shared Revenue Reform",
      subtitle: "What changed, how sales tax was tied to local aid, and local options",
      icon: FileCheck,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-700">
          <p>
            In June 2023, Wisconsin enacted <strong>2023 Wisconsin Act 12</strong>, the most significant restructuring of state-local fiscal relations in over two decades:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
            <li>
              <strong>Minimum 20% Boost for All Localities:</strong> Every single municipality and county in Wisconsin received at least a 20% increase in basic County & Municipal Aid (CMA), with some rural towns receiving increases of up to 50% to 100%.
            </li>
            <li>
              <strong>Tied to State Sales Tax Growth:</strong> Created the Local Government Fund, dedicating <strong>20% of state sales tax revenues</strong> to local aids, ending decades of frozen, non-inflation-adjusted state support.
            </li>
            <li>
              <strong>Milwaukee Pension & Public Safety Solution:</strong> Authorized Milwaukee County to increase its county sales tax from 0.5% to 0.9%, and the City of Milwaukee to implement a 2.0% city sales tax, dedicated to funding legacy public pension liabilities and maintaining emergency public safety staffing without insolvency.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className={`space-y-4 ${className}`} data-testid="educational-modules">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-teal-700" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Wisconsin Public Finance 101
          </h3>
          <p className="text-xs text-slate-500">
            Factual, statutory explainers dispelling common myths about who pays for public services.
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {modules.map((m) => {
          const isOpen = openId === m.id;
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(m.id)}
                aria-expanded={isOpen}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{m.subtitle}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? 'rotate-180 text-slate-900' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 animate-fadeIn">
                  {m.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationalModules;
