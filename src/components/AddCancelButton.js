import { Link } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  formElement: {
    margin: '1rem',
  },
  actions: {
    alignItems: 'center',
  },
  button: {
    marginLeft: '20px',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

const AddCancelButton = ({ submitting, cancelClicked }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={`${classes.formElement} ${classes.actions}`}>
        <div className={classes.formContainer}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            Add
          </Button>
          {submitting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>

        <Button className={classes.button} onClick={cancelClicked}>
          {!cancelClicked ? (
            <Link className={classes.link} to="/metrics">
              Cancel
            </Link>
          ) : (
            'Cancel'
          )}
        </Button>
      </div>
    </div>
  );
};

AddCancelButton.propTypes = {
  submitting: PropTypes.bool.isRequired,
  cancelClicked: PropTypes.func,
};

export default AddCancelButton;
