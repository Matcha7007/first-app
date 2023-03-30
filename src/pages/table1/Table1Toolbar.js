import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { withStyles } from "@mui/material/styles";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class Table1Toolbar extends React.Component {
  
  

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Add"}>
          <IconButton className={classes.iconButton} onClick={this.props.fireModal}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "Table1Toolbar" })(Table1Toolbar);