import React from 'react';
import { Grid, AppBar } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { TabContext, TabList } from '@mui/lab';
import TextFields from './TextFields';

const LabTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example" />
        </AppBar>
        <Grid item xs={4}>
          <TextFields value={props.editTable1.CODE} setNewTable1={props.setNewTable1} name="CODE" label="CODE" type="string" />
        </Grid>
        <Grid item xs={4}>
          <TextFields value={props.editTable1.NAME} setNewTable1={props.setNewTable1} name="NAME" label="NAME" type="string" />
        </Grid>
      </TabContext>
    </div>
  );
}
  
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

export default LabTabs;