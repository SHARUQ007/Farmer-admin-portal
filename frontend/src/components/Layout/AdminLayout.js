import React from "react";
import {
  Route,
  Switch,
  withRouter,
  
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";
import Orders from "../../pages/orders/Orders";
import ScheduledStem from "../../pages/scheduledStem/ScheduledStem";



// map with redux
import Map from "../../pages/map";
import AddForm from "../../pages/map/form/AddForm";
import EditForm from "../../pages/map/form/EditForm";

// user
import User from "../../pages/user";

// user with context
import UserWithContext from "../../pages/user-context";
import AddUserForm from "../../pages/user-context/form/AddUserForm";
import EditUserForm from "../../pages/user-context/form/EditUserForm";

// context
import { useLayoutState } from "../../context/LayoutContext";

  
function AdminLayout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
              <Switch>
                <Route  exact path="/admin/dashboard" component={Dashboard} />
                <Route  exact path="/admin/dashboard/:name/:phone" component={Dashboard} />

                <Route  exact path="/admin/orders" component={Orders} />
                <Route  exact path="/admin/orders/:name/:phone" component={Orders} />
                
                <Route  exact path="/admin/scheduledStem" component={ScheduledStem} />

                <Route exact path="/admin/map" component={Map} />
                <Route exact path="/admin/map/add" component={AddForm} />
                <Route exact path="/admin/map/edit/:id" component={EditForm} />

                <Route exact path="/admin/user/" component={User} />
              
                <Route exact path="/admin/usercontext" component={UserWithContext} />
                <Route exact path="/admin/usercontext/add" component={AddUserForm} />
                <Route  exact path="/admin/usercontext/edit/:id" component={EditUserForm} />
              </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(AdminLayout);
