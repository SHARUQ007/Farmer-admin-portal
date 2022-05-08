import React, { useState, Fragment } from "react";
import { TableCell, TableRow, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
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

const Row = (props) => {
    const { row } = props;
    const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false);
    const classes = useStyles();

    const onDelete = () => {
      props.onDelete(row.id)
    }

    return (
      <Fragment>
        <TableRow className={classes.row}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.email}
          </TableCell>
          <TableCell align="right" width="250">
            <div className="cell-button">
              <Link to={`/admin/user/edit/${row.id}`}>
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
      </Fragment>
    );
}

export default Row;