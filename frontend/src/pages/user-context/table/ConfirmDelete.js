import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import Grow from '@material-ui/core/Grow';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const ConfirmDelete = (props) => {
  const {
    title, 
    message, 
    deleteUser,
    refresh
  } = props;
  
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
   
    e.preventDefault();
    deleteUser(props.id, done)
  }
  function done(msg,isError){
      //if sucess
      if(!isError){
       refresh()
       setOpen(false);
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

  return (
    <React.Fragment>
      
      <IconButton style={{ color: 'red' }} onClick={() => setOpen(true)} >
          <DeleteIcon />
      </IconButton>
      
      <Dialog  
        open={open}
        onClick={() => setOpen(false)}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>
              {title}
            </DialogTitle>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
                <DialogContentText>
                  {message}
                </DialogContentText>
            </DialogContent>

            <DialogActions style={{padding: 30}}>
                <Button variant="contained" color="primary"
                  onClick={() => setOpen(false)} >
                    No
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="secondary">
                    Yes
                </Button>
            </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}

export default ConfirmDelete;