import React from "react";
import API from "../../../utils/api"

let OrdersContext;
const { Provider, Consumer } = (OrdersContext = React.createContext());

class OrdersProvider extends React.PureComponent {

    state = {
        orders: [],
        meta : {
          totalDocs : 0
        },
        selectedOrders: null,
    };
   
    fetchOrders = async (page, rowsPerPage = 5, name = null, email = null) => {
      API.orders(). fetchAll()
        .then(res => {
          this.setState ({
            orders : res.data,
          })
        })
        .catch(err => console.log(err))
    }

    fetchById = async (id, onSuccess) => {
      API.orders().fetchById(id)
        .then(res =>{
            this.setState ({
              selectedOrders : res.data
            })
            onSuccess(this.state.selectedOrders)
        })
        .catch(err => console.log(err))
    }
    
    createOrders = (data, onSuccess)  => {
      API.orders().create(data)
        .then(res =>{
            this.setState ({
              selectedOrders : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    updateOrders = (id, data, onSuccess) => {
      API.orders().update(id, data)
        .then(res =>{
            this.setState ({
              selectedOrders : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    deleteOrders = (id, onSuccess) => {
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
              fetchOrders : this.fetchOrders,
              fetchById : this.fetchById,
              createOrders : this.createOrders,
              updateOrders : this.updateOrders,
              deleteOrders : this.deleteOrders
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { OrdersProvider,Consumer, OrdersContext };
