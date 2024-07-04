import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';

const Table = ({ appliances }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleViewClick = (serialNo) => {
    router.push(`/appliance/${serialNo}`);
  };

  const filteredAppliances = appliances.filter(
    (appliance) =>
      appliance.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appliance.theatreName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appliance.deviceStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appliance.downloadStatus
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appliance.osVersion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appliance.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appliance.location.city
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appliance.location.state
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appliance.location.country
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const statusCounts = appliances.reduce(
    (counts, appliance) => {
      counts.deviceStatus[appliance.deviceStatus] =
        (counts.deviceStatus[appliance.deviceStatus] || 0) + 1;
      counts.downloadStatus[appliance.downloadStatus] =
        (counts.downloadStatus[appliance.downloadStatus] || 0) + 1;
      return counts;
    },
    { deviceStatus: {}, downloadStatus: {} }
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppliances = filteredAppliances.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredAppliances.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-white my-4 rounded-lg">
        <div className="flex gap-6 flex-wrap">
          {Object.entries(statusCounts.deviceStatus).map(([status, count]) => (
            <div key={status} className={`flex items-center space-x-1`}>
              <span
                className={`block w-3 h-3 rounded-full ${
                  status.toLowerCase() === 'online'
                    ? 'bg-green-600'
                    : status.toLowerCase() === 'offline'
                    ? 'bg-red-600'
                    : 'bg-gray-600'
                }`}
              ></span>
              <span className="text-sm capitalize">{`${count} ${status}`}</span>
            </div>
          ))}
          {Object.entries(statusCounts.downloadStatus).map(
            ([status, count]) => (
              <div key={status} className={`flex items-center gap-2`}>
                <span
                  className={`block w-3 h-3 rounded-full ${
                    status.toLowerCase() === 'passed'
                      ? 'bg-green-600'
                      : status.toLowerCase() === 'failed' ||
                        status.toLowerCase() === 'stalled'
                      ? 'bg-red-600'
                      : status.toLowerCase() === 'downloading' ||
                        status.toLowerCase() === 'unarchiving'
                      ? 'bg-blue-600'
                      : status.toLowerCase() === 'cancelled' ||
                        status.toLowerCase() === 'scheduled'
                      ? 'bg-yellow-600'
                      : status.toLowerCase() === 'downloaded'
                      ? 'bg-green-900'
                      : 'bg-gray-600'
                  }`}
                ></span>
                <span className="text-sm capitalize">{`${count} ${status}`}</span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="p-4 flex flex-wrap flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-t-lg">
        <div className="relative w-full sm:w-1/4">
          <div className="absolute right-0 top-0 bottom-0 flex items-center pr-1 sm:pr-3">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pr-10 border rounded w-full"
          />
        </div>

        <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 disabled:opacity-50"
            >
              <FaAngleLeft />
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 ${
                  currentPage === page + 1 &&
                  'border-2 rounded-lg bg-blue-100 border-blue-600'
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 disabled:opacity-50"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-b-lg">
          <thead className="border-b-gray-100">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
                Device Serial
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
                Location
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
                Bandwidth
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
                Download Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600">
                OS Version
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {currentAppliances.map((appliance) => (
              <tr key={appliance.serialNo} className="">
                <td className="px-6 py-4 whitespace-no-wrap ">
                  {appliance.serialNo}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {appliance.theatreName} <br />
                  <span className="text-[#084782]">
                    {`${appliance.location.city}, ${appliance.location.state}, ${appliance.location.country}`}
                  </span>
                </td>
                {/* <td className="px-6 py-4 whitespace-no-wrap ">{`${appliance.location.city}, ${appliance.location.state}, ${appliance.location.country}`}</td> */}
                <td className="px-6 py-4 whitespace-no-wrap ">
                  {appliance.bandwidth} <br />
                  <span className="text-[#69788C]">
                    {appliance.avgBandwidth}
                  </span>
                </td>
                {/* <td className="px-6 py-4 whitespace-no-wrap ">
                {appliance.avgBandwidth}
              </td> */}
                <td className={`px-6 py-4 whitespace-no-wrap`}>
                  <div className="flex items-center capitalize">
                    <span
                      className={`block w-3 h-3 rounded-full mr-3 ${
                        appliance.deviceStatus === 'online'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                    ></span>
                    {appliance.deviceStatus}
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-no-wrap`}>
                  <div className="flex items-center capitalize">
                    <span
                      className={`block w-3 h-3 rounded-full mr-3 ${
                        appliance.downloadStatus.toLowerCase() === 'passed'
                          ? 'bg-green-600'
                          : appliance.downloadStatus.toLowerCase() ===
                              'failed' ||
                            appliance.downloadStatus.toLowerCase() === 'stalled'
                          ? 'bg-red-600'
                          : appliance.downloadStatus.toLowerCase() ===
                              'downloading' ||
                            appliance.downloadStatus.toLowerCase() ===
                              'unarchiving'
                          ? 'bg-blue-600'
                          : appliance.downloadStatus.toLowerCase() ===
                              'cancelled' ||
                            appliance.downloadStatus.toLowerCase() ===
                              'scheduled'
                          ? 'bg-yellow-600'
                          : appliance.downloadStatus.toLowerCase() ===
                            'downloaded'
                          ? 'bg-green-900'
                          : 'bg-gray-600'
                      }`}
                    ></span>
                    {appliance.downloadStatus}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  {appliance.osVersion}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  <button
                    onClick={() => handleViewClick(appliance.serialNo)}
                    className="bg-gray-100 text-black px-3 py-1 rounded hover:bg-gray-400"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
