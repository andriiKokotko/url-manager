import React, { useContext } from 'react'
import styles from '../styles/Auth.module.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Formik } from 'formik'
import FormikTextField from '../components/FormikTextField'
import { useHttp } from '../hooks/useHttp'
import { useAlert } from '../hooks/useAlert'
import { AuthContext, IAuthContext } from '../context/AuthContext'

interface IValues {
  email: string
  password: string
}

interface IErrors {
  email?: string
  password?: string
}

const handleErrors = (values: IValues): IErrors => {
  const errors: IErrors = {}

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

export const Login: React.FC = () => {
  const { loading, request } = useHttp()
  const { login } = useContext(AuthContext) as IAuthContext
  const showAlert = useAlert()

  const submitHandler = async (values: IValues) => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...values })

      showAlert('Successfully loged in')
      login(data.token, data.userId)
    } catch (e) { }

  }

  return (
    <Card className={styles.card} variant="outlined">
      <CardContent>
        <Typography variant="h5" className={styles.formHeader} gutterBottom>
          Log In
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={handleErrors}
          onSubmit={submitHandler}
        >
          {({ handleSubmit, errors }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
                <FormikTextField
                  type="email"
                  name="email"
                  label="Email"
                  autoFocus
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

export default Login
