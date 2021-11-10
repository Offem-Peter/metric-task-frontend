import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import AddMetricButton from './components/AddMetricButton';
import SelectMetric from './components/SelectMetric';
import ReadingsContainer from './components/ReadingsContainer';
import Loader from '../../components/Loader';
import { getMetrics } from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  informationContainer: {
    marginTop: '1rem',
    display: 'block',
    width: '100%',
  },
  chartsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Metrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const fetchedMetrics = await getMetrics();
        setMetrics(fetchedMetrics);
      } catch (error) {
        toast('Error fetching metrics data, Please try later', {
          type: 'error',
        });
      } finally {
        setLoadingMetrics(false);
      }
    }

    fetchMetrics();
  }, []);

  const onMetricChanged = async (e, metric) => {
    if (metric) {
      setSelectedMetric(metric);
    } else {
      setSelectedMetric(null);
    }
  };

  if (loadingMetrics) {
    return <Loader text="Fetching metrics" />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Choose Metric
      </Typography>
      <SelectMetric metrics={metrics} metricChanged={onMetricChanged} />
      <div className={`${classes.informationContainer}`}>
        {selectedMetric && <ReadingsContainer metric={selectedMetric} />}
      </div>

      <AddMetricButton />
    </div>
  );
};

export default Metrics;
