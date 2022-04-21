import React from "react"
import PropTypes from 'prop-types'
import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

InputField.propTypes = {
  // Bat buoc form, name
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool
}

export default function InputField(props) {
  const {form, name, label, disabled} = props

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { invalid, error } }) => (
        <TextField 
          sx={{marginLeft: '28px', marginRight: '28px', width: '90%' }}
          margin="normal"
          variant="outlined"
          label={label}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          error={invalid}
          helperText={error?.message}
        />)
      }

    />
  )
}