import React, { useState, useEffect, useContext } from 'react'
import { TextField, withStyles, Button, Paper, Grid,FormControl ,InputLabel} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { toast } from 'react-toastify';
import PageTitle from "../../../components/PageTitle/PageTitle";
import { UserContext ,UserProvider} from "../context/UserContext";
import MultipleCheckBox from "./MultipleCheckBox";
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
	admin_roles:[]
}
const initialRoleState ={
        SUPER_ROLES:false,
        TRANSPORTER_ROLES:false,
        STEM_ROLES:false,
        SCHEDULED_STEM_ROLES:false,
        FARMER_ROLES:false
}
const EditUserForm = ({ classes, ...props }) => {

	const [ user, setUser ] = useState(initialFormState)
	const [roles, setRoles] = useState(initialRoleState);

	const [ errors, setErrors ] = useState({})
	const { fetchById, updateUser} = useContext(UserContext)

	useEffect(() => {
		const onSuccess = (user) => {
            setUser(user)
            let adminRoles={}
            if(user.admin_roles.length>0){
		      user.admin_roles.forEach(role=>{
		        adminRoles[role]=true
		      })
		     setRoles({...adminRoles})
		  }
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
		
	   let tempRoles=[]
		for (const role in roles) {
 			 if(roles[role]){
 			 	tempRoles.push(role)
 			 }
		}
		user.admin_roles=tempRoles;
        e.preventDefault();
        if(validate()){
			updateUser(user.id, user, done)
        }
    }
    console.log(user,"kk")
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
					
			        <MultipleCheckBox roles={roles} setRoles={setRoles}/>
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

function ContextWrapper(props){
  return(
    <UserProvider>
      <EditUserForm {...props}/>
    </UserProvider>
    );
}


export default (withStyles(styles)(ContextWrapper));
