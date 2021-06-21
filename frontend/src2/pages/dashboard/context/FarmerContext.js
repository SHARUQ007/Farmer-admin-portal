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
    };
   
    fetchFarmers = async (page, rowsPerPage = 5, name = null, email = null) => {
      API.farmer(). fetchAll()
        .then(res => {
          this.setState ({
            farmers : res.data,
          })
        })
        .catch(err => console.log(err))
    }

    fetchById = async (id, onSuccess) => {
      API.farmer().fetchById(id)
        .then(res =>{
            this.setState ({
              selectedFarmer : res.data
            })
            onSuccess(this.state.selectedFarmer)
        })
        .catch(err => console.log(err))
    }
    
    createFarmer = (data, onSuccess)  => {
      API.farmer().create(data)
        .then(res =>{
            this.setState ({
              selectedFarmer : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    updateFarmer = (id, data, onSuccess) => {
      API.farmer().update(id, data)
        .then(res =>{
            this.setState ({
              selectedFarmer : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    deleteFarmer = (id, onSuccess) => {
      API.farmer().delete(id)
        .then(res =>{

          onSuccess()
        })
    }
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              fetchFarmers : this.fetchFarmers,
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
