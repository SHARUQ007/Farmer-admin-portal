import React from "react";
import API from "../../../utils/api"

let ScheduledStemContext;
const { Provider, Consumer } = (ScheduledStemContext = React.createContext());

class ScheduledStemProvider extends React.PureComponent {

    state = {
        orders: [],
        meta : {
          totalDocs : 0
        },
        selectedScheduledStem: null,
    };
   
    fetchPagination = async (page, rowsPerPage = 5, name = null, email = null) => {
      API.orders().getScheduledStem(page,rowsPerPage)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
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
              selectedScheduledStem : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    updateScheduledStem = (id, data, onSuccess) => {
      API.orders().update(id, data)
        .then(res =>{
            this.setState ({
              selectedScheduledStem : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    deleteScheduledStem = (id, onSuccess) => {
      API.orders().delete(id)
        .then(res =>{

          onSuccess()
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
              createScheduledStem : this.createScheduledStem,
              updateScheduledStem : this.updateScheduledStem,
              deleteScheduledStem : this.deleteScheduledStem
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { ScheduledStemProvider,Consumer, ScheduledStemContext };
