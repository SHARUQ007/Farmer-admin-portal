import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers";
import Dropdown from './Dropdown';

const states = {
  approved: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({data,updateOrders}) {
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
            {data.map(({ id, name, phone, noOfStems, variety, farming, status }) => (
              <TableRow key={id} >
                <TableCell className="pl-3 fw-normal">{name}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell>{noOfStems}</TableCell>
                <TableCell>{variety}</TableCell>
                <TableCell>{farming}</TableCell>
                <TableCell>
                <Dropdown statusprop={status} 
                          updateOrders={updateOrders} 
                          id={id} 
                          farmerData={{ id, name, phone, noOfStems, variety, farming, status }}/>  
                </TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    else{
      return null;
    }
}





