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

// components
import { Button } from "../../../../components/Wrappers";
import Dropdown from './Dropdown';
import Pagination from './Pagination'
import FilteredDropdown from './FilteredDropdown';


const states = {
  recieved: "success",
  placed: "warning",
  declined: "error",
};
const useStyles = makeStyles({
      root: {
        width: '100%',
        textTransform:"uppercase",
        textAlign:"center",
      },
  });
export default function TableComponent({data,updateOrders,fetchPagination,fetchFilteredPagination,handleChangePage,handleChangeRowsPerPage,page,meta,rowsPerPage}) {
   
   const [filteredDate,setFilteredDate]=React.useState("")
   const [filteredStatus,setFilteredStatus]=React.useState("")
   const classes = useStyles();

   function formatDate(date){
    if(date){
      date=new Date(date);
      let year=date.getFullYear();
      let month=date.getMonth()+1;
      month=month>10?month:"0"+month;
      let day=date.getDate();
      day=day>10?day:"0"+day;
      date=year+"-"+month+"-"+day;
      return date;
    }
    return ""
  }

  const searchChange = async (event) => {
    const { value } = event.target
    await setFilteredDate(value)
    fetchFilteredPagination(1,5,filteredStatus,filteredDate)
    }

  if(data.length>0){
      var keys = Object.keys(data[0]).map(i => i.toUpperCase());
      keys.shift(); // delete "id" key

      return (
        <>
        <div className="table-header" >
                <div className="table-filter" >
                      <TextField
                            id="date"
                            value={filteredDate}
                            onChange={searchChange}
                            label="Filter By Date"
                            type="date"
                            InputLabelProps={{
                                    shrink: true,
                            }}
                       />
                       <FilteredDropdown 
                        filteredDate={filteredDate}
                        filteredStatus={filteredStatus}
                        setFilteredStatus={setFilteredStatus} 
                        fetchFilteredPagination={fetchFilteredPagination}/>
                       
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
    else{
       return(
        <>
        <div className="table-header" >
                <div className="table-filter" >
                      <TextField
                            id="date"
                            value={filteredDate}
                            onChange={searchChange}
                            label="Filter By Date"
                            type="date"
                            InputLabelProps={{
                                    shrink: true,
                            }}
                       />
                       <FilteredDropdown 
                        filteredDate={filteredDate}
                        filteredStatus={filteredStatus}
                        setFilteredStatus={setFilteredStatus} 
                        fetchFilteredPagination={fetchFilteredPagination}/>
                       
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
}





