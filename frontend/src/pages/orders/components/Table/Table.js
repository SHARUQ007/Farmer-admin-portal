import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,TextField
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
 import { ToastContainer} from 'react-toastify';

// components
import { Button } from "../../../../components/Wrappers";
import Dropdown from './Dropdown';
import Pagination from './Pagination'
import FilteredDropdown from './FilteredDropdown';


// const states = {
//   recieved: "success",
//   placed: "warning",
//   declined: "error",
// };
const useStyles = makeStyles({
      root: {
        width: '100%',
        textTransform:"uppercase",
        textAlign:"center",
      },
  });
export default function TableComponent({data,isLoading,updateOrders,fetchPagination,fetchFilteredPagination,handleChangePage,handleChangeRowsPerPage,page,meta,rowsPerPage}) {
   
   const [filteredDate,setFilteredDate]=React.useState("")
   const [filteredStatus,setFilteredStatus]=React.useState("")
   const classes = useStyles();

  const searchChange = async (event) => {
    const { value } = event.target
    setFilteredDate(value)
    fetchFilteredPagination(1,5,filteredStatus,value)
    }
  const resetFilter=()=>{
    //reduce unwanted fetch.only fetch if any one has value  because there is possiblity 
    //that user can press simply clear but when there is no filtered is set 
    if(filteredDate || filteredStatus){
      fetchPagination(1,5);
    }
    //reduce unwanted rerender
    if(filteredStatus){
      setFilteredStatus("");
    }
    //reduce unwanted rerender
    if(filteredDate){
      setFilteredDate("");
    }
    
  }
  if(data.length>0){
      var keys = Object.keys(data[0]).map(i => i.toUpperCase());
      keys.shift(); // delete "id" key

      return (
        <>
        <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        <div className="table-header" >
                <div className="table-filter" >
                      <TextField
                            id="date"
                            value={filteredDate}
                            onChange={searchChange}
                            label="Expected Date"
                            type="date"
                            InputLabelProps={{
                                    shrink: true,
                            }}
                       />
                    <div style={{displa:"flex",alignItems:"flex-end"}}>
                       <FilteredDropdown 
                        filteredDate={filteredDate}
                        filteredStatus={filteredStatus}
                        setFilteredStatus={setFilteredStatus} 
                        fetchFilteredPagination={fetchFilteredPagination}/>
                        <Button variant="contained" color="primary" onClick={resetFilter} style={{margin:"0.5rem 1rem 0rem 1rem",height:"35px"}} size="large">
                         Clear
                      </Button>
                    </div>
                       
                </div>
            </div>
        <Table className="mb-0">
          <TableHead>
            <TableRow>
              {keys.map(key => (
                <TableCell style={{fontWeight:'600'}}
                 key={key}>{key}</TableCell>
              ))}
              {/* <TableCell style={{fontWeight:'600'}}>SCHEDULE</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody >
            {data.map(({ id, name, phone,orderId, noOfStems, farming,variety,status ,expected}) => (
              <TableRow key={id} >
                <TableCell className="pl-3 fw-normal">
                  <Link to={"/admin/dashboard/"+name+"/"+phone}>
                      {name}
                  </Link>
                </TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{orderId}</TableCell>
                <TableCell>{noOfStems}</TableCell>
                 <TableCell>
                <Dropdown statusprop={status} 
                          updateOrders={updateOrders} 
                          id={id} 
                          farmerData={{ id, name, phone,orderId, noOfStems, farming,variety,  status }}/>  
                </TableCell>
                <TableCell>{farming}</TableCell>
                <TableCell>{variety}</TableCell>
                <TableCell>{new Date(expected).toDateString()}</TableCell>

                {/* <TableCell>
                   <Button
                   color="secondary"
                   size="small"
                className="px-1"
                variant="contained">
                 Schedule </Button>  
                 </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
                    <TableRow>
                        <Pagination 
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage} 
                            count={meta.totalDocs || 0}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
        </Table>
        </>
      );
    }
    //if loaded sucessfully and has no data mean render it 
    else if(!isLoading){
       return(
        <>
        <div className="table-header" >
                <div className="table-filter" >
                      <TextField
                            id="date"
                            value={filteredDate}
                            onChange={searchChange}
                            label="Expected Date"
                            type="date"
                            InputLabelProps={{
                                    shrink: true,
                            }}
                       />
                       <div>
                          <FilteredDropdown 
                          filteredDate={filteredDate}
                          filteredStatus={filteredStatus}
                          setFilteredStatus={setFilteredStatus} 
                          fetchFilteredPagination={fetchFilteredPagination}/>
                        <Button variant="contained" color="primary" onClick={resetFilter} style={{margin:"auto 0",height:"35px"}} size="large">
                         Clear
                        </Button>
                        </div>

                       
                </div>

            </div>
            <div className={classes.root}>
                <Typography variant="h3" component="h3"  style={{margin:"1rem"}}>
                  No Results Found.
                </Typography>
            </div>
        </>
            )
    }
    //if it loading simply return null
    else{
      return null;
    }
}





