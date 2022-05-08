import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#23ff09',
    backgroundColor:"#00000038"
  },
  circularProgress:{
    height:"100px; !important",
    width:"100px; !important"
  }
}));

export default function Loader({isOpen}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };
  //run when props change
   React.useEffect(()=>{
      setOpen(isOpen);
   },[isOpen]);

  return (
    <div >
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit"  className={classes.circularProgress}/>
      </Backdrop>
    </div>
  );
}
