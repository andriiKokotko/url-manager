import React from 'react'
import { useHttp } from '../hooks/useHttp'
import styles from '../styles/Auth.module.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import FormikTextField from '../components/FormikTextField'
import { useAlert } from '../hooks/useAlert'

export interface IValues {
  name: string
  email: string
  password: string
}

export interface IErrors {
  name?: string
  email?: string
  password?: string
}

const handleErrors = (values: IValues): IErrors => {
  const errors: IErrors = {}
  if (!values.name) {
    errors.name = 'Name should not be empty'
  }

  if (!values.email) {
    errors.email = 'Email should not be empty'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Password should not be empty'
  } else if (values.password.length < 6) {
    errors.password = 'Password should be at least 6 characters'
  }

  return errors
}

const Register: React.FC = () => {

  const { loading, request } = useHttp()
  const showAlert = useAlert()  
  const history = useHistory()

  const submitHandler = async (values: IValues) => {
    try {
      await request('/api/auth/register', 'POST', { ...values })

      showAlert('Successfully created. Now you can log in')
      history.push('/login')
    } catch (e) { }

  }

  return (
    <Card className={styles.card} variant="outlined">
      <CardContent>
        <Typography variant="h5" className={styles.formHeader} gutterBottom>
          Create Profile
        </Typography>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validate={handleErrors}
          onSubmit={submitHandler}
        >
          {({ handleSubmit, errors }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
                <FormikTextField
                  type="text"
                  name="name"
                  label="Name"
                  autoFocus
                />
                <FormikTextField
                  type="email"
                  name="email"
                  label="Email"
                />
                <FormikTextField
                  type="password"
                  name="password"
                  label="Password"
                />
                <Button
                  type="submit"
                  className="submit"
                  disabled={loading || !!Object.keys(errors).length}
                >
                  Submit
                </Button>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default Register
