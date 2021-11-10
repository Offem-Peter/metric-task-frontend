import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
}));

const Loader = ({ text }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={24} />
      <Typography variant="h6" gutterBottom>
        {text}
      </Typography>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Loader;
