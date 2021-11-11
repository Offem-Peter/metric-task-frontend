import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import AddReadingButton from './AddReadingButton';
import { createReading } from '../../../services/api';
import AddCancelButton from '../../../components/AddCancelButton';

const useStyles = makeStyles(() => ({
  root: {
    padding: '1rem',
  },
  formContainer: {
    position: 'relative',
    display: 'inline-block',
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

                <AddCancelButton
                  submitting={submitting}
                  cancelClicked={() => setAddClicked(false)}
                />
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
