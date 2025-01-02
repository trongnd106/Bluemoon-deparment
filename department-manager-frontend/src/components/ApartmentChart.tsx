import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Label } from "recharts";
import styled from "styled-components";
import Heading from "./Heading";
import axios from "axios";
import { useEffect, useState } from "react";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  width: 100%;
  padding: 24px 32px;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

interface Apartment {
  status: string;
}

interface ProcessedData {
  status: string;
  value: number;
}

const startData: ProcessedData[] = [
  { status: "Business", value: 0 },
  { status: "Residential", value: 0 },
  { status: "Vacant", value: 0 },
];

async function prepareData(): Promise<ProcessedData[]> {
  const fetchApartments = async (): Promise<Apartment[]> => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/apartments?size=999");
      return response.data.data.result;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu căn hộ:", error);
      return [];
    }
  };

  function incArrayValue(arr: ProcessedData[], field: string): ProcessedData[] {
    return arr.map((obj) => (obj.status === field ? { ...obj, value: obj.value + 1 } : obj));
  }

  const apartments = await fetchApartments();

  const data = apartments
    .reduce<ProcessedData[]>((arr, cur) => {
      const status = cur.status;
      if (status === "Business") return incArrayValue(arr, "Business");
      if (status === "Residential") return incArrayValue(arr, "Residential");
      if (status === "Vacant") return incArrayValue(arr, "Vacant");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function ApartmentChart() {
  const [data, setData] = useState<ProcessedData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await prepareData();
      setData(result);
    };
    fetchData();
  }, []);

  const totalValue = data.reduce((total, entry) => total + entry.value, 0);

  return (
    <ChartBox>
      <Heading as="h2">Apartment Summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="35%"
            cy="50%"
            innerRadius={85}
            outerRadius={110}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
            nameKey="status"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label value={totalValue} position="center" fontSize={60} fontWeight="bold" fill="#333" />
          </Pie>
          <Tooltip />
          <Legend
            cx="20%"
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconSize={15}
            width={150}
            iconType="circle"
            formatter={(entry?: { payload?: ProcessedData }) =>
              entry?.payload ? `${entry.payload.status}: ${entry.payload.value}` : ""
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
