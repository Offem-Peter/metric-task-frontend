import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    minWidth: '30%',
  },
}));

const SelectMetric = ({ metrics, metricChanged }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        options={metrics}
        getOptionLabel={(option) => `${option.name}`}
        getOptionSelected={(option, value) => option === value}
        onChange={metricChanged}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Select a metric" />
        )}
      />
    </div>
  );
};

SelectMetric.propTypes = {
  metrics: PropTypes.array.isRequired,
  metricChanged: PropTypes.func.isRequired,
};

export default SelectMetric;
