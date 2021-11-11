import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';

import AddCancelButton from '../../../components/AddCancelButton';
import { createMetric } from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  formElement: {
    margin: '30px',
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

          <AddCancelButton submitting={submitting} />
        </Form>
      )}
    </Formik>
  );
}

export default CreateMetricForm;
