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
        recieved: "success",
       placed: "warning",
        declined: "error",
      };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(props.statusprop);
  const [color, setColor] = React.useState(props.statusprop.toLowerCase());

  const handleChange = (event) => {
    setStatus(String(event.target.value) || "");
    setColor(String(event.target.value).toLowerCase() || "");
  };
  const done=()=>{
    alert("done")
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.farmerData.status=status; 
    props.updateOrders(props.id,props.farmerData,done)
    setOpen(false);
  };

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
                <MenuItem value={"Placed"}>Placed</MenuItem>
                <MenuItem value={"Recieved"}>Recieved</MenuItem>
                <MenuItem value={"Declined"}>Declined</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
