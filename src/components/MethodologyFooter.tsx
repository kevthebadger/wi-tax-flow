import React from 'react';
import { ShieldCheck, ExternalLink, Scale } from 'lucide-react';
import { AGENCY_CITATIONS } from '../data/wiTaxData';

export const MethodologyFooter: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <footer
      className={`border-t border-slate-200 bg-white py-8 text-xs text-slate-600 ${className}`}
      data-testid="methodology-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span className="font-bold text-slate-900 tracking-tight">
              Public Finance Methodology & Data Integrity
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Audited against WI DOR &bull; WisDOT &bull; DPI Official Reports
          </div>
        </div>

        {/* Citations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENCY_CITATIONS.map((cit) => (
            <div
              key={cit.id}
              className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{cit.agency}</span>
                <span className="font-mono text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                  {cit.statutoryAuthority}
                </span>
              </div>
              <h5 className="font-semibold text-slate-800 text-[11px]">{cit.program}</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">{cit.description}</p>
              <a
                href={cit.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-slate-700 hover:text-slate-950 underline font-medium pt-1"
              >
                <span>Official Report</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* Methodology Notes */}
        <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-200 space-y-2 text-[11px] leading-relaxed text-slate-600">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
            <Scale className="w-3.5 h-3.5 text-slate-600" />
            <span>Methodological Attribution Standards</span>
          </div>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>State Taxes Sent:</strong> Individual Income Tax reflects net state tax liability aggregated by county of residence from filed Wisconsin individual returns. State Sales Tax reflects the state 5.0% portion collected by vendors in each county. Corporate franchise and excise taxes are excluded to prevent speculative apportionment.
            </li>
            <li>
              <strong>State Aids Returned:</strong> Aggregates four direct intergovernmental formulas: DOR County and Municipal Aid (CMA / Act 12), DPI K-12 General Equalization School Aids, WisDOT General Transportation Aids (GTA), and State School Levy Tax Credits.
            </li>
            <li>
              <strong>Return on Tax Dollar:</strong> Defined objectively as (Total Aids Returned / Total Taxes Sent). A ratio above $1.00 indicates a net recipient jurisdiction receiving more in core intergovernmental aid than its residents pay in direct personal state taxes; below $1.00 indicates a net donor.
            </li>
          </ul>
        </div>

        {/* Bottom Copyright and Disclaimers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-500">
          <span>
            Wisconsin Tax Flow Project &bull; Nonpartisan Public Finance Analytics &bull; MIT License
          </span>
          <span>
            Independent civic analysis based on publicly available state records.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default MethodologyFooter;
