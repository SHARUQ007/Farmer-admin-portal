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
        loading:true
    };
   
    fetchPagination = async (page, rowsPerPage = 5) => {
      this.setState({...this.state,loading:true});
      API.orders().getScheduledStem(page,rowsPerPage)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            popupData:res.data.popupData,
            meta:res.data.meta,
            loading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,loading:false})
          console.log(err)
        })
    }

    fetchFilteredPagination = async (page, rowsPerPage = 5,status=null,date=null) => {
      this.setState({...this.state,loading:true});
      API.orders().getFilteredScheduledStem(page,rowsPerPage,status,date)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            popupData:res.data.popupData,
            meta:res.data.meta,
            loading:false
          })
        })
         .catch(err => {
          this.setState({...this.state,loading:false})
          console.log(err)
        })
    }

    fetchById = async (name,phone, onSuccess) => {
      this.setState({...this.state,loading:true});
      API.orders().fetchById(name,phone)
        .then(res =>{
            this.setState ({
              orders: res.data,
              loading:false
            })
            onSuccess()
        })
         .catch(err => {
          this.setState({...this.state,loading:false})
          console.log(err)
        })
    }
    
    createScheduledStem = (data, onSuccess)  => {
      this.setState({...this.state,loading:true});
      API.orders().create(data)
        .then(res =>{
            this.setState ({
              orders : res.data.orders,
              loading:true
            })
            onSuccess()
        })
        .catch(err => {
          this.setState({...this.state,loading:false})
           if(err.response.status===401){
           return onSuccess("unauthorized Access",true);
          }
          onSuccess("Sorry something went wrong",true);
          console.log(err)
        })
    }
    
    updateScheduledStem = (id, data, onSuccess) => {
      this.setState({...this.state,loading:true});
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
                  loading:false
                 }
              this.setState({...obj})
            }
            onSuccess("Status Updated Sucessfully")
            
        })
        .catch(err =>{
          this.setState({...this.state,loading:false})
          onSuccess("Sorry Something Went Wrong",true)
         console.log(err)
        }
         )
    }
    
    updateScheduledDate = (id, date,onSuccess) => {
      this.setState({...this.state,loading:true});
      API.orders().updateDate(id, date)
        .then(res =>{
            if(res.data.status==="success"){
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
                  popupData:tempPopupData,
                  loading:false
                 }
                 this.setState({...obj})
                 onSuccess("successfully Updated The Scheduled Date And Status")
            }
        })
        .catch(err =>{
          this.setState({...this.state,loading:false})
           if(err.response.status===401){
           return onSuccess("unauthorized Access",true);
          }
          onSuccess("Sorry something went wrong",true);
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
               updateScheduledDate: this.updateScheduledDate,
              deleteScheduledStem : this.deleteScheduledStem
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { ScheduledStemProvider,Consumer, ScheduledStemContext };
