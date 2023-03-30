import React, { Component } from "react";
import { connect } from 'react-redux';
import MUIDataTable, {ExpandButton} from "mui-datatables";
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TableCell, TableRow, Typography, Snackbar } from "@mui/material";
import MuiAlert from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Table1Toolbar from "./Table1Toolbar";
import LabTabs from './LabTabs';
import LinearIndeterminate from './LinearIndeterminate';

import { table1GetAll, table1Delete, table1AddOrUpdate, table1ClearShowSnackbar } from '../../actions/table1Actions';

const components = {
  ExpandButton: function(props) {
 
    return <ExpandButton {...props} />;
  }
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Table1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
        table1List: [],
        columns: [
          {
           name: "CODE",
           label: "CODE",
           options: {
            sort: false,
            display: true,
           }
          },
{
           name: "NAME",
           label: "NAME",
           options: {
            sort: false,
            display: true,
           }
          },

           
          {
            name: "Action",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRenderLite: (dataIndex) => {
                return (
                 
                  <div>
                  <IconButton style = {{width:"50%"}} onClick= {() => this.handleDelete(this.state.table1List[dataIndex])}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                  <IconButton style = {{width:"50%"}} onClick={() => this.handleEdit(dataIndex)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  </div>
                 
                );
              }
            }
          },
         ],
        showEditModal: false,
        newTable1: {
          CODE: '',
          NAME: ''
        },
        showConfirmModal: false,
        allowSubmit: false,
        state: "",
        status: "",
        statusText: "",
        loading: false,  
        showSnackbar: false      
    }
  }

  UNSAFE_componentWillMount() {
    this.props.table1GetAll();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        table1List: nextProps.table1.table1List,
        status: nextProps.table1.status,
        statusText: nextProps.table1.text,
        loading: nextProps.table1.loading,
        showSnackbar: nextProps.table1.showSnackbar
      }) 
  }

  fireModal = () => {
    this.setState({
      showEditModal: true,
      newTable1: {
        CODE: '',
NAME: ''

      },
      state: "add",
      deleteTable1: {},
      editTable1: {}
    })
  }

  handleClose = () => {
    this.setState({
      showEditModal: false,
      state: ""
    })
  }

  handleSubmit = () => {
    this.props.table1AddOrUpdate(this.state.newTable1, this.state.state);
    this.setState({
      showEditModal: false,
      allowSubmit: false,
      state: ""
    })
  }

  handleDelete = (table1) => {
    console.log("employ!!!!!!!!",table1);
    this.setState({
      deleteTable1: table1,
      showConfirmModal: true
    })
  }

  handleEdit = (index) => {
    let {CODE: CODE,NAME: NAME} = this.state.table1List[index];
    let table1 = {
      CODE:CODE,
NAME:NAME

    }
    this.setState({
      showEditModal: true,
      newTable1: table1,
      state: "edit"
    }, () => {
      console.log("this is new table1",this.state.newTable1)
    })
  }

  setNewTable1 = (name, value) => {
    let newEmp = this.state.newTable1;
    newEmp[name] = value;
    this.setState({
      newTable1: newEmp
    }, () => {
      console.log("newemploy!!!!!!!!!!!!",this.state.newTable1);
      if (this.isValidate(this.state.newTable1)) {
        this.setState({
          allowSubmit: true
        })
      }
    });    
  }

  handleCloseConfirm = () => {
    this.setState({
      deleteTable1: {},
      showConfirmModal: false
    })
  }

  handelDeleteTable1 = () => {
    this.props.table1Delete(this.state.deleteTable1)
    this.setState({
      deleteTable1: {},
      showConfirmModal: false
    })
  }

  isValidate = (table1) => {
    return !!(table1.CODE && table1.NAME);
  }

  handleCloseSnackbar = () => {
    this.setState({
      showSnackbar: false
    });
    this.props.table1ClearShowSnackbar();
  }
  
  render = () =>
    <>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={this.state.showSnackbar} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
        <Alert onClose={this.handleCloseSnackbar} severity={this.state.status}>
          {this.state.statusText}
        </Alert>
      </Snackbar>
      {this.state.loading && <LinearIndeterminate />}
      <PageTitle title="Table1"/>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Table1 List"
            data={ this.state.table1List }
            columns={this.state.columns}
         
            options = {{
              rowHover: true,
              selectableRows: "none",
              viewColumns: false,
              rowsPerPage: 5,
              rowsPerPageOptions: [5, 10, 15],
              customToolbar: () => {
                return (
                  <Table1Toolbar fireModal={this.fireModal}/>
                );
              },
            filter: false,
            filterType: 'dropdown',
            responsive: 'standard',
            expandableRows: true,
            expandableRowsOnClick: false,
            isRowExpandable: (dataIndex, expandedRows) => {
        
              return true;
            },
          
            renderExpandableRow: (rowData, rowMeta) => {
              const colSpan = rowData.length + 1;
              return (
                <>
                  <TableRow>
                    <TableCell colSpan={colSpan}>
                 
                    </TableCell>
                    
                  </TableRow>
                </>
              );
            },
          }}
            components = {components}
          />
        </Grid>
      </Grid>
      <Dialog 
        open={this.state.showEditModal} 
        onClose={this.handleClose} 
        fullWidth={true}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Table1</DialogTitle>
        <DialogContent>
          <LabTabs setNewTable1={ this.setNewTable1} editTable1={this.state.newTable1} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={!this.state.allowSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={this.state.showConfirmModal} 
        onClose={this.handleCloseConfirm} 
        fullWidth={true}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <Typography>Do you want to delete this table1 info?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handelDeleteTable1} color="primary">
            Sure
          </Button>
        </DialogActions>
      </Dialog>
    </>
}

const mapDispatchToProps = (dispatch) => {
  return {
    table1GetAll: () => { dispatch(table1GetAll()) },
    table1Delete: (table1) => { dispatch(table1Delete(table1))},
    table1AddOrUpdate: (table1, state) => { dispatch(table1AddOrUpdate(table1, state)) },
    table1ClearShowSnackbar: () => { dispatch(table1ClearShowSnackbar()) }
  };
};

const mapStateToProps = (state) => ({
  table1: state.table1
});

export default Table1 = connect(mapStateToProps, mapDispatchToProps)(Table1);
