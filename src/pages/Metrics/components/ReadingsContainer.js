import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chart from './Chart';
import Loader from '../../../components/Loader';
import { getReadings } from '../../../services/api';
import AddReadingForm from './AddReadingForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
}));

const ReadingsContainer = ({ metric }) => {
  const [loadingReadings, setLoadingReadings] = useState(true);
  const [readings, setReadings] = useState(null);
  const [range, setRange] = useState('day');
  const [period, setPeriod] = useState('minute');
  const [toggle, setToggle] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setReadings(null);
    setLoadingReadings(true);

    async function fetchReadings() {
      try {
        const fetchedReadings = await getReadings(metric._id, range, period);

        setReadings(fetchedReadings);
      } catch (error) {
        toast(`Error fetching "${metric.name}" readings, Please try later`, {
          type: 'error',
        });
      } finally {
        setLoadingReadings(false);
      }
    }

    fetchReadings();
  }, [metric, range, period, toggle]);

  const onRangeChanged = (e) => {
    setRange(e.target.value);
  };

  const onPeriodChanged = (e) => {
    setPeriod(e.target.value);
  };

  const resetChart = () => {
    setToggle((prevState) => !prevState);
  };

  if (loadingReadings) {
    return <Loader text={`Fetching ${metric.name} readings`} />;
  }

  const data = readings?.data;

  return (
    <div className={classes.root}>
      <FormControl size="small" variant="outlined">
        <InputLabel>Range</InputLabel>
        <Select value={range} onChange={onRangeChanged} label="Range">
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="week">Week</MenuItem>
          <MenuItem value="month">Month</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" variant="outlined">
        <InputLabel>Avg</InputLabel>
        <Select value={period} onChange={onPeriodChanged} label="Avg">
          <MenuItem value="minute">Minute</MenuItem>
          <MenuItem value="hour">Hour</MenuItem>
          <MenuItem value="day">Day</MenuItem>
        </Select>
      </FormControl>

      <AddReadingForm metricId={metric._id} resetChart={resetChart} />

      <Typography variant="h6" gutterBottom>
        {`last updated at: ${readings.lastUpdated}`}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {data?.length === 0 && 'no chart data'}
      </Typography>
      {data && data?.length > 0 && <Chart data={data} period={period} />}
    </div>
  );
};

ReadingsContainer.propTypes = {
  metric: PropTypes.object.isRequired,
};

export default ReadingsContainer;
