import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplianceData from '../components/ApplianceData';

const Home = () => {
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/v1/appliances')
      .then((response) => {
        console.log(response, 'RESPONSE');
        setAppliances(response.data);
      })
      .catch((error) => {
        console.error('Error fetching appliances:', error);
      });
  }, []);

  console.log(appliances, 'DATA');

  return (
    <div className="container bg-gray-300 min-h-screen">
      <h1 className="text-5xl font-bold bg-white p-4">Devices</h1>
      <div className="p-10">
        <ApplianceData appliances={appliances} />
      </div>
    </div>
  );
};

export default Home;
