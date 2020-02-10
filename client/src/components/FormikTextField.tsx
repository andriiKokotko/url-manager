import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useField, FieldAttributes } from 'formik'

type TextFieldProps = FieldAttributes<{ label: string, inputRef?: any }>

const FormikTextField: React.FC<TextFieldProps> = ({ type, label, autoFocus, inputRef, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <TextField
      type={type}
      label={label}
      className="text-field"
      { ...field }
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      autoFocus={autoFocus}
    />
  )
}

export default FormikTextField