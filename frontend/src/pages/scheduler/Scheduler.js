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

import TransporterTable from "./components/Table/TransporterTable";
import ScheduledFarmer from "./components/Table/ScheduledFarmer";
import ScheduledStems from "./components/Table/ScheduledStems";
import NonScheduledTransporter from "./components/Table/NonScheduledTransporter";

import InputForm from "./components/form/InputForm";
import HyperForm from "./components/form/HyperForm";


import { SchedulerContext ,SchedulerProvider} from "./context/SchedulerContext";

function Scheduler(props) {
 
  const { schedulerData,fetchScheduledTransporter,
          fetchNonScheduledTransporter,fetchScheduledFarmer,
          fetchStemAvailability,fetchAvailability,
          fetchInputParameter,fetchHyperParameter,
          updateHyperParameter,updateInputParameter
        } = useContext(SchedulerContext)

  const {isLoading,errorMsg}=schedulerData;
  
  var classes = useStyles();

  useEffect(()=>{
    fetchScheduledTransporter();
    fetchScheduledFarmer();
    fetchNonScheduledTransporter();
    fetchStemAvailability();
    fetchInputParameter();
    fetchHyperParameter();
  },[fetchScheduledTransporter,fetchStemAvailability,fetchScheduledFarmer,fetchNonScheduledTransporter,fetchInputParameter,fetchHyperParameter])
   
  
  return (
    <>
    <Loader isOpen={schedulerData.isLoading}/>
      <PageTitle title="Scheduled Farmers and Transporter"  />
      <Grid container spacing={4}>
       
        <Grid item xs={12}>
          <Widget
            title="Scheduled Farmers"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
          <ScheduledFarmer data={schedulerData.scheduledFarmer}  
                    meta={schedulerData.farmerMeta}
                    isLoading={schedulerData.isLoading}
                    errorMsg={errorMsg}
                    fetchScheduledFarmer={fetchScheduledFarmer}
                    />
          </Widget>
        </Grid>
         <Grid item xs={12}>
          <Widget
            title="Scheduled Transporter"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <TransporterTable data={schedulerData.scheduledTransporter}  
                    meta={schedulerData.transporterMeta}
                    isLoading={schedulerData.isLoading}
                    errorMsg={errorMsg}
                    fetchScheduledTransporter={fetchScheduledTransporter}
                    />
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            title="Non Scheduled Transporter"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <NonScheduledTransporter data={schedulerData.nonScheduledTransporter}  
                    meta={schedulerData.nonTransporterMeta}
                    isLoading={schedulerData.isLoading}
                    errorMsg={errorMsg}
                    fetchNonScheduledTransporter={fetchNonScheduledTransporter}
                    />
          </Widget>
        </Grid>

         <Grid item xs={12}>
          <Widget
            title="Scheduler"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <ScheduledStems data={schedulerData.stemAvailability}  
                            scheduleDate={schedulerData.scheduleDate}
                    meta={schedulerData.stemMeta}
                    isLoading={schedulerData.isLoading}
                    errorMsg={errorMsg}
                    fetchStemAvailability={fetchStemAvailability}
                    />
          </Widget>
        </Grid>
          <Grid item xs={12}>
              <Widget
                title="Input Parameter"
                upperTitle
                noBodyPadding
                bodyClass={classes.tableWidget}
              >
              <InputForm inputParams={schedulerData.inputParams} updateInputParameter={updateInputParameter}/>
          </Widget>
        </Grid>
        <Grid item xs={12}>
              <Widget
                title="Hyepr Parameter"
                upperTitle
                noBodyPadding
                bodyClass={classes.tableWidget}
              >
              <HyperForm hyperParams={schedulerData.hyperParams} updateHyperParameter={updateHyperParameter}/>            
          </Widget>
        </Grid>
      </Grid>
    </>

  );
}


function ContextWrapper(){
  return(
    <SchedulerProvider>
      <Scheduler/>
    </SchedulerProvider>
    );
}
export default ContextWrapper;


  