import React from 'react';
import { makeStyles } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{marginTop: -23}}>
      <LinearProgress color="secondary"/>
    </div>
  );
}