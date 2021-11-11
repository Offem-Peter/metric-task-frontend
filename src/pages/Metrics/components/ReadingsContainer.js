import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Chart from './Chart';
import Loader from '../../../components/Loader';
import { getReadings } from '../../../services/api';
import AddReadingForm from './AddReadingForm';
import FiltersContainer from './FiltersContainer';

const useStyles = makeStyles(() => ({
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
  const [period, setPeriod] = useState('second');
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

  const reloadChart = () => {
    setToggle((prevState) => !prevState);
  };

  if (loadingReadings) {
    return <Loader text={`Fetching ${metric.name} readings`} />;
  }

  const data = readings?.data;

  return (
    <div className={classes.root}>
      <FiltersContainer
        range={range}
        period={period}
        setRange={setRange}
        setPeriod={setPeriod}
      />

      <AddReadingForm metricId={metric._id} reloadChart={reloadChart} />

      {readings && (
        <Typography variant="h6" gutterBottom>
          {`last updated at: ${readings?.lastUpdatedAt}`}
        </Typography>
      )}
      {data?.length === 0 && (
        <Typography variant="h6" gutterBottom>
          {'no chart data'}
        </Typography>
      )}

      {data && data?.length > 0 && <Chart data={data} period={period} />}
    </div>
  );
};

ReadingsContainer.propTypes = {
  metric: PropTypes.object.isRequired,
};

export default ReadingsContainer;
