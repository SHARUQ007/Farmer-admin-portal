import React from "react";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

import "./style.css"
function PopUpCard({id,data,closePopUp}) {
	//if we have id mean display none else flex because when user click the name the id passed here 
	var style={display:id?"flex":"none"}

	if(id ){
		let orderData;
		data.forEach((data) => {
			if(id===data.id){
				orderData=data;
			}
		});
		if(orderData){
				var text=[]
      			var keys = Object.keys(orderData).map((key)=>{
      				if(key!=="id"){
	      				return (<div key={key} className="popUpData">
	      							<p className="popUpKey">{key}:</p>
	      							<p className="popUpValue">{orderData[key]}</p>
	      						</div>)
      				}
      			});
      			console.log(keys,"d")


		}
	}	
  return (
		   <div className="popupContainer" style={style}>
		   		  <PersonPinCircleIcon />
				  <div className="popupCard">
				  	<div className="popupBody">
				    	{keys}
				    <input type="button" 
						    name="popupButton" 
						    className="popupButton" 
						    value="OK" 
						    onClick={closePopUp}
					/>
					</div>
				  </div>
		   </div>
  );
}
export default PopUpCard;
