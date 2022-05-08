import React from "react";
import "./style.css"


function ImageViewer({src,setSrc}) {
  let style={display:src?"flex":"none"};
  
  return (
		   <div className="popupContainer" style={style}>
				  <div className="popupCard">
				  			<img src={"/api/orders/image/"+src} className="popupImage" alt="Image not found"/>

					<input type="button" 
						    className="closeButton" 
						    value="close" 
						    onClick={()=>{setSrc(null)}}
					/>
					</div>

		   </div>
  );
}
export default ImageViewer;
