import React from 'react';
import { AggregatedData } from '../types/types';
import { Table } from '@mantine/core';

// Props interface for the MaxMinProductionTable component
interface MaxMinProductionTableProps {
  data: AggregatedData[]; // Array of aggregated data
}

// Style for table columns to ensure equal width
const columnStyle = { width: '33.33%' };

// Style for the overall table
const tableStyle = { marginBottom: '5%', marginTop: '2%' };

// Component to render the table
export const MaxMinProductionTable: React.FC<MaxMinProductionTableProps> = ({ data }) => (
  <Table
    striped // Adds alternating row colors
    highlightOnHover // Highlights rows on hover
    withTableBorder // Adds border around the table
    withColumnBorders // Adds borders between columns
    style={tableStyle} // Apply custom table styling
  >
    <Table.Thead>
      {/* Table header with column titles */}
      <Table.Tr>
        <Table.Th ta="center">Year</Table.Th>
        <Table.Th ta="center">Crop with Maximum Production</Table.Th>
        <Table.Th ta="center">Crop with Minimum Production</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {/* Render table rows from data */}
      {data.map(({ year, maxProductionCrop, minProductionCrop }, index) => (
        <Table.Tr key={index}>
          <Table.Td ta="center" style={columnStyle}>{year}</Table.Td>
          <Table.Td ta="center" style={columnStyle}>{maxProductionCrop}</Table.Td>
          <Table.Td ta="center" style={columnStyle}>{minProductionCrop}</Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
);
