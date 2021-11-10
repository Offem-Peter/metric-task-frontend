import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';

const FiltersContainer = ({ range, period, setRange, setPeriod }) => {
  return (
    <div>
      <FormControl size="small" variant="outlined">
        <InputLabel>Range</InputLabel>
        <Select
          value={range}
          onChange={(e) => {
            setRange(e.target.value);
          }}
          label="Range"
        >
          <MenuItem value="day">24 Hours</MenuItem>
          <MenuItem value="week">7 Days</MenuItem>
          <MenuItem value="month">1 Month</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" variant="outlined">
        <InputLabel>Avg</InputLabel>
        <Select
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
          }}
          label="Avg"
        >
          <MenuItem value="second">None</MenuItem>
          <MenuItem value="minute">Minute</MenuItem>
          <MenuItem value="hour">Hour</MenuItem>
          <MenuItem value="day">Day</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

FiltersContainer.propTypes = {
  range: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  setRange: PropTypes.func.isRequired,
  setPeriod: PropTypes.func.isRequired,
};

export default FiltersContainer;
