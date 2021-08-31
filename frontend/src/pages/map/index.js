import React from "react";
import { Grid, withStyles } from '@material-ui/core';
import API from "../../utils/api"


import DataTable from './table/DataTable'
import PageTitle from "../../components/PageTitle/PageTitle";

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    }
})

const Map = ({ classes, ...props }) => {
     const downloadJSON=()=>{
          API.map().downloadJSON()
            .then(res =>{
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'transporterData.json'); //or any other extension
              document.body.appendChild(link);
              link.click();
            })
    }
    return (
        <React.Fragment>
            <PageTitle title="Admin Dashboard - Transporter Details"  button="Download JSON" onClick={downloadJSON}/>
            <Grid container spacing={4}>
                <DataTable />
            </Grid>
        </React.Fragment>
    );
}

export default (withStyles(styles)(Map));