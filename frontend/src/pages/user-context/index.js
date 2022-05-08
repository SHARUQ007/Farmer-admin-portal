import React from "react";
import { Grid, withStyles } from '@material-ui/core';

import DataTable from './table/DataTable'
import PageTitle from "../../components/PageTitle/PageTitle";

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    }
})

const UserWithContext = ({ classes, ...props }) => {
    return (
        <React.Fragment>
            <PageTitle title="Admin Dashboard - Admin Users" />
            <Grid container spacing={4}>
            
                <DataTable />
            </Grid>
        </React.Fragment>
    );
}

export default (withStyles(styles)(UserWithContext));