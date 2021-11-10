import PropTypes from 'prop-types';
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Chart = ({ data, period }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="timestamp" domain={['auto', 'auto']} name="timestamp" />
        <YAxis dataKey="average" name="average" />
        <Tooltip
          label=""
          formatter={(value) => `per ${period} : ${value}`}
          cursor={{ strokeDasharray: '3 3' }}
        />

        <Line
          type="monotone"
          dataKey="average"
          stroke="#FF355E"
          activeDot={{ r: 6 }}
          dot={{ r: 3 }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      average: PropTypes.number.isRequired,
    }).isRequired,
  ),
  period: PropTypes.string.isRequired,
};

export default Chart;
