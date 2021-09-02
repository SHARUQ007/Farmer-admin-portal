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
        isLoading:true,
        errorMsg:null
    };
   
    fetchPagination = async (page, rowsPerPage = 5) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.orders().getScheduledStem(page,rowsPerPage)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            popupData:res.data.popupData,
            meta:res.data.meta,
            isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }

    fetchFilteredPagination = async (page, rowsPerPage = 5,status=null,date=null) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.orders().getFilteredScheduledStem(page,rowsPerPage,status,date)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            popupData:res.data.popupData,
            meta:res.data.meta,
            isLoading:false
          })
        })
         .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }

    fetchById = async (name,phone, onSuccess) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.orders().fetchById(name,phone)
        .then(res =>{
            this.setState ({
              orders: res.data,
              isLoading:false
            })
            onSuccess()
        })
         .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }
    
    createScheduledStem = (data, onSuccess)  => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.orders().create(data)
        .then(res =>{
            this.setState ({
              orders : res.data.orders,
              isLoading:true
            })
            onSuccess()
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false})
           if(err.response.status===401){
           return onSuccess("unauthorized Access",true);
          }
          onSuccess("Sorry something went wrong",true);
          console.log(err)
        })
    }
    
    updateScheduledStem = (id, data, onSuccess) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
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
                  isLoading:false
                 }
              this.setState({...obj})
            }
            onSuccess("Status Updated Sucessfully")
            
        })
        .catch(err =>{
          this.setState({...this.state,isLoading:false})
          if(err.response.status===401){
           return onSuccess("unauthorized Access",true);
          }
          onSuccess("Sorry Something Went Wrong",true)
         console.log(err)
        }
         )
    }
    
    updateScheduledDate = (id, date,onSuccess) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
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
                  isLoading:false
                 }
                 this.setState({...obj})
                 onSuccess("successfully Updated The Scheduled Date And Status")
            }
        })
        .catch(err =>{
          this.setState({...this.state,isLoading:false})
           if(err.response.status===401){
           return onSuccess("unauthorized Access",true);
          }
          onSuccess("Sorry something went wrong",true);
          console.log(err)}
         )
    }
    downloadJSON=()=>{
      API.orders().scheduledStemDownloadJSON()
        .then(res =>{
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'scheduledStemData.json'); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
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
              deleteScheduledStem : this.deleteScheduledStem,
              downloadJSON:this.downloadJSON
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { ScheduledStemProvider,Consumer, ScheduledStemContext };
