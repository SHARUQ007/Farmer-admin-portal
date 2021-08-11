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

export default function ScheduledFarmer({data,isLoading,errorMsg,meta,fetchScheduledFarmer}) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  
  const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
        fetchScheduledFarmer(newPage + 1, rowsPerPage)
  }

  const handleChangeRowsPerPage = async (event) => {
        if (event.target.value){
            const val = parseInt(event.target.value, 10)
            await setRowsPerPage(val);
            await setPage(0);
            fetchScheduledFarmer(1, val)
        }
  }

  if(data.length>0){
      var keys = Object.keys(data[0])
      keys.shift(); // delete "id" key
      return (
        <>
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
            {data.map(({name,transactionId,scheduleDate,scheduledStems, farming,variety}) => (
                <TableRow>
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
        </>
      );
    }
    //if loaded sucessfully and has no data mean render it 
    else if(!isLoading && !errorMsg){
      return(
        <>
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





