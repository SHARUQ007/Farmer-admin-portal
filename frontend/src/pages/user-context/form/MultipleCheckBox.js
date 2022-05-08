import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width:"100%"
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup({roles,setRoles}) {

      const classes = useStyles();
      

      const handleChange = (event) => {
        setRoles({ ...roles, [event.target.name]: event.target.checked });
      };

      const { SUPER_ROLES, TRANSPORTER_ROLES, STEM_ROLES ,SCHEDULED_STEM_ROLES,FARMER_ROLES} = roles;
      const error = [SUPER_ROLES , TRANSPORTER_ROLES, STEM_ROLES,SCHEDULED_STEM_ROLES,FARMER_ROLES].filter((v) => v).length !== 2;

      return (
        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={SUPER_ROLES} onChange={handleChange} name="SUPER_ROLES" />}
                label="Super Admin Role"
              />
              <FormControlLabel
                control={<Checkbox checked={TRANSPORTER_ROLES} onChange={handleChange} name="TRANSPORTER_ROLES" />}
                label="Transporter Admin Role"
              />
              <FormControlLabel
                control={<Checkbox checked={STEM_ROLES} onChange={handleChange} name="STEM_ROLES" />}
                label="Stem Admin Role"
              />
              <FormControlLabel
                control={<Checkbox checked={SCHEDULED_STEM_ROLES} onChange={handleChange} name="SCHEDULED_STEM_ROLES" />}
                label="Scheduled Stem Admin Role"
              />
               <FormControlLabel
                control={<Checkbox checked={FARMER_ROLES} onChange={handleChange} name="FARMER_ROLES" />}
                label="Farmer Admin Role"
              />
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
          </FormControl>
          
        </div>
      );

}
