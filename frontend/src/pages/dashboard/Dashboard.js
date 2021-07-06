import React, { useState, Dropdown, useEffect, useContext} from "react";
import {
  Grid,
} from "@material-ui/core";
import {useParams} from "react-router-dom";



import useStyles from "./styles";

// components
import mock from "./mock";

import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Loader from "../../components/Loader/Loader";

import Table from "./components/Table/Table";

import { FarmerContext } from "./context/FarmerContext";

 function Dashboard(props) {
  const {phone, name} = useParams();
  const {farmers,meta,loading,fetchPagination,updateFarmer,fetchById} = useContext(FarmerContext)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  var classes = useStyles();
  
  
  useEffect(() => {
     //if we dont have (phone && name) in params just get all detail
    if(!(phone && name)){
        fetchPagination(1, rowsPerPage);
    }
    else{
      fetchById(name,phone)
    }
    }, [])

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
      <PageTitle title="Admin Dashboard - Farmer Details" button="Latest Reports" />
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
                  Farmer Registration Details
                </Typography>
              </div>
            }
          >
          
          </Widget>
        </Grid>
     
        <Grid item xs={12}>
          <Widget
            title="Account Access to Login (to be Approved here)"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={farmers}  
                   meta={meta}
                   page={page}
                   updateFarmer={updateFarmer}
                   rowsPerPage={rowsPerPage}
                   fetchPagination={fetchPagination} 
                   handleChangePage={handleChangePage}
                   handleChangeRowsPerPage={handleChangeRowsPerPage}/>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}


export default Dashboard;
// #######################################################################


  