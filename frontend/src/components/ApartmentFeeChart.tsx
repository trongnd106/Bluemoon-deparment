import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Heading from "./Heading";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 10px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface FeeData {
  name: string;
  totalAmount: number;
  paidAmount: number;
  contributionAmount: number;
}

export default function ApartmentFeeChart() {
  const [feeData, setFeeData] = useState<FeeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/invoices/total");
        const data: FeeData[] = response.data.data.slice(0, 5);
        setFeeData(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn", err);
      }
    };

    fetchData();
    console.log("Test");
  }, []);

  const maxValue = calculateMaxValue(feeData, 1000000);

  const formatValue = (value: number) => `${(value / 1000000).toFixed(2)}M`;

  return (
    <ChartBox>
      <Heading as="h2">Apartment Fee Collection Chart</Heading>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsBarChart
          data={feeData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#c084fc"
            domain={[0, maxValue]}
            tickFormatter={(value: number) => formatValue(value)}
          />
          <Tooltip formatter={(value: number | string) => formatValue(Number(value))} /> <Legend />
          <Bar yAxisId="left" dataKey="totalAmount" fill="#c084fc" barSize={60} radius={[10, 10, 0, 0]}>
            <LabelList dataKey="totalAmount" position="top" formatter={(value: number) => formatValue(value)} />
          </Bar>
          <Bar yAxisId="left" dataKey="paidAmount" fill="#86efac" barSize={60} radius={[10, 10, 0, 0]}>
            <LabelList dataKey="paidAmount" position="top" formatter={(value: number) => formatValue(value)} />
          </Bar>
          <Bar yAxisId="left" dataKey="contributionAmount" fill="#f97316" barSize={60} radius={[10, 10, 0, 0]}>
            <LabelList dataKey="contributionAmount" position="top" formatter={(value: number) => formatValue(value)} />
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

const calculateMaxValue = (data: FeeData[], roundTo: number = 1000000): number => {
  const maxValue = Math.max(...data.flatMap((item) => [item.totalAmount, item.paidAmount, item.contributionAmount]));

  return Math.ceil(maxValue / roundTo) * roundTo;
};
