import styled from 'styled-components';
import { IBooking } from '../../interfaces/Booking';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Heading from '../../ui/Heading';
import useDarkMode from '../../hooks/dark-mode/useDarkMode';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2 nights',
    value: 3,
    color: '#c2410c',
  },
  {
    duration: '3 nights',
    value: 5,
    color: '#a16207',
  },
  {
    duration: '4-5 nights',
    value: 4,
    color: '#4d7c0f',
  },
  {
    duration: '6-7 nights',
    value: 7,
    color: '#15803d',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21 nights',
    value: 8,
    color: '#1d4ed8',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
];

function prepareData(
  startData: {
    duration: string;
    value: number;
    color: string;
  }[],
  stays: IBooking[]
) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(
    arr: {
      duration: string;
      value: number;
      color: string;
    }[],
    field: string
  ) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights as number;
      if (num === 1) return incArrayValue(arr, '1 night');
      if (num === 2) return incArrayValue(arr, '2 nights');
      if (num === 3) return incArrayValue(arr, '3 nights');
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
      if (num >= 21) return incArrayValue(arr, '21+ nights');
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

export default function DurationChart({
  confirmedStays,
}: {
  confirmedStays: IBooking[] | undefined;
}) {
  const { isDarkMode } = useDarkMode();

  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays ?? []);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="duration"
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={97}
            fill="#8884d8"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
