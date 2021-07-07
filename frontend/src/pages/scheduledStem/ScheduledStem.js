import React, { useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {
  Grid,
} from "@material-ui/core";


import useStyles from "./styles";

// components

import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Loader from "../../components/Loader/Loader";

import Table from "./components/Table/Table";

import { ScheduledStemContext ,ScheduledStemProvider} from "./context/ScheduledStemContext";

 function ScheduledStem(props) {
  const { name,phone} = useParams();
  const { orders,popupData,meta,loading,fetchPagination,fetchFilteredPagination,updateScheduledStem,fetchById ,updateScheduledDate} = useContext(ScheduledStemContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  var classes = useStyles();
  
  useEffect(() => {
    //if we dont have (phone && name) in params just get all``
    if(!(phone && name)){
        fetchPagination(1, rowsPerPage);
    }
    else{
      fetchById(name,phone)
    }
    }, [phone,name] )

  const handleChangePage = async (event, newPage) => {
        await setPage(newPage);
        fetchPagination(newPage + 1, rowsPerPage)
    };

    const handleChangeRowsPerPage = async (event) => {
        if (event.target.value){
            const val = parseInt(event.target.value, 10)
            await setRowsPerPage(val);
            await setPage(0);
            fetchPagination(1, val)
        }
    };
  return (
    <>
    <Loader isOpen={loading}/>
      <PageTitle title="Admin Dashboard - Scheduled Stem Availability Data" button="Latest Reports" />
      <Grid container spacing={4}>
       
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Sheduled Stem Availability Data
                </Typography>
              </div>  
            }
          >
          </Widget>
        </Grid>
     
        <Grid item xs={12}>
          <Widget
            title="List of all Transactions which are scheduled"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={orders}  
                    popupData={popupData}
                    meta={meta}
                    isLoading={loading}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    updateScheduledDate={updateScheduledDate}
                    updateScheduledStem={updateScheduledStem} 
                    fetchPagination={fetchPagination} 
                    fetchFilteredPagination={fetchFilteredPagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
          </Widget>
        </Grid>
      </Grid>
    </>

  );
}


function ContextWrapper(){
  return(
    <ScheduledStemProvider>
      <ScheduledStem/>
    </ScheduledStemProvider>
    );
}
export default ContextWrapper;


  