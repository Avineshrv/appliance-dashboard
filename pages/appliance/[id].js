import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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
          console.error('Error fetching appliance details:', error);
          setError('Failed to fetch appliance details.');
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
    <div>
      <h1>Appliance Details</h1>
      <p>Serial No: {appliance.serialNo}</p>
      <p>Theatre Name: {appliance.theatreName}</p>
      <p>
        Location:{' '}
        {`${appliance.location.city}, ${appliance.location.state}, ${appliance.location.country}`}
      </p>
      <p>Bandwidth: {appliance.bandwidth}</p>
      <p>Average Bandwidth: {appliance.avgBandwidth}</p>
      <p>Device Status: {appliance.deviceStatus}</p>
      <p>Download Status: {appliance.downloadStatus}</p>
      <p>OS Version: {appliance.osVersion}</p>
    </div>
  );
};

export default ApplianceDetail;
