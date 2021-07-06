import React, { useState, useEffect, useContext } from 'react'
import { TextField, withStyles, Button, Paper, Grid,FormControl ,InputLabel} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { toast } from 'react-toastify';
import PageTitle from "../../../components/PageTitle/PageTitle";
import { UserContext } from "../context/UserContext";
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
	email: "",
	admin_type:""
}

const EditUserForm = ({ classes, ...props }) => {

	const [ user, setUser ] = useState(initialFormState)
	const [ errors, setErrors ] = useState({})
	const { fetchById, updateUser} = useContext(UserContext)
    const adminType={0:"SUPER_ADMIN",1:"ADMIN_ONE",2:"ADMIN_TWO"}

	useEffect(() => {
		const onSuccess = (user) => {
            setUser(user)
		}
		const id = props.match.params.id
		fetchById(id, onSuccess)
	}, [])

	const handleInputChange = event => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value })
	}

	function done(msg,isError){
      //if sucess
      if(!isError){
       props.history.push("/admin/usercontext")
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
	const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

        if(!user.name || user.name.trim() ===  ""){
			formIsValid = false;
			tempErrors["name"] = "Cannot be empty";
		}
	
		if(!user.email || user.email.trim() ===  ""){
			formIsValid = false;
			tempErrors["email"] = "Email not valid";
		}
	
		setErrors(tempErrors);
		return formIsValid;
    }
	
	const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
			updateUser(user.id, user, done)
        }
    }

	return (
		<React.Fragment>
            <PageTitle title="Edit User" />
            <Grid container spacing={4} >

				<Paper className={classes.paper}>

				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >

					<TextField
						name="name"
						variant="outlined"
						label="Name"
						fullWidth
						value={user ? user.name : ''}
						onChange={handleInputChange}
						{...(errors.name && { error: true, helperText: errors.name })}
					/>
					<TextField
						name="email"
						variant="outlined"
						label="Email"
						fullWidth
						value={user ? user.email : ''}
						onChange={handleInputChange}
						{...(errors.email && { error: true, helperText: errors.email })}
					/>
					<FormControl  fullWidth variant="outlined"   style={{margin:"24px"}}>
					<InputLabel id="admin_types">Admin Type</InputLabel>
						<Select
						  name="admin_type"
				          id="admin_type"
				          value={Number(user.admin_type)}
				          onChange={handleInputChange}
				          style={{marginTop:"10px"}}
				        >
				          <MenuItem value={0}>{adminType[0]}</MenuItem>
				          <MenuItem value={1}>{adminType[1]}</MenuItem>
				          <MenuItem value={2}>{adminType[2]}</MenuItem>
				        </Select>
			        </FormControl>
					
					<div className="form-button-container">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => props.history.push("/admin/usercontext")}
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

export default (withStyles(styles)(EditUserForm));
