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

import { TransporterDataContext ,TransporterDataProvider} from "./context/TransporterDataContext";

 function TransporterData(props) {

  const { transporterData,freeTransporter,meta,isLoading,errorMsg,fetchPagination,fetchFilteredPagination,updateTransporterData,fetchFreeTransporter ,assignNewTransporter} = useContext(TransporterDataContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  var classes = useStyles();
  
  useEffect(() => {
        fetchPagination(1, rowsPerPage);
    },[])

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
    <Loader isOpen={isLoading}/>
      <PageTitle title="Admin Dashboard - Transporter Allocated  Data" button="Latest Reports" />
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
                  Transporter Allocated  Data
                </Typography>
              </div>  
            }
          >
          </Widget>
        </Grid>
     
        <Grid item xs={12}>
          <Widget
            title="List of Transporter that are Allocated "
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={transporterData}  
                    freeTransporter={freeTransporter}
                    meta={meta}
                    isLoading={isLoading}
                    errorMsg={errorMsg}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    assignNewTransporter={assignNewTransporter}
                    updateTransporterData={updateTransporterData} 
                    fetchPagination={fetchPagination} 
                    fetchFilteredPagination={fetchFilteredPagination}
                    fetchFreeTransporter={fetchFreeTransporter}
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
    <TransporterDataProvider>
      <TransporterData/>
    </TransporterDataProvider>
    );
}
export default ContextWrapper;


  