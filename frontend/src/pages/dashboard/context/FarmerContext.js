import React from "react";
import API from "../../../utils/api"

let FarmerContext;
const { Provider, Consumer } = (FarmerContext = React.createContext());

class FarmerProvider extends React.PureComponent {

    state = {
        farmers: [],
        meta : {
          totalDocs : 0
        },
        selectedFarmer: null,
        loading:true
    };
   
    fetchFarmers = async (page, rowsPerPage = 5, name = null, email = null) => {
      this.setState({...this.state,loading:true});
      API.farmer(). fetchAll()
        .then(res => {
          this.setState ({
            farmers : res.data,
            loading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,loading:false})
          console.log(err)
        })
    }

    fetchPagination = async (page, rowsPerPage = 5, name = null, email = null) => {
      this.setState({...this.state,loading:true});
      API.farmer().fetchPagination(page,rowsPerPage)
        .then(res => {
          this.setState ({
            farmers : res.data.farmers,
            meta:res.data.meta,
            loading:false

          })
        })
        .catch(err => {
          this.setState({...this.state,loading:false})
          console.log(err)
        })
    }
    fetchById = async (name,phone,onSuccess) => {
      this.setState({...this.state,loading:true});
      API.farmer().fetchById(name,phone)
        .then(res =>{
            this.setState ({
              farmers: res.data,
              loading:false
            })
            onSuccess()
        })
        .catch(err => {
          this.setState({...this.state,loading:false})
          console.log(err)
        })
    }
    
    createFarmer = (data, onSuccess)  => {
      this.setState({...this.state,loading:true});
      API.farmer().create(data)
        .then(res =>{
            this.setState ({
              selectedFarmer : res.data,
              loading:false
            })
            onSuccess()
        })
        .catch(err => {
          this.setState({...this.state,loading:false})
          console.log(err)
        })
    }
    
    updateFarmer = (id, data, onSuccess) => {
      this.setState({...this.state,loading:true});
      API.farmer().update(id, {status:data.status})
        .then(res =>{
            this.setState ({
              selectedFarmer : res.data,
              loading:false

            })
            onSuccess("Status updated succesfully")
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
    
    deleteFarmer = (id, onSuccess) => {
      this.setState({...this.state,loading:true});
      API.farmer().delete(id)
        .then(res =>{
            this.setState({...this.state,loading:false});
          onSuccess()
        })
    }
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              fetchFarmers : this.fetchFarmers,
              fetchPagination:this.fetchPagination,
              fetchById : this.fetchById,
              createFarmer : this.createFarmer,
              updateFarmer : this.updateFarmer,
              deleteFarmer : this.deleteFarmer
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { FarmerProvider,Consumer, FarmerContext };
