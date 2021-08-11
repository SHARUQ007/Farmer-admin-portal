import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, withStyles, Button, Paper, Grid } from "@material-ui/core";
import { toast } from 'react-toastify';

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
	CurrentDate:"",	
	DailyDemandRequirement:"",
	MaximumAllowance:"",
	WeightofBananaStem:"",
	LoadingTimeperStem:"",
	MaximumTruckLoadingCapacity:"",
	TruckStartTime:"",
	SchedulingAfter:"",
}

const InputForm = (props) => {
	const [inputParams, setInputParams ] = useState(initialFormState);

	const [ errors, setErrors ] = useState({})
	const classes=useStyles(props)();
	
	useEffect(() => {
       setInputParams(props.inputParams)
	}, [props.inputParams])

	const handleInputChange = event => {
		const { name, value } = event.target
		setInputParams({ ...inputParams, [name]: value });
	}

	const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

        if(!inputParams.CurrentDate ===undefined){
			formIsValid = false;
			tempErrors["CurrentDate"] = "Cannot be empty";
		}
	
		if(!inputParams.DailyDemandRequirement ===undefined){
			formIsValid = false;
			tempErrors["DailyDemandRequirement"] = "Cannot be empty";
		}
		
		if(!inputParams.MaximumAllowance===undefined){
			formIsValid = false;
			tempErrors["MaximumAllowance"] = "Cannot be empty";
		}

		if(!inputParams.WeightofBananaStem ===undefined){
			formIsValid = false;
			tempErrors["WeightofBananaStem"] = "Cannot be empty";
		}
		if(!inputParams.LoadingTimeperStem ===undefined){
			formIsValid = false;
			tempErrors["LoadingTimeperStem"] = "Cannot be empty";
		}
		if(!inputParams.MaximumTruckLoadingCapacity===undefined){
			formIsValid = false;
			tempErrors["MaximumTruckLoadingCapacity"] = "Cannot be empty";
		}
		if(!inputParams.TruckStartTime ===undefined){
			formIsValid = false;
			tempErrors["TruckStartTime"] = "Cannot be empty";
		}
		if(!inputParams.SchedulingAfter ===undefined){
			formIsValid = false;
			tempErrors["SchedulingAfter"] = "Cannot be empty";
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
       		props.updateInputParameter(inputParams,onSuccess);
        }
    }

	return (
		<React.Fragment>
           
            <Grid container spacing={4} >
				<Paper className={classes.paper}>
				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >
					<TextField
						name="CurrentDate"
					    label="current date"
					    type="date"
						fullWidth
						value={inputParams.CurrentDate}
					    InputLabelProps={{
					      shrink: true,
					    }}
					    onChange={handleInputChange}
						{...(errors.CurrentDate && { error: true, helperText: errors.CurrentDate })}
					  />
					<TextField
						name="DailyDemandRequirement"
						variant="outlined"
						label="Banana Stem Demand (per day)"
						fullWidth
						value={inputParams.DailyDemandRequirement}
						onChange={handleInputChange}
						{...(errors.DailyDemandRequirement && { error: true, helperText: errors.DailyDemandRequirement })}
					/>
					
					

					<TextField
						name="MaximumAllowance"
						variant="outlined"
						label="Banana Stem Demand Allowance(per day)"
						fullWidth
						value={inputParams.MaximumAllowance}
						onChange={handleInputChange}
						{...(errors.MaximumAllowance && { error: true, helperText: errors.MaximumAllowance })}
					/>
					<TextField
						name="WeightofBananaStem"
						variant="outlined"
						label="Banana Stem Weight(Kgs per stem)"
						fullWidth
						value={inputParams.WeightofBananaStem}
						onChange={handleInputChange}
						{...(errors.WeightofBananaStem && { error: true, helperText: errors.WeightofBananaStem })}
					/>
					<TextField
						name="LoadingTimeperStem"
						variant="outlined"
						label="Banana Stem Loading Time	(seconds per stem)"
						fullWidth
						value={inputParams.LoadingTimeperStem}
						onChange={handleInputChange}
						{...(errors.LoadingTimeperStem && { error: true, helperText: errors.LoadingTimeperStem })}
					/>

					<TextField
						name="MaximumTruckLoadingCapacity"
						variant="outlined"
						label="Maximum Truck Loading Capacity (percentage)"
						fullWidth
						value={inputParams.MaximumTruckLoadingCapacity}
						onChange={handleInputChange}
						{...(errors.MaximumTruckLoadingCapacity && { error: true, helperText: errors.MaximumTruckLoadingCapacity })}
					/>

					
					<TextField
						name="TruckStartTime"
						variant="outlined"
						label="Truck starting time "
						fullWidth
						value={inputParams.TruckStartTime}
						onChange={handleInputChange}
						{...(errors.TruckStartTime && { error: true, helperText: errors.TruckStartTime })}
					/>					
					<TextField
						name="SchedulingAfter"	
						variant="outlined"
						label="Schedule After Days"
						fullWidth
						value={inputParams.SchedulingAfter}
						onChange={handleInputChange}
						{...(errors.SchedulingAfter && { error: true, helperText: errors.SchedulingAfter })}
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



export default InputForm;
