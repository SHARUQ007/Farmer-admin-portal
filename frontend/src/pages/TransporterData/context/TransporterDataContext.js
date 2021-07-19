import React from "react";
import API from "../../../utils/api"

let TransporterDataContext;
const { Provider, Consumer } = (TransporterDataContext = React.createContext());

class TransporterDataProvider extends React.PureComponent {

    state = {
        transporterData: [],
        freeTransporter:[], 
        meta : {
          totalDocs : 0
        },
        selectedTransporterData: null,
        isLoading:true,
        errorMsg:null
    };
   
    fetchPagination = async (page, rowsPerPage = 5) => {
      this.setState({...this.state,isLoading:true});
      API.transporterData().fetchPagination(page,rowsPerPage)
        .then(res => {
          this.setState ({
            transporterData : res.data.transporterData,
            meta:res.data.meta,
            isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem transporterData data try again later"})
          console.log(err)
        })
    }

    fetchFilteredPagination = async (page, rowsPerPage = 5,status=null,date=null) => {
      this.setState({...this.state,isLoading:true});
      alert(status)
      API.transporterData().getFilteredData(page,rowsPerPage,status,date)
        .then(res => {
          this.setState ({
            transporterData : res.data.transporterData,
            meta:res.data.meta,
            isLoading:false
          })
        })
         .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem transporterData data try again later"})
          console.log(err)
        })
    }

    fetchFreeTransporter = async () => {
      this.setState({...this.state,isLoading:true});
      API.transporterData().fetchFreeTransporter()
        .then(res =>{
          console.log(res.data,"\n\nsssssss\n")
            this.setState ({
              ...this.state,
              freeTransporter: res.data.freeTransporter,
              isLoading:false
            })
        })
         .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem transporterData data try again later"})
          console.log(err)
        })
    }
    
    createTransporterData = (data, onSuccess)  => {
      this.setState({...this.state,isLoading:true});
      API.transporterData().create(data)
        .then(res =>{
            this.setState ({
              transporterData : res.data.transporterData,
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
    
    updateTransporterData = (id, data, onSuccess) => {
      this.setState({...this.state,isLoading:true});
      API.transporterData().update(id, data)
        .then(res =>{
             if(res.data.status==="success"){
             //instead of getting data from server we manuly changing the data it save the bandwidth
             let tempOrders=[...this.state.transporterData];
             for(let i=0;i<this.state.transporterData.length;i++){
                    if(tempOrders[i].id===id){
                      tempOrders[i].status=data.status;
                      //if ordered find break this 
                      break;
                    }
              }
              let obj={
                  ...this.state,
                  transporterData:tempOrders,
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
    
    assignNewTransporter = (id,transporter_id,onSuccess) => {
      this.setState({...this.state,isLoading:true});
      API.transporterData().assignNewTransporter(id,transporter_id)
        .then(res =>{
            if(res.data.status==="success"){               
                 this.setState({...this.state,isLoading:false})
                 onSuccess("successfully Assigned new transporter")
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
    
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              fetchTransporterData : this.fetchTransporterData,
              fetchFreeTransporter : this.fetchFreeTransporter,
              fetchPagination:this.fetchPagination,
              fetchFilteredPagination:this.fetchFilteredPagination,
              createTransporterData : this.createTransporterData,
              updateTransporterData : this.updateTransporterData,
               assignNewTransporter: this.assignNewTransporter,
              deleteTransporterData : this.deleteTransporterData
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { TransporterDataProvider,Consumer, TransporterDataContext };
