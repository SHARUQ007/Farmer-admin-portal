import React, { useState, useEffect , useContext } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  LibraryBooks as LibraryIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import BusinessIcon from '@material-ui/icons/Business';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import EcoIcon from '@material-ui/icons/Eco';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AdjustIcon from '@material-ui/icons/Adjust';
// styles
import useStyles from "./styles";
import "./scrollbar.css";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { AuthContext } from "../../context/AuthContext";

var structure = [
      { id: 0, label: "Farmer", link: "/admin/dashboard", icon: <PersonPinCircleIcon /> },
      { id: 3, label: "Transporter", link: "/admin/map", icon: <LocalShippingIcon /> },
      { id: 2, label: "Admin User", link: "/admin/usercontext", icon: <BusinessIcon />  },
      {id: 7, label: "Stem Availability Data", link: "/admin/orders", icon: <EcoIcon />  },
      {id: 8, label: "Scheduled stem ", link: "/admin/scheduledStem", icon: <CheckCircleOutlineIcon /> },
      {id: 9, label: "Scheduler", link: "/admin/scheduler", icon: <AdjustIcon /> },
      {id: 10, label: "Transporter Data", link: "/admin/transporterData", icon: <AdjustIcon /> },
      { id: 4, type: "divider" },
      { id: 5, type: "title", label: "Details" },
      { id: 6, label: "Documents", link: "", icon: <LibraryIcon /> },
    ];

function Sidebar({ location }) {
  let { isSuperAdmin } = useContext(AuthContext);
  //if he is not super admin dont show user 
  if(!isSuperAdmin()){
    //only remove if it is admin user else dont 
    if(structure[2].label==="Admin User"){
    structure.splice(2,1)
    }
  }
  
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <div>
        <List className={classes.sidebarList}>
          {structure.map(link => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        </List>
      </div>
      
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
