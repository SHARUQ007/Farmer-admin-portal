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
        loading:true
    };
   
    fetchOrders = async () => {
      this.setState({...this.state,loading:true});
      API.orders().fetchAll()
        .then(res => {
          this.setState ({
            orders : res.data,
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
      API.orders().fetchPagination(page,rowsPerPage)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
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
      API.orders().getFilteredStem(page,rowsPerPage,status,date)
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
    
    createOrders = (data, onSuccess)  => {
      this.setState({...this.state,loading:true});
      API.orders().create(data)
        .then(res =>{
            this.setState ({
              selectedOrders : res.data,
              loading:false
            })
            onSuccess()
        })
       .catch(err => {
          this.setState({...this.state,loading:false})
          console.log(err)
        })
    }
    
    updateOrders = (id, data, onSuccess) => {
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
        .catch(err => {
          onSuccess("Sorry Something Went Wrong",true)
          console.log(err)})
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
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}
  
export { OrdersProvider,Consumer, OrdersContext };
