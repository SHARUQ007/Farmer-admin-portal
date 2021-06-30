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
   
    fetchOrders = async () => {
      API.orders(). fetchAll()
        .then(res => {
          this.setState ({
            orders : res.data,
          })
        })
        .catch(err => console.log(err))
    }
    fetchPagination = async (page, rowsPerPage = 5, name = null, email = null) => {
      API.orders().fetchPagination(page,rowsPerPage)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            meta:res.data.meta
          })
        })
        .catch(err => console.log(err))
    }

    fetchFilteredPagination = async (page, rowsPerPage = 5,status=null,date=null) => {
      API.orders().getFilteredStem(page,rowsPerPage,status,date)
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
              fetchPagination:this.fetchPagination,
              fetchFilteredPagination:this.fetchFilteredPagination,
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
