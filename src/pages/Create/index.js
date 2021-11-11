import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CreateMetricForm from './components/Form';

const useStyles = makeStyles(() => ({
  root: {
    padding: '3rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '30em',
  },
}));

export default function CreatePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Add new Metric
        </Typography>
        <CreateMetricForm />
      </Paper>
    </div>
  );
}
