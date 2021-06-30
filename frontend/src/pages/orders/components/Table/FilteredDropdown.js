import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FilteredDropdown({filteredStatus,filteredDate,setFilteredStatus,fetchFilteredPagination}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = async (event) => {
    setFilteredStatus(event.target.value)
    fetchFilteredPagination(1,5,event.target.value,filteredDate)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Filter By Status</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={filteredStatus}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            <MenuItem value={"Scheduled"}  >Scheduled</MenuItem>
            <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
            <MenuItem value={"Rescheduled"}>Rescheduled</MenuItem>
            <MenuItem value={"Order Recevied"}>Order Recevied</MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}
