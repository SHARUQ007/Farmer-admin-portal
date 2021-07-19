import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../../../../components/Wrappers";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { toast }  from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function DialogSelect(props) {
    const states = {
        confirmed: "success",
        scheduled: "warning",
        canceled:"error"
      };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(props.statusprop);
  const [color, setColor] = React.useState(props.statusprop.toLowerCase());

  //this will run when the props change to set rescheduled
  React.useEffect(()=>{
    setStatus(props.statusprop);
     setColor(String(props.statusprop).toLowerCase());
  },[props.statusprop])

  const handleChange = (event) => {
    setStatus(String(event.target.value) || "");
    setColor(String(event.target.value).toLowerCase() || "");
  };
  function done(msg,isError){
      //if sucess
      if(!isError){
       toast.success(msg, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
     }
     else{
      toast.error(msg,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            });
     }
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateStatus=()=>{
    props.farmerData.status=status; 
    props.updateScheduledStem(props.id,props.farmerData,done)
    setOpen(false);
  }
  return (
    <div>
      <Button onClick={handleClickOpen}
         color={states[color]}
                size="small"
                className="px-1"
                variant="contained"
      >{status}</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Update the Status</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Status</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={status}
                onChange={handleChange}
                input={<Input />}
              >
                <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
                <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                <MenuItem value={"Rescheduled"}>Rescheduled</MenuItem>
                <MenuItem value={"Canceled"}>Canceled</MenuItem>

              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateStatus} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
