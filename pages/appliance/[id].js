import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CgNotes } from 'react-icons/cg';
import { IoMdTrendingUp } from 'react-icons/io';
import { BiSolidPieChartAlt2 } from 'react-icons/bi';

const ApplianceDetail = () => {
  const [appliance, setAppliance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/v1/appliance/${id}/info`)
        .then((response) => {
          setAppliance(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error', error);
          setError('Failed to fetch appliance data.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!appliance) {
    return <div>No appliance data found.</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <nav className="pb-4 bg-gray-200 p-4" aria-label="breadcrumb">
        <ol className="flex text-md text-gray-500 space-x-2 items-center">
          <li>
            <Link href="/" className="hover:underline text-[#69788C]">
              Devices
            </Link>
          </li>
          <li className="text-[#69788C]">&gt;</li>
          <li className="text-[#2D3540]">{appliance.serialNo}</li>
        </ol>
      </nav>
      <div className="px-6 pt-6 pb-3 bg-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{appliance.serialNo}</h1>
            <p>{appliance.theatreName}</p>
            <p className="text-gray-600">{`${appliance.location.city}, ${appliance.location.state}, ${appliance.location.country}`}</p>
          </div>
        </div>

        <div className="flex justify-between items-start sm:items-center mb-4 flex-col sm:flex-row gap-4">
          <div className="flex space-x-4 items-center">
            <div
              className={`flex items-center space-x-2 bg-gray-200 px-3 py-2 rounded-full`}
            >
              {appliance.deviceStatus === 'online' ? (
                <div className="block w-3 h-3 rounded-full bg-green-600" />
              ) : (
                <div className="block w-3 h-3 rounded-full bg-red-600" />
              )}
              <span className="text-sm capitalize">
                {appliance.deviceStatus}
              </span>
            </div>
            <div className="bg-gray-200 px-3 py-2 rounded-full flex justify-center items-center gap-2">
              <BiSolidPieChartAlt2 />
              {appliance.storageAvailable} GB
            </div>
          </div>
          <div className="flex gap-3">
            <div>
              <button className="bg-gray-100 text-black px-3 py-1 rounded hover:bg-gray-200 flex justify-center items-center gap-2">
                <IoMdTrendingUp />
                Speedtest
              </button>
            </div>
            <div>
              <button className="bg-gray-100 text-black px-3 py-1 rounded hover:bg-gray-200 flex justify-center items-center gap-2">
                <CgNotes />
                Logs
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-2">
          <div className="flex space-x-8">
            <div>Details</div>
            <div>Content</div>
            <div>Bandwidth</div>
          </div>
        </div>
      </div>
      <div className="m-6 p-6 rounded-lg bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div>
            <h2 className="text-lg font-bold">Device Serial</h2>
            <p>{appliance.serialNo}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Location</h2>
            <p>{appliance.theatreName}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">City</h2>
            <p>{appliance.location.city}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">ISP Payment Responsibility</h2>
            <p>Qube</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Bandwidth</h2>
            <p>{appliance.bandwidth}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Average Bandwidth</h2>
            <p>{appliance.avgBandwidth}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Plan Start Date</h2>
            <p>1st Oct</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Billing Cycle</h2>
            <p>Monthly</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Download Status</h2>
            <p>{appliance.downloadStatus}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">OS Version</h2>
            <p>{appliance.osVersion}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Storage Available</h2>
            <p>{appliance.storageAvailable} GB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplianceDetail;
