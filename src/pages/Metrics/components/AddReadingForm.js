import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import AddReadingButton from './AddReadingButton';
import { createReading } from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
  },
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
}));

const AddReadingForm = ({ metricId, reloadChart }) => {
  const [addClicked, setAddClicked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    value: Yup.string().required('Value is Required'),
  });

  const submitForm = async (values, actions) => {
    setSubmitting(true);
    try {
      await createReading({ ...values, metricId });
      toast('Reading added', {
        type: 'success',
      });
      actions.resetForm();
      setAddClicked(false);
    } catch (error) {
      toast('Error adding reading, try later', {
        type: 'error',
      });
    } finally {
      setSubmitting(false);
      reloadChart();
    }
  };

  return (
    <div className={classes.root}>
      <AddReadingButton addClicked={addClicked} setAddClicked={setAddClicked} />
      {addClicked && (
        <div>
          <Formik
            initialValues={{ value: '' }}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            {({ values, handleChange, errors }) => (
              <Form>
                <div className={classes.formElement}>
                  <TextField
                    size="small"
                    required
                    type="number"
                    variant="outlined"
                    label="Value"
                    name="value"
                    value={values.value}
                    onChange={handleChange}
                    error={Boolean(errors.value)}
                    helperText={errors.value}
                  />
                </div>

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
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>

                  <Button
                    className={classes.button}
                    onClick={() => {
                      setAddClicked(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

AddReadingForm.propTypes = {
  metricId: PropTypes.string.isRequired,
  reloadChart: PropTypes.func.isRequired,
};

export default AddReadingForm;
