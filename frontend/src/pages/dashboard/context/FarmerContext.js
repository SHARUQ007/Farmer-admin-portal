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
        isLoading:true,
        errorMsg:null
    };
   
    fetchFarmers = async (page, rowsPerPage = 5, name = null, email = null) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.farmer().fetchAll()
        .then(res => {
          this.setState ({
            farmers : res.data,
            isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the farmer data try again later"})
          console.log(err)
        })
    }

    fetchPagination = async (page, rowsPerPage = 5, name = null, email = null) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.farmer().fetchPagination(page,rowsPerPage)
        .then(res => {
          this.setState ({
            farmers : res.data.farmers,
            meta:res.data.meta,
            isLoading:false

          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the farmer data try again later"})
          console.log(err)
        })
    }

    fetchFilteredPagination = async (page, rowsPerPage = 5,status=null) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.farmer().fetchFilteredFarmer(page,rowsPerPage,status)
        .then(res => {
          this.setState ({
            farmers : res.data.farmers,
            meta:res.data.meta,
            isLoading:false
          })
        })
         .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the scheduled stem orders data try again later"})
          console.log(err)
        })
    }
    fetchById = async (name,phone,onSuccess) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.farmer().fetchById(name,phone)
        .then(res =>{
            this.setState ({
              farmers: res.data,
              isLoading:false
            })
            onSuccess()
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the farmer data try again later"})
          console.log(err)
        })
    }
    
    createFarmer = (data, onSuccess)  => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.farmer().create(data)
        .then(res =>{
            this.setState ({
              selectedFarmer : res.data,
              isLoading:false
            })
            onSuccess()
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false})
          
          console.log(err)
        })
    }
    
    updateFarmer = (id, data, onSuccess) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.farmer().update(id, {status:data.status})
        .then(res =>{
            this.setState ({
              selectedFarmer : res.data,
              isLoading:false

            })
            onSuccess("Status updated succesfully")
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
    
    deleteFarmer = (id, onSuccess) => {
      this.setState({...this.state,isLoading:true,errorMsg:null});
      API.farmer().delete(id)
        .then(res =>{
            this.setState({...this.state,isLoading:false});
          onSuccess()
        })
    }

    downloadJSON=()=>{
      API.farmer().downloadJSON()
        .then(res =>{
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'farmerData.json'); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
    }
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              fetchFarmers : this.fetchFarmers,
              fetchPagination:this.fetchPagination,
              fetchFilteredPagination:this.fetchFilteredPagination,
              fetchById : this.fetchById,
              createFarmer : this.createFarmer,
              updateFarmer : this.updateFarmer,
              deleteFarmer : this.deleteFarmer,
              downloadJSON:this.downloadJSON
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { FarmerProvider,Consumer, FarmerContext };
