import React from 'react';
import { useRouter } from 'next/router';

const Table = ({ appliances }) => {
  const router = useRouter();

  const handleViewClick = (serialNo) => {
    router.push(`/appliance/${serialNo}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              Serial No
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              Theatre Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              Location
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              Bandwidth
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              Avg Bandwidth
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              Device Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              Download Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              OS Version
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {appliances.map((appliance) => (
            <tr key={appliance.serialNo} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {appliance.serialNo}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {appliance.theatreName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{`${appliance.location.city}, ${appliance.location.state}, ${appliance.location.country}`}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {appliance.bandwidth}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {appliance.avgBandwidth}
              </td>
              <td
                className={`px-6 py-4 whitespace-no-wrap border-b border-gray-200 ${
                  appliance.deviceStatus === 'online'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {appliance.deviceStatus.charAt(0).toUpperCase() +
                  appliance.deviceStatus.slice(1)}
              </td>
              <td
                className={`px-6 py-4 whitespace-no-wrap border-b border-gray-200 ${
                  appliance.downloadStatus === 'succeeded'
                    ? 'text-green-600'
                    : appliance.downloadStatus === 'failed'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                {appliance.downloadStatus.charAt(0).toUpperCase() +
                  appliance.downloadStatus.slice(1)}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                {appliance.osVersion}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <button
                  onClick={() => handleViewClick(appliance.serialNo)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
