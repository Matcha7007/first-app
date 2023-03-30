import React, { useState } from "react";
import { Grid, Select, MenuItem, Input } from "@mui/material";
import { ArrowForward as ArrowForwardIcon } from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

export default function BigStat(props) {
  const { product, total, color, registrations, bounce } = props;
  const classes = useStyles();
  const theme = useTheme();

  // local
  const [value, setValue] = useState("daily");

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography constiant="h5">{product}</Typography>

          <Select
            value={value}
            onChange={e => setValue(e.target.value)}
            input={
              <Input
                disableUnderline
                classes={{ input: classes.selectInput }}
              />
            }
            className={classes.select}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </div>
      }
      upperTitle
    >
      <div className={classes.totalValueContainer}>
        <div className={classes.totalValue}>
          <Typography size="xxl" color="text" colorBrightness="secondary">
            {total[value]}
          </Typography>
          <Typography color={total.percent.profit ? "success" : "secondary"}>
            &nbsp;{total.percent.profit ? "+" : "-"}
            {total.percent.value}%
          </Typography>
        </div>
        <BarChart width={150} height={70} data={getRandomData()}>
          <Bar
            dataKey="value"
            fill={theme.palette[color].main}
            radius={10}
            barSize={10}
          />
        </BarChart>
      </div>
      <div className={classes.bottomStatsContainer}>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography constiant="h6">{registrations[value].value}</Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Registrations
          </Typography>
        </div>
        <div className={classes.statCell}>
          <Grid container alignItems="center">
            <Typography constiant="h6">{bounce[value].value}%</Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Bounce Rate
          </Typography>
        </div>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography constiant="h6">
              {registrations[value].value * 10}
            </Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [classes.profitArrowDanger]: !registrations[value].profit,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Views
          </Typography>
        </div>
      </div>
    </Widget>
  );
}

// #######################################################################

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
