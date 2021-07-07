import React, { useState, useEffect } from 'react'
import { TextField, withStyles, Button, Paper, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import * as actions from "../../../actions/map";
import PageTitle from "../../../components/PageTitle/PageTitle";
import '../style.css';

const styles = theme => ({
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
})

const initialFormState = { 
	id: null, 
	name: "",
	mobile:"",
	password:"",
	number:"",
	capacity:"",
	city: ""
}

const EditForm = ({ classes, ...props }) => {
	const [ map, setMap ] = useState(initialFormState)
	const [ errors, setErrors ] = useState({})
	
	useEffect(() => {
		const onSuccess = (map) => {
            setMap(map)
		}
		const id = props.match.params.id
		props.fetchById(id, onSuccess)
	}, [])

	const handleInputChange = event => {
		const { name, value } = event.target

			setMap({ ...map, [name]: value })
		
	}

	const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

        if(!map.name || map.name.trim() ===  ""){
			formIsValid = false;
			tempErrors["name"] = "Cannot be empty";
		}
	
		if(!map.mobile || map.mobile.trim() ===  ""){
			formIsValid = false;
			tempErrors["mobile"] = "Cannot be empty";
		}
		
		if(!map.password || map.password.trim() ===  ""){
			formIsValid = false;
			tempErrors["password"] = "Cannot be empty";
		}

		if(!map.number || map.number.trim() ===  ""){
			formIsValid = false;
			tempErrors["number"] = "Cannot be empty";
		}
		if(!map.capacity || map.capacity.trim() ===  ""){
			formIsValid = false;
			tempErrors["capacity"] = "Cannot be empty";
		}
	
		setErrors(tempErrors);
		return formIsValid;
    }
	
	const handleSubmit = (e) => {
		const onSuccess = () => {
			props.history.push("/admin/map")
			toast.success('Data succesfully updated');
		}
		
        e.preventDefault();

        if(validate()){
			props.update(map.id, map, onSuccess)
        }
    }

	return (
		<React.Fragment>
            <PageTitle title="Edit Map" />
            <Grid container spacing={4} >

				<Paper className={classes.paper}>

				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >

					<TextField
						name="name"
						variant="outlined"
						label="Name"
						fullWidth
						value={map.name}
						onChange={handleInputChange}
						{...(errors.name && { error: true, helperText: errors.name })}
					/>

					<TextField
						name="password"
						variant="outlined"
						label="Password"
						fullWidth
						value={map.password}
						onChange={handleInputChange}
						{...(errors.password && { error: true, helperText: errors.password })}
					/>

					<TextField
						name="number"
						variant="outlined"
						label="Assigned Truck Number"
						fullWidth
						value={map.number}
						onChange={handleInputChange}
						{...(errors.number && { error: true, helperText: errors.number })}
					/>

					<TextField
						name="capacity"
						variant="outlined"
						label="Assigned Truck Capacity"
						fullWidth
						value={map.capacity}
						onChange={handleInputChange}
						{...(errors.capacity && { error: true, helperText: errors.capacity })}
					/>
					
					<TextField
						name="city"
						variant="outlined"
						label="City"
						fullWidth
						value={map.city}
						onChange={handleInputChange}
						{...(errors.city && { error: true, helperText: errors.city })}
					/>
					

					<div className="form-button-container">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => props.history.push("/admin/map")}
						>Cancel</Button>

						<Button
							variant="contained"
							color="secondary"
							size="large"
							type="submit"
						>Save</Button>
					</div>
					
				</form>
				</Paper>
			</Grid>
		</React.Fragment>
    );
}

const mapStateToProps = state => ({
    mapList: state.map.list
})

const mapActionToProps = {
	fetchById: actions.fetchById,
	update: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EditForm));
