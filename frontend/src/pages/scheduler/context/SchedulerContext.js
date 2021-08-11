import React from "react";
import API from "../../../utils/api"

let SchedulerContext;
const { Provider, Consumer } = (SchedulerContext = React.createContext());

class SchedulerProvider extends React.PureComponent {

    state = {
        scheduledFarmer:[],
        farmerMeta:{},
        scheduledTransporter:[],
        transporterMeta:{},
        nonScheduledTransporter:[],
        nonTransporterMeta:{},
        stemAvailability:[],
        scheduleDate:"",
        stemMeta:{},
        inputParams:{},
        hyperParams:{}, 
        isLoading:true,
        errorMsg:null
    };
   
    fetchScheduledFarmer= async (page, rowsPerPage = 5) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.scheduler().fetchScheduledFarmer(page,rowsPerPage)
        .then(res => {
          this.setState ({
            ...this.state,
            scheduledFarmer:res.data.scheduledFarmer,
            farmerMeta:res.data.meta,
            isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }


    fetchScheduledTransporter= async (page, rowsPerPage = 5) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.scheduler().fetchScheduledTransporter(page,rowsPerPage)
        .then(res => {
          this.setState ({
            ...this.state,
            scheduledTransporter:res.data.scheduledTransporter,
            transporterMeta:res.data.meta,
            isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }

    

    fetchNonScheduledTransporter= async (page, rowsPerPage = 5) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.scheduler().fetchNonScheduledTransporter(page,rowsPerPage)
        .then(res => {
          this.setState ({
            ...this.state,
           nonScheduledTransporter:res.data.nonScheduledTransporter,
           nonTransporterMeta:res.data.meta,
           isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }

    fetchStemAvailability= async (page, rowsPerPage = 5) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.scheduler().fetchStemAvailability(page,rowsPerPage)
        .then(res => {
          this.setState ({
            ...this.state,
           stemAvailability:res.data.stemAvailability,
           scheduleDate:res.data.scheduleDate,
           stemMeta:res.data.meta,
           isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }


    fetchInputParameter= async () => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.scheduler().fetchInputParameter()
        .then(res => {
          this.setState ({
            ...this.state,
           inputParams:res.data.inputParams,
           isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }

    fetchHyperParameter= async () => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.scheduler().fetchHyperParameter()
        .then(res => {
          this.setState ({
            ...this.state,
           hyperParams:res.data.hyperParams,
           isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }

    updateInputParameter= async (data,onSuccess) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.scheduler().updateInputParameter(data)
        .then(res => {
          this.setState ({
            ...this.state,
           isLoading:false
          })
          onSuccess(res.data.message);
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

    updateHyperParameter= async (data,onSuccess) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.scheduler().updateHyperParameter(data)
        .then(res => {
          this.setState ({
            ...this.state,
           isLoading:false
          })
          onSuccess(res.data.message);
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

    
    render() {
      return (
        <Provider
          value={{
              schedulerData:this.state,
              fetchScheduledTransporter : this.fetchScheduledTransporter,
              fetchNonScheduledTransporter:this.fetchNonScheduledTransporter,
              fetchScheduledFarmer : this.fetchScheduledFarmer,
              fetchStemAvailability : this.fetchStemAvailability,
              fetchInputParameter:this.fetchInputParameter,
              fetchHyperParameter : this.fetchHyperParameter,
              updateInputParameter : this.updateInputParameter,
              updateHyperParameter: this.updateHyperParameter,
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { SchedulerProvider,Consumer, SchedulerContext };
