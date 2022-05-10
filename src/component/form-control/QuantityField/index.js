import React from "react"
import PropTypes from 'prop-types'
import { Box, FormControl, FormHelperText, IconButton, OutlinedInput, Typography } from "@mui/material"
import { Controller } from "react-hook-form"
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"

QuantityField.propTypes = {
  // Bat buoc form, name
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool
}

export default function QuantityField(props) {
  const {form, name} = props
  const { setValue } = form

  return (
    <Controller
      name={name}
      control={form.control}
      render={({field: { onChange, onBlur, value, name }, fieldState: { invalid, isTouched, error }}) => (
        <div>
          <Typography sx={{margin: '0 10px', marginTop: '5px', marginBottom: '-10px', fontWeight: 'bold'}}>Quantity</Typography>
            <FormControl error={isTouched && invalid} fullWidth margin="normal" variant="outlined" sx={{ marginLeft: '15px', marginRight: '28px', width: '200px' }}>
                <Box sx={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
                    <IconButton onClick={() => {setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}}>
                        <RemoveCircleOutline />
                    </IconButton>
                    <OutlinedInput
                        id={name}
                        error={invalid}
                        type="number"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        size="small"
                    />
                    <IconButton onClick={() => {setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}}>
                        <AddCircleOutline />
                    </IconButton>
                </Box>
            </FormControl>
            <FormHelperText error={invalid} sx={{marginLeft: '40px'}}>{error?.message}</FormHelperText>
        </div>
    )} 
        />)

      }
