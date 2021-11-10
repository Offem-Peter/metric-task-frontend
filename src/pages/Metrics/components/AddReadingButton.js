import { Button } from '@material-ui/core';

const AddReadingButton = ({ addClicked, setAddClicked }) => {
  if (addClicked) {
    return null;
  }

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

export default AddReadingButton;
