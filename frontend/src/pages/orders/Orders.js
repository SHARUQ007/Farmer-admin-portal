import React, { useState, Dropdown, useEffect, useContext} from "react";
import {
  Grid,
} from "@material-ui/core";


import useStyles from "./styles";

// components

import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";

import Table from "./components/Table/Table";

import { OrdersContext ,OrdersProvider} from "./context/OrdersContext";

 function Orders(props) {
  const { orders,fetchOrders,updateOrders} = useContext(OrdersContext)
  var classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  
  useEffect(() => {
        fetchOrders(1, rowsPerPage)
    }, [])

  return (
    <>
      <PageTitle title="Orders Dashboard" button="Latest Reports" />
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
                  Orders Registration Details
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
            <Table data={orders}  updateOrders={updateOrders}/>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

function ContextWrapper(){
  return(
    <OrdersProvider>
      <Orders/>
    </OrdersProvider>
    );
}
export default ContextWrapper;
// #######################################################################


  