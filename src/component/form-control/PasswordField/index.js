import React, { useState } from "react"
import PropTypes from 'prop-types'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import { Controller } from "react-hook-form"
import { Visibility, VisibilityOff } from "@mui/icons-material"

PasswordField.propTypes = {
  // Bat buoc form, name
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool
}

export default function PasswordField(props) {
  const {form, name, label} = props
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
      setShowPassword(!showPassword)
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({field: { onChange, onBlur, value, name }, fieldState: { invalid, isTouched, error }}) => (
        <div>
            <FormControl error={isTouched && invalid} fullWidth margin="normal" variant="outlined" sx={{marginLeft: '28px', marginRight: '28px', width: '90%' }}>
                <InputLabel>{label}</InputLabel>
                <OutlinedInput
                    id={name}
                    error={invalid}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            </FormControl>
            <FormHelperText error={invalid} sx={{marginLeft: '40px'}}>{error?.message}</FormHelperText>
        </div>
    )} 
        />)

      }
