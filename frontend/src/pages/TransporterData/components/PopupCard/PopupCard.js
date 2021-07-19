import React from "react";
import {TextField} from "@material-ui/core";
import { toast } from 'react-toastify';
import Dropdown from "./Dropdown"

import "./style.css"
function PopupCard({ id,freeTransporter,fetchFreeTransporter,closePopup,assignNewTransporter}) {
	//if we have id mean display none else flex because when user click the name the id passed here 
	var style={display:id?"flex":"none"};
	var [newTransporterID,setNewTransporterID]=React.useState(null);
	React.useEffect(()=>{
		if(id){
			fetchFreeTransporter();
		}
	},[id])
	
	async function clickHandler(){
		if(newTransporterID){
			await assignNewTransporter(id,newTransporterID,done);
		}
		closePopup();
	}
	function done(msg,isError){
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
 

  return (
		   <div className="popupContainer" style={style}>
				  <div className="popupCard">
				  <h3>List of transporter whose are free</h3>
				  	<div className="popupBody">
				  	<Dropdown 
				  	freeTransporter={freeTransporter} 
				  	setNewTransporterID={setNewTransporterID}/>
				    <input type="button" 
						    name="popupButton" 
						    className="popupButton" 
						    value="Assign" 
						    onClick={clickHandler}
					/>
					</div>
				  </div>
		   </div>
  );
}
export default PopupCard;
