import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter
} from "@material-ui/core";
import {Link} from "react-router-dom";

// components
import { Button } from "../../../../components/Wrappers";
import Dropdown from './Dropdown';
import Pagination from './Pagination'


const states = {
  approved: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({data,updateScheduledStem,fetchPagination,handleChangePage,handleChangeRowsPerPage,page,meta,rowsPerPage}) {
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
            {data.map(({ id, name, phone,orderId, noOfStems, farming,variety,status }) => (
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
                          updateScheduledStem={updateScheduledStem} 
                          id={id} 
                          farmerData={{ id, name, phone,orderId, noOfStems, farming,variety,  status }}/>  
                </TableCell>
                <TableCell>{farming}</TableCell>
                <TableCell>{variety}</TableCell>
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
    else{
      return null;
    }
}





