import React from "react";


import "./style.css"
function PopupCard({id,popupData,date,setDate,closePopup,updateScheduledDate}) {
	//if we have id mean display none else flex because when user click the name the id passed here 
	var style={display:id?"flex":"none"};
	function scheduleDate(){
		if(date){
			updateScheduledDate(id,date);
		}
		closePopup();
	}

	var keys = Object.keys(popupData).map((key)=>{
		if(key==="scheduledDate"){
			return(<div key={popupData.key} className="popupData">
						<p className="popupKey">{key}:</p>
						<input type="date" className="popupDate" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
				</div>)
		}
		else if(key!=="id" ){
			return (<div key={popupData.key} className="popupData">
						<p className="popupKey">{key}:</p>
						<p className="popupValue">{String(popupData[key])}</p>
					</div>)
		}
	});

  return (
		   <div className="popupContainer" style={style}>
				  <div className="popupCard">
				  <h3>Reschedule maually</h3>
				  	<div className="popupBody">
				    	{keys}
				    <input type="button" 
						    name="popupButton" 
						    className="popupButton" 
						    value="OK" 
						    onClick={scheduleDate}
					/>
					</div>
				  </div>
		   </div>
  );
}
export default PopupCard;
