import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
// components
import Dropdown from './Dropdown';
import Pagination from './Pagination'

// const states = {
//   approved: "success",
//   pending: "warning",
//   declined: "error",
// };



export default function TableComponent({data,isLoading,updateFarmer,fetchPagination,handleChangePage,handleChangeRowsPerPage,page,meta,rowsPerPage}) {
  if(data.length>0){
      var keys = Object.keys(data[0]).map(i => i.toUpperCase());
      keys.shift(); // delete "id" key

      return (
        <Table className="mb-0">
          <TableHead>
            <TableRow>
              {keys.map(key => (
                <TableCell style={{fontWeight:'600'}}
                 key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {data.map(({ id, name, phone, address, aadhar, landCapacity, status ,date}) => (
              <TableRow key={id} >
                <TableCell className="pl-3 fw-normal">
                  <Link to={"/admin/orders/"+name+"/"+phone}>
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{aadhar}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell>{landCapacity}</TableCell>
                
                <TableCell>
                <Dropdown statusprop={status} 
                          updateFarmer={updateFarmer} 
                          id={id} 
                          farmerData={{ id, name, phone, address, aadhar, landCapacity,  status,date }}/>  
                </TableCell>
                <TableCell>{new Date(date).toDateString()}</TableCell>
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
      );
    }
   //if loaded sucessfully and has no data mean render it 
    else if(!isLoading){
      return (
          <Table className="mb-0">
                <div style={ {width: '100%',textTransform:"uppercase",textAlign:"center"}}>
                  <Typography variant="h3" component="h3"  style={{margin:"1rem"}}>
                    No Results Found.
                  </Typography>
                </div>
          </Table>
          );
    }
    else{
      return null;
    }
}





