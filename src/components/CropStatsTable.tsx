import React from "react";
import { CropStats } from "../types/types";
import { Table, ScrollArea } from "@mantine/core";

// Props interface for the CropStatsTable component
interface CropStatsTableProps {
  data: CropStats[]; // Array of crop statistics
}

// Style for columns to ensure equal width
const columnStyle = { width: '33.33%' };

// Component to render the crop statistics table
export const CropStatsTable: React.FC<CropStatsTableProps> = ({ data }) => (
  <Table
    striped // Adds alternating row colors
    highlightOnHover // Highlights rows on hover
    withTableBorder // Adds border around the table
    withColumnBorders // Adds borders between columns
  >
    <ScrollArea>
      <Table.Thead>
        <Table.Tr>
          <Table.Th ta="center">Crop</Table.Th> {/* Header for crop name */}
          <Table.Th ta="center">Average Yield</Table.Th> {/* Header for average yield */}
          <Table.Th ta="center">Average Cultivation Area</Table.Th> {/* Header for average cultivation area */}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map(({ crop, avgYield, avgCultivationArea }, index) => (
          <Table.Tr key={index}>
            <Table.Td ta="center" style={columnStyle}>{crop}</Table.Td>
            <Table.Td ta="center" style={columnStyle}>{avgYield}</Table.Td>
            <Table.Td ta="center" style={columnStyle}>{avgCultivationArea}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </ScrollArea>
  </Table>
);
