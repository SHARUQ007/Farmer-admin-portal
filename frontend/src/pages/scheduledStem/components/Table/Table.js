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
import PopupCard from "../PopupCard/PopupCard"

const states = {
  confirmed: "success",
  scheduled: "warning",
  rescheduled: "error",
};

export default function TableComponent({data,popupData,updateScheduledDate,updateScheduledStem,fetchPagination,handleChangePage,handleChangeRowsPerPage,page,meta,rowsPerPage}) {
  const [id,setId]=React.useState(null);
  const [filteredData,setFilteredData]=React.useState([]);
  const [date,setDate]=React.useState()

  if(data.length>0){
      var keys = Object.keys(data[0])
      keys.shift(); // delete "id" key
  function closePopup(){
    setId(null);
  }
  console.log(data,"data")

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

  function openPopup(id){
    let temp;
    for(let i=0;i<popupData.length;i++){
      if(popupData[i].id===id){
        temp=popupData[i];
        temp.scheduledDate=formatDate(popupData[i].scheduledDate);
        break;
      }
    }
    setId(id);
    setDate(temp.scheduledDate);
    setFilteredData(temp);

  }
      return (
        <>
        <PopupCard id={id} popupData={filteredData} date={date} setDate={setDate} closePopup={closePopup} updateScheduledDate={updateScheduledDate}/>
        <Table className="mb-0">
          <TableHead>
            <TableRow>
              {keys.map(key => (
                <TableCell style={{fontWeight:'600',textTransform:"uppercase"}}
                 key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {data.map(({ id, name, phone,orderId, noOfStems, farming,variety,status,expected }) => (
              <TableRow key={id} >
                <TableCell className="pl-3 fw-normal cursor-pointer" id={id} onClick={(e)=>{openPopup(e.target.id)}}>
                      {name}
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
                <TableCell>{new Date(expected).toDateString()}</TableCell>
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
      return null;
    }
}





