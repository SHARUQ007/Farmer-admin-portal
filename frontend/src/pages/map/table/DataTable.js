import React, { useEffect, useState } from "react";
import { Paper, withStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, 
            IconButton, TextField } from '@material-ui/core';
import { connect } from "react-redux";
import * as actions from "../../../actions/map";
import CollapsibleRow from './CollapsibleRow'
import Pagination from './Pagination'
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";


const styles = theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(0)
    }
})

const DataTable = ({ classes, ...props }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let [ category, setCategory ] = useState("all")
	let [ name, setName ] = useState("")

    useEffect(() => {
        props.fetchPagination(1, rowsPerPage)
    }, [])

    const onDelete = async id => {
        const onSuccess = () => {
            props.fetchPagination(1, rowsPerPage)
            toast.success('Data succesfully deleted');
        }

        props.delete(id, onSuccess)
    }

    const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
        props.fetchPagination(newPage + 1, rowsPerPage)
    };

    const handleChangeRowsPerPage = async (event) => {
        if (event.target.value){
            const val = parseInt(event.target.value, 10)
            await setRowsPerPage(val);
            await setPage(0);
            props.fetchPagination(1, val)
        }
    };

	const nameChange = async (event) => {
		const { value } = event.target
		name = value
		await setName(value)
		props.fetchPagination(1, rowsPerPage,  value, category)
	}
     if(props.maps.length>0){
                return (
                     <>
                    <Loader isOpen={props.isLoading}/>
                    <TableContainer component={Paper} className={classes.paper} >
                        <div className="table-header" >
                            <div className="table-filter" > 
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    label="Search Name"
                                    value={name}
                                    onChange={nameChange}
                                    autoComplete="off"
                                />
                             
                            </div>
                        </div>

                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell style={{fontWeight:'600'}}>NAME</TableCell>
                                    <TableCell style={{fontWeight:'600'}}>MOBILE</TableCell>
                                    <TableCell align="right" width="250"> 
                                        <div className="cell-add">
                                            <Link to="/admin/map/add">
                                                <IconButton color="primary">
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody  style={{ height: "150px", overflow: "auto" }} >
                                {props.maps.map((row, index) => (
                                    <CollapsibleRow 
                                        key={index} 
                                        updateStatus={props.updateStatus}
                                        row={row} 
                                        onDelete={onDelete} 
                                    />
                                ))}    
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <Pagination 
                                        handleChangePage={handleChangePage} 
                                        handleChangeRowsPerPage={handleChangeRowsPerPage} 
                                        count={props.meta.totalDocs || 0}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>

                    </TableContainer>
                    </>
                );
    }
    //if loaded sucessfully and has no data mean render it 
    else if(!props.isLoading && !props.errorMsg){
        return(
    <TableContainer component={Paper} className={classes.paper} >
          <div style={ {width: '100%',textTransform:"uppercase",textAlign:"center"}}>
                <Typography variant="h3" component="h3"  style={{margin:"1rem"}}>
                  No Results Found.
                </Typography>
            </div>
     </TableContainer>
        )
    }
    //if it is loading return loading
    else if(props.isLoading){           
        return (<Loader isOpen={props.isLoading}/>)
    }
    else if(props.errorMsg){
      return (
            <TableContainer component={Paper} className={classes.paper} >
                <div style={ {width: '100%',textTransform:"capitalize",textAlign:"center",color:"red",margin:"2rem 0"}}>
                  <Typography variant="h3" component="h3"  style={{margin:"1rem"}}>
                    {props.errorMsg}
                  </Typography>
                </div>
            </TableContainer>

          );
    }
    else{
        return null;
    }
}

const mapStateToProps = state => ({
    maps: state.map.maps,
    meta: state.map.mapMeta,
    isLoading:state.map.isLoading,
    errorMsg:state.map.errorMsg
})

const mapActionToProps = {
    fetchPagination: actions.Pagination,
    updateStatus:actions.updateStatus,
    delete: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DataTable));
