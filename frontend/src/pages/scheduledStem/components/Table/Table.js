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
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import{ ToastContainer }  from 'react-toastify';



// components
import Dropdown from './Dropdown';
import FilteredDropdown from './FilteredDropdown';
import ImageViewer from '../ImageViewer/ImageViewer';


import Pagination from './Pagination'
import PopupCard from "../PopupCard/PopupCard"

// const states = {
//   confirmed: "success",
//   scheduled: "warning",
//   rescheduled: "error",
// };
const useStyles = makeStyles({
      root: {
        width: '100%',
        textTransform:"uppercase",
        textAlign:"center",
      },
  });

export default function TableComponent({data,popupData,isLoading,errorMsg,updateScheduledDate,updateScheduledStem,fetchPagination,fetchFilteredPagination,handleChangePage,handleChangeRowsPerPage,page,meta,rowsPerPage}) {
  const [id,setId]=React.useState(null);
  const [filteredData,setFilteredData]=React.useState([]);
  const [date,setDate]=React.useState()
  const [filteredDate,setFilteredDate]=React.useState("")

  const [filteredStatus,setFilteredStatus]=React.useState("")
  const [src,setSrc]=React.useState(null);

  const classes = useStyles();

  const showImage=(event)=>{
    setSrc(event.target.attributes.imgsrc.value);
  }
  
  function closePopup(){
    setId(null);
  }

  function formatDate(date){
    if(date){
      date=new Date(date);
      let year=date.getFullYear();
      let month=date.getMonth()+1;
      month=month>=10?month:"0"+month;
      let day=date.getDate();
      day=day>=10?day:"0"+day;
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

  const searchChange = async (event) => {
    const { value } = event.target
    setFilteredDate(value)
    fetchFilteredPagination(1,5,filteredStatus,value)
    }
  const resetFilter=()=>{

    //reduce unwanted rerender set empty if it not empty
    if(filteredStatus){
      setFilteredStatus("");
    }
    //reduce unwanted rerender set empty if it not empty
    if(filteredDate){
      setFilteredDate("");
    }
    //reduce unwanted fetch 
    if(!(filteredDate && filteredStatus)){
      fetchPagination(1,5);
    }
  }
  if(data.length>0){
      var keys = Object.keys(data[0])
      keys.shift(); // delete "id" key
      return (

        <>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={false}
      />
         <div className="table-header" >
            <div className="table-filter" >
              <TextField
                    id="date"
                    value={filteredDate}
                    onChange={searchChange}
                    label="Scheduled Date"
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
            {data.map(({ id, name, phone,orderId, noOfStems, farming,variety,status,expected,scheduledDate,image }) => (
              <TableRow key={id} >
                <TableCell className="pl-3 fw-normal" style={{cursor:"pointer",color:"blue"}} id={id} onClick={(e)=>{openPopup(e.target.id)}}>
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
                <TableCell>{new Date(scheduledDate).toDateString()}</TableCell>
                <TableCell><input type="button" className="px-1 closeButton" onClick={showImage} imgsrc={image} value="View Image"/></TableCell>
                <ImageViewer src={src} setSrc={setSrc}/>
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
    else if(!isLoading && !errorMsg){
      return(
        <>
       <div className="table-header" >
            <div className="table-filter" >
              <TextField
                    id="date"
                    value={filteredDate}
                    onChange={searchChange}
                    label="Scheduled Date"
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

                      <Button variant="contained" color="primary" onClick={resetFilter} style={{marginTop:"auto",height:"35px"}} size="large">
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
    else if(errorMsg){
      return (
                <div style={ {width: '100%',textTransform:"capitalize",textAlign:"center",color:"red",margin:"2rem 0"}}>
                  <Typography variant="h3" component="h3"  style={{margin:"1rem"}}>
                    {errorMsg}
                  </Typography>
                </div>
          );
    }
    //if it loading simply return null
    else{
      return null;
    }
}





