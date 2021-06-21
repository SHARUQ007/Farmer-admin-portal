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

import Table from "./components/Table/Table";

import { FarmerContext } from "./context/FarmerContext";

 function Dashboard(props) {
  let {id} = useParams();
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { farmers,fetchFarmers,updateFarmer,fetchById} = useContext(FarmerContext)
  var classes = useStyles();
  
  
  useEffect(() => {
     //if we dont have id in params just get all detail
    if(!id){
        fetchFarmers(1, rowsPerPage)
    }
    else{
      fetchById(id)
    }
    }, [])

  return (
    <>
      <PageTitle title="Farmer Dashboard" button="Latest Reports" />
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
            <Table data={farmers}  updateFarmer={updateFarmer}/>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}


export default Dashboard;
// #######################################################################


  