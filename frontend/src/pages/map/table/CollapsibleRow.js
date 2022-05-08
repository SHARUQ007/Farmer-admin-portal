import React, { useState, Fragment } from "react";
import { Table, TableBody, TableCell, TableRow, Collapse, IconButton } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

import '../style.css';
import ConfirmDelete from './ConfirmDelete'

const useStyles = makeStyles({
    row: {
        '& > *': {
          borderBottom: 'unset',
          height: 'unset'
        },
    }
});

const CollapsibleRow = (props) => {
    const { row } = props;
    const [ open, setOpen ] = useState(false);
    const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false);
    const classes = useStyles();

    const onDelete = () => {
      props.onDelete(row.id)
    }

    return (
      <Fragment>
        <TableRow className={classes.row}>
          <TableCell width="30">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell width="100">{(row.mobile)}</TableCell>
          <TableCell align="right" width="250">
            <div className="cell-button">
              <Link to={`/admin/map/edit/${row.id}`}>
                  <IconButton color="primary">
                      <EditIcon />
                  </IconButton>
              </Link>
              <ConfirmDelete
                title="Delete Confirmation"
                message="Are you sure want to delete this record?"
                onDelete={onDelete} 
                {...{ openConfirmDelete, setOpenConfirmDelete }} 
              />
            </div>
          </TableCell>
        </TableRow>

        <TableRow >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Table size="medium" aria-label="detail" style={{marginBottom:"30px"}}>
                  <TableBody>
                    
                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Password: </TableCell>
                          <TableCell className="collapse-cell-content"> {row.password} </TableCell>
                      </TableRow>

                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Assigned Truck Number: </TableCell>
                          <TableCell className="collapse-cell-content"> {row.number} </TableCell>
                      </TableRow>

                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Assigned Truck Capacity: </TableCell>
                          <TableCell className="collapse-cell-content"> {row.capacity} </TableCell>
                      </TableRow>
                      <TableRow> 
                          <TableCell className="collapse-cell-title"> Status: </TableCell>
                          <Dropdown statusprop={row.status} 
                           updateStatus={props.updateStatus} 
                           id={row.id} 
                            />  
                      </TableRow>


                  </TableBody>
                </Table>
            </Collapse>
          </TableCell>
        </TableRow>
        
      </Fragment>
    );
}

export default CollapsibleRow;