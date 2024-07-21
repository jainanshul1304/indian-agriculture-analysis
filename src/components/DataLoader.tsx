import React, { useEffect, useState } from 'react';
import { loadAndProcessData, getYearlyMaxMinProduction, getCropAverageData } from '../utils/dataProcessing';
import { CropStats, AggregatedData } from '../types/types';
import { CropStatsTable } from './CropStatsTable';
import { MaxMinProductionTable } from './MaxMinProductionTable';

const DataLoader: React.FC = () => {
  // State hooks for holding processed data
  const [yearlyData, setYearlyData] = useState<AggregatedData[]>([]);
  const [averageData, setAverageData] = useState<CropStats[]>([]);

  useEffect(() => {
    // Function to load and process data
    const fetchData = async () => {
      const data = await loadAndProcessData('/agriculture_data.json');
      setYearlyData(getYearlyMaxMinProduction(data)); // Process data to get yearly max/min production
      setAverageData(getCropAverageData(data)); // Process data to get crop average statistics
    };

    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array means this runs only once

  return (
    <div>
      <MaxMinProductionTable data={yearlyData} /> {/* Table for yearly max/min production */}
      <CropStatsTable data={averageData} /> {/* Table for crop average statistics */}
    </div>
  );
};

export default DataLoader;
