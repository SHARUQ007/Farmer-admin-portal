import React from "react";
import API from "../../../utils/api"

let ScheduledStemContext;
const { Provider, Consumer } = (ScheduledStemContext = React.createContext());

class ScheduledStemProvider extends React.PureComponent {

    state = {
        orders: [],
        popupData:[],
        meta : {
          totalDocs : 0
        },
        selectedScheduledStem: null,
    };
   
    fetchPagination = async (page, rowsPerPage = 5) => {
      API.orders().getScheduledStem(page,rowsPerPage)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            popupData:res.data.popupData,
            meta:res.data.meta
          })
        })
        .catch(err => console.log(err))
    }

    fetchFilteredPagination = async (page, rowsPerPage = 5,status=null,date=null) => {
      API.orders().getFilteredScheduledStem(page,rowsPerPage,status,date)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            popupData:res.data.popupData,
            meta:res.data.meta
          })
        })
        .catch(err => console.log(err))
    }

    fetchById = async (name,phone, onSuccess) => {
      API.orders().fetchById(name,phone)
        .then(res =>{
            this.setState ({
              orders: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    createScheduledStem = (data, onSuccess)  => {
      API.orders().create(data)
        .then(res =>{
            this.setState ({
              orders : res.data.orders
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    updateScheduledStem = (id, data, onSuccess) => {
      API.orders().update(id, data)
        .then(res =>{
             if(res.data.status==="success"){
             //instead of getting data from server we manuly changing the data it save the bandwidth
             let tempOrders=[...this.state.orders];
             for(let i=0;i<this.state.orders.length;i++){
                    if(tempOrders[i].id===id){
                      tempOrders[i].status=data.status;
                      //if ordered find break this 
                      break;
                    }
              }
              let obj={
                  ...this.state,
                  orders:tempOrders,
                 }
              this.setState({...obj})
            }
            onSuccess("Status Updated Sucessfully")
            
        })
        .catch(err =>{
          onSuccess("Sorry Something Went Wrong",true)
         console.log(err)
        }
         )
    }
    
    updateScheduledDate = (id, date,onSuccess) => {
      API.orders().updateDate(id, date)
        .then(res =>{
            if(res.data.status==="success"){
                let isfind=false
                //instead of getting data from server we manuly changing the data it save the bandwidth
                let tempOrders=[...this.state.orders];
                let tempPopupData=[...this.state.popupData];
                 for(let i=0;i<this.state.popupData.length;i++){
                    if(tempPopupData[i].id===id){
                      tempPopupData[i].scheduledDate=date;
                      //if popupData is find change break this 
                      break
                    }
                  }
                 for(let i=0;i<this.state.orders.length;i++){
                    if(tempOrders[i].id===id){
                      tempOrders[i].status="Scheduled";
                      //if ordered is find  break this 
                      break;
                    }
                 }
                 let obj={
                  ...this.state,
                  orders:tempOrders,
                  popupData:tempPopupData
                 }
                 this.setState({...obj})
                 onSuccess("successfully Updated The Scheduled Date And Status")
            }
        })
        .catch(err =>{
          onSuccess("Sorry Something Went Wrong",true)

         console.log(err)}
         )
    }
    
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              fetchScheduledStem : this.fetchScheduledStem,
              fetchById : this.fetchById,
              fetchPagination:this.fetchPagination,
              fetchFilteredPagination:this.fetchFilteredPagination,
              createScheduledStem : this.createScheduledStem,
              updateScheduledStem : this.updateScheduledStem,
               updateScheduledDate: this. updateScheduledDate,
              deleteScheduledStem : this.deleteScheduledStem
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { ScheduledStemProvider,Consumer, ScheduledStemContext };
