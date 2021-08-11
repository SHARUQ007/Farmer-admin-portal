import React, { useState, useEffect } from 'react'
import { TextField, withStyles, Button, Paper, Grid } from "@material-ui/core";
import { toast } from 'react-toastify';
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { makeStyles } from '@material-ui/core/styles';
import '../style.css';

const useStyles = props => makeStyles( theme => ({
  paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    justifyContent: 'center',
    },
      postBtn: {
        width: "200px",
        marginTop: "30px",
        marginBottom: "20px"
    }
}));

const initialFormState = { 
 id:"",
 DatePenaltyValue:"",
 PriorityPenaltyValue:"",
 ExcessstemsReceived:"",
}

const HyperForm = (props) => {
  const [ hyperParams, setHyperParams ] = useState(initialFormState)
  const [ errors, setErrors ] = useState({})

  const classes=useStyles(props)();
  
  useEffect(() => {
            setHyperParams(props.hyperParams)
  }, [props.hyperParams])


  const handleInputChange = event => {
    const { name, value } = event.target
    setHyperParams({ ...hyperParams, [name]: value });
  }

  const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

    if(!hyperParams.DatePenaltyValue===undefined ){
      formIsValid = false;
      tempErrors["DatePenaltyValue"] = "Cannot be empty";
    }
  
    if(!hyperParams.PriorityPenaltyValue ===undefined){
      formIsValid = false;
      tempErrors["PriorityPenaltyValue"] = "Cannot be empty";
    }
    
    if(!hyperParams.ExcessstemsReceived===undefined){
      formIsValid = false;
      tempErrors["ExcessstemsReceived"] = "Cannot be empty";
    }
    setErrors(tempErrors);
    return formIsValid;
    }
    function onSuccess(msg,isError){
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
    const handleSubmit = (e) => {
      
      e.preventDefault();

      if(validate()){
        props.updateHyperParameter(hyperParams,onSuccess)
      }
    }

  return (
    <React.Fragment>
    <Grid container spacing={4} >
        <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit} component={Paper} >
          <TextField
            name="DatePenaltyValue"
            variant="outlined"
            label="Date Penality Value"
            fullWidth
            value={hyperParams.DatePenaltyValue}
            onChange={handleInputChange}
            {...(errors.DatePenaltyValue && { error: true, helperText: errors.DatePenaltyValue })}
          />

          <TextField
            name="PriorityPenaltyValue"
            variant="outlined"
            label="Priority Penality Value"
            fullWidth
            value={hyperParams.PriorityPenaltyValue}
            onChange={handleInputChange}
            {...(errors.PriorityPenaltyValue && { error: true, helperText: errors.PriorityPenaltyValue })}
          />

          <TextField
            name="ExcessstemsReceived"
            variant="outlined"
            label="Excess Stems Recevied In The Previous Schedule"
            fullWidth
            value={hyperParams.ExcessstemsReceived}
            onChange={handleInputChange}
            {...(errors.ExcessstemsReceived && { error: true, helperText: errors.ExcessstemsReceived })}
          />

          <div className="form-button-container">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              type="submit"
            >Save Changes</Button>
          </div>
        </form>
        </Paper>
      </Grid>
    </React.Fragment>
    );
}



export default HyperForm;