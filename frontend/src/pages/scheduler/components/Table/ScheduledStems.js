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


import Pagination from './Pagination'

const useStyles = makeStyles({
      root: {
        width: '100%',
        textTransform:"uppercase",
        textAlign:"center",

      },
  });

export default function ScheduledStems({data,scheduleDate,isLoading,errorMsg,meta,fetchStemAvailability}) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  
  const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
        fetchStemAvailability(newPage + 1, rowsPerPage)
  }

  const handleChangeRowsPerPage = async (event) => {
        if (event.target.value){
            const val = parseInt(event.target.value, 10)
            await setRowsPerPage(val);
            await setPage(0);
            fetchStemAvailability(1, val)
        }
  }
  var totalStems=0;

  if(data.length>0){
      var keys = Object.keys(data[0])
      
      data.forEach((order)=>{
        totalStems+=order.noOfStems;
      })
      
      return (
        <>
        <Table className="mb-0">
         <Typography variant="p" component="p"  style={{margin:"1rem"}}>Total Stems Avaialble for schedule:{totalStems}</Typography>
         <Typography variant="p" component="p"  style={{margin:"1rem"}}>Schedule Date:{scheduleDate}</Typography>
          <TableHead>
            <TableRow>
              {keys.map(key => (
                <TableCell style={{fontWeight:'600',textTransform:"uppercase"}}
                 key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {data.map(({name,transactionId,scheduleDate,scheduledStems, farming,variety}) => (
              <TableRow  >
                <TableCell className="pl-3 fw-normal" >{name}</TableCell>
                <TableCell>{transactionId}</TableCell>
                <TableCell>{scheduleDate}</TableCell>
                <TableCell>{scheduledStems}</TableCell>
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
         <div className="form-button-container">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              type="submit"
            >Schedule</Button>
          </div>
        </>
      );
    }
    //if loaded sucessfully and has no data mean render it 
    else if(!isLoading && !errorMsg){
      return(
        <>
              <Typography variant="p" component="p"  style={{margin:"1rem"}}>Total Stems Avaialble for schedule:{totalStems}</Typography>
              <Typography variant="p" component="p"  style={{margin:"1rem"}}>Schedule Date:{scheduleDate}</Typography>
            <div className={classes.root}>
             
                <Typography variant="h3" component="h3"  style={{margin:"1rem"}}>
                  No Results Found.
                </Typography>
            </div>
            <div style={{margin:"1rem auto",width:"fit-content"}}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                >Schedule</Button>
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





