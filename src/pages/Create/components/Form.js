import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { createMetric } from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  formElement: {
    margin: '30px',
  },
  actions: {
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  cancel: {
    marginLeft: '20px',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

function CreateMetricForm() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Metric name is Required'),
  });

  const submitForm = async (values, actions) => {
    setSubmitting(true);

    try {
      await createMetric(values);
      toast('Metric created', {
        type: 'success',
      });

      actions.resetForm();
      navigate('/metrics');
    } catch (error) {
      toast('Error creating metric', {
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={submitForm}
    >
      {({ values, handleChange, errors }) => (
        <Form>
          <div className={classes.formElement}>
            <TextField
              size="small"
              required
              type="text"
              variant="outlined"
              label="Metric Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </div>

          <div className={`${classes.formElement} ${classes.actions}`}>
            <div className={classes.wrapper}>
              <Button
                className={classes.cancel}
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                Create
              </Button>
              {submitting && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>

            <Button className={classes.cancel}>
              <Link className={classes.link} to="/metrics">
                Cancel
              </Link>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CreateMetricForm;
