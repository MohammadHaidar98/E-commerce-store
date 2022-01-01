import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function CustomCheck({ name, label, required }) {
  const { control } = useFormContext();
 // const isError = false;

  return (
      
    <Grid item xs={12} sm={6}>
      <Controller 
        control={control}
        // error={isError}
        render={()=>(
            <TextField
            name={name}
            autoComplete="fname"
            label={label}
            fullWidth
            required={required}
            defaultValue=''
             />
        )}
      />
      
    </Grid>
  );
}

export default CustomCheck;