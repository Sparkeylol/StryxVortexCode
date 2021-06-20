import { h } from 'preact';
import Check from './icons/Check';
import X from './icons/X';

const Comparison = (): h.JSX.Element => (
  <div id="comparison" className="overflow-auto">
    <table className="table-auto bg-white rounded-xl border shadow-sm">
      <thead>
        <tr className="w-full text-xl font-bold text-gray-900 bg-white rounded-xl">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th className="px-3 py-6" />
          <th className="px-3 py-6">Stryx</th>
          <th className="px-3 py-6">Campfire</th>
          <th className="px-3 py-6">Koal</th>
          <th className="px-3 py-6">Lightning</th>
        </tr>
      </thead>
      <tbody className="text-center font-semibold border">
        <tr className="text-gray-900">
          <td className="px-3 font-bold text-xl text-gray-900 py-6">Pricing</td>
          <td className="px-3">$3.00 / mo</td>
          <td className="px-3">$4.99 / mo</td>
          <td className="px-3">$2.00 / mo</td>
          <td className="px-3">&pound;3.50 / mo</td>
        </tr>
        <tr className="text-gray-900 border">
          <td className="px-3 font-bold text-xl text-gray-900 py-6">Regions</td>
          <td className="px-3">
            1
            {' '}
            <span className="font-bold text-white text-xs bg-indigo-600 rounded-xl p-1.5">
              More soon!
            </span>
          </td>
          <td className="px-3">
            9
          </td>
          <td className="px-3">
            1
          </td>
          <td className="px-3">
            No Data
          </td>
        </tr>
        <tr className="text-gray-900 border">
          <td className="px-3 font-bold text-xl text-gray-900 py-6">Support</td>
          <td className="px-3">
            &lt; 4 minutes
          </td>
          <td className="px-3">
            &lt; 8 hours
          </td>
          <td className="px-3">
            &lt; 6 hours
          </td>
          <td className="px-3">
            &lt; 2 hours
          </td>
        </tr>
        <tr className="text-gray-900 border">
          <td className="px-3 font-bold text-xl text-gray-900 py-6">Uptime</td>
          <td className="px-3">
            99.98%
          </td>
          <td className="px-3">
            99.77%
          </td>
          <td className="px-3">
            99.85%
          </td>
          <td className="px-3">
            99.99%
          </td>
        </tr>
        <tr className="text-gray-900 border">
        </tr>
        <tr className="text-gray-900 border">
          <td className="px-3 font-bold text-xl text-gray-900 py-6">Runs Ads</td>
          <td className="px-16">
            <X />
          </td>
          <td className="px-16">
            <Check />
          </td>
          <td className="px-16">
            <X />
          </td>
          <td className="px-20">
            <X />
          </td>
        </tr>
      </tbody>
    </table>
    <p className="font-light text-sm text-gray-700 py-3">Data collected from each competitors&apos; websites on March 18, 2021.</p>
  </div>
);

export default Comparison;
