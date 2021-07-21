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
        isLoading:true
    };
   
    fetchOrders = async () => {
      this.setState({...this.state,isLoading:true});
      API.orders().fetchAll()
        .then(res => {
          this.setState ({
            orders : res.data,
            isLoading:false,
            errorMsg:null
          })
        })
       .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the stem orders data try again later"})
          console.log(err)
        })
    }

    fetchPagination = async (page, rowsPerPage = 5, name = null, email = null) => {
      this.setState({...this.state,isLoading:true});
      API.orders().fetchPagination(page,rowsPerPage)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            meta:res.data.meta,
            isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the stem orders data try again later"})
          console.log(err)
        })
    }

    fetchFilteredPagination = async (page, rowsPerPage = 5,status=null,date=null) => {
      this.setState({...this.state,isLoading:true});
      API.orders().getFilteredStem(page,rowsPerPage,status,date)
        .then(res => {
          this.setState ({
            orders : res.data.orders,
            popupData:res.data.popupData,
            meta:res.data.meta,
            isLoading:false
          })
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false})
          console.log(err)
        })
    }

    fetchById = async (name,phone, onSuccess) => {
      this.setState({...this.state,isLoading:true});
      API.orders().fetchById(name,phone)
        .then(res =>{
            this.setState ({
              orders : res.data.orders,
            meta:res.data.meta,
            isLoading:false
            })
            onSuccess()
        })
       .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the stem orders data try again later"})
          console.log(err)
        })
    }
    
    createOrders = (data, onSuccess)  => {
      this.setState({...this.state,isLoading:true});
      API.orders().create(data)
        .then(res =>{
            this.setState ({
              selectedOrders : res.data,
              isLoading:false
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
    
    updateOrders = (id, data, onSuccess) => {
      this.setState({...this.state,isLoading:true});
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
        .catch(err => {
          if(err.response.status===401){
           return onSuccess("unauthorized Access",true);
          }
          onSuccess("Sorry something went wrong",true);
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
