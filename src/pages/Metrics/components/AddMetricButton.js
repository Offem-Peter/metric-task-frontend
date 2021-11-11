import { Link } from 'react-router-dom';
import { Fab, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
}));

const AddMetricButton = () => {
  const classes = useStyles();

  return (
    <Link to="/create">
      <Fab color="primary" variant="extended" className={classes.root}>
        <Typography variant="h6">Create Metric</Typography>
      </Fab>
    </Link>
  );
};

export default AddMetricButton;
