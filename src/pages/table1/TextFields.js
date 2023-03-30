import React from 'react';
import moment from 'moment';

import { TextField } from "@mui/material";
const TextFields = (props) => {
    const [values, setValues] = React.useState({
      error: false
    });
    const date =moment(new Date()).format('YYYY-MM-DD');
    console.log(date);
    console.log(props.value);
    const handleChange = value => event => {
      const newValues = {...values};
      if (event.target.value === "" && props.name !== "reportsto" && props.name !== "jobjoining") {
        newValues.error = true;
      } else {
        newValues.error = false;
      }
      setValues(newValues);
      props.setNewTable1(props.name, event.target.value)
    };
  
    return (
   
        <TextField
          name={props.name}
          label={props.label}
          type={props.type}
         // value={props.value ? props.value : ''}
        
           defaultValue={props.type === 'date' ? (props.value ? props.value : date): (props.value ? props.value : '')}
           multiline= {props.multiline ? true : false}
           style={props.multiline ?{ width: 500 }:{}}
          //defaultValue="2017-05-24"
          inputProps={props.inputProps}
          onChange={handleChange("value")}
          onFocus={handleChange("value")}
          margin="normal"
          helperText={values.error ? "Please enter the value..." : ""}
          error={values.error}
        />
     
    );
  }

  export default TextFields;