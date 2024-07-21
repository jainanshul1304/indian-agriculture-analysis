// Interfaces for data types
export interface CropData {
  year: number;
  crop: string;
  production: number;
  yield: number;
  area: number;
}

interface RawCropData {
  Country: string;
  Year: string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': string;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': string;
  'Area Under Cultivation (UOM:Ha(Hectares))': string;
}

export interface YearlyData {
  year: number;
  maxProductionCrop: string;
  minProductionCrop: string;
}

export interface CropAverageData {
  crop: string;
  avgYield: string;
  avgCultivationArea: string;
}

// Function to load and process JSON data
export async function loadAndProcessData(jsonPath: string): Promise<CropData[]> {
  const response = await fetch(jsonPath);
  const data: RawCropData[] = await response.json();
  
  return data.map((d) => ({
    year: parseInt(d.Year.split(', ')[1], 10),
    crop: d['Crop Name'],
    production: parseFloat(d['Crop Production (UOM:t(Tonnes))']) || 0,
    yield: parseFloat(d['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) || 0,
    area: parseFloat(d['Area Under Cultivation (UOM:Ha(Hectares))']) || 0,
  }));
}

// Function to determine crop with max and min production per year
export function getYearlyMaxMinProduction(data: CropData[]): YearlyData[] {
  const yearlyData: { [key: number]: { maxProductionCrop: string, minProductionCrop: string } } = {};

  data.forEach(d => {
    if (!yearlyData[d.year]) {
      yearlyData[d.year] = { maxProductionCrop: d.crop, minProductionCrop: d.crop };
    }
    const maxCropProduction = data.find(c => c.crop === yearlyData[d.year].maxProductionCrop)?.production;
    const minCropProduction = data.find(c => c.crop === yearlyData[d.year].minProductionCrop)?.production;

    if (maxCropProduction !== undefined && d.production > maxCropProduction) {
      yearlyData[d.year].maxProductionCrop = d.crop;
    }
    if (minCropProduction !== undefined && d.production < minCropProduction) {
      yearlyData[d.year].minProductionCrop = d.crop;
    }
  });

  return Object.entries(yearlyData).map(([year, crops]) => ({
    year: Number(year),
    maxProductionCrop: crops.maxProductionCrop,
    minProductionCrop: crops.minProductionCrop
  }));
}

// Function to calculate average yield and area for each crop
export function getCropAverageData(data: CropData[]): CropAverageData[] {
  const cropData: { [key: string]: { totalYield: number, totalArea: number, count: number } } = {};

  data.forEach(d => {
    if (!cropData[d.crop]) {
      cropData[d.crop] = { totalYield: 0, totalArea: 0, count: 0 };
    }
    cropData[d.crop].totalYield += d.yield;
    cropData[d.crop].totalArea += d.area;
    cropData[d.crop].count += 1;
  });

  return Object.entries(cropData).map(([crop, values]) => ({
    crop,
    avgYield: (values.totalYield / values.count).toFixed(3),
    avgCultivationArea: (values.totalArea / values.count).toFixed(3)
  }));
}
