import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const AddReadingButton = ({ addClicked, setAddClicked }) => {
  if (addClicked) return null;

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={() => {
        setAddClicked(true);
      }}
    >
      Add Reading
    </Button>
  );
};

AddReadingButton.propTypes = {
  addClicked: PropTypes.bool.isRequired,
  setAddClicked: PropTypes.func.isRequired,
};

export default AddReadingButton;
