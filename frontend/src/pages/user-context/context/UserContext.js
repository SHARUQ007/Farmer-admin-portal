import React from "react";
import API from "../../../utils/api"

let UserContext;
const { Provider, Consumer } = (UserContext = React.createContext());

class UserProvider extends React.PureComponent {

    state = {
        users: [],
        meta : {
          totalDocs : 0
        },
        isLoading:true,
        selectedUser: null,
        errorMsg:null
    };

    fetchUsers = async (page, rowsPerPage = 5, name = null, email = null) => {
      this.setState({...this.state,isLoading:true});
      API.user().fetchPagination(page, rowsPerPage, name, email)
        .then(res => {
          this.setState ({
            users : res.data.users,
            meta : res.data.meta,
            isLoading:false
          })
        })
       .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the user data try again later"})
          console.log(err)
        })
    }

    fetchById = async (id, onSuccess) => {
      this.setState({...this.state,isLoading:true});
      API.user().fetchById(id)
        .then(res =>{
            this.setState ({
              selectedUser : res.data
            })
            onSuccess(this.state.selectedUser)
        })
       .catch(err => {
          this.setState({...this.state,isLoading:false,errorMsg:"Sorry something went wrong while fetching the user data try again later"})
           if(err.response.status===401){
            // onSuccess("unauthorized Access",true);
          }
          console.log(err)
        })
    }
    
    createUser = (data, onSuccess)  => {
      this.setState({...this.state,isLoading:true});
      API.user().create(data)
        .then(res =>{
            this.setState ({
              selectedUser : res.data,
              isLoading:false
            })
            onSuccess("new user succesfully created")
        })
       .catch(err => {
          this.setState({...this.state,isLoading:false})
           if(err.response.status===401){
            onSuccess("unauthorized Access",true);
          }
          console.log(err)
        })
    }
    
    updateUser = (id, data, onSuccess) => {
      this.setState({...this.state,isLoading:true});
      API.user().update(id, data)
        .then(res =>{
            this.setState ({
              selectedUser : res.data,
              isLoading:false
            })
            onSuccess('User data succesfully updated');
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false})
          if(err.response.status===401){
            onSuccess("unauthorized Access",true);
          }
          else{
             onSuccess("Sorry Something Went Wrong",true);
           }
          console.log(err,"error")
        })
    }
    
    deleteUser = (id, onSuccess) => {
      this.setState({...this.state,isLoading:true});
      API.user().delete(id)
        .then(res =>{
          this.setState({...this.state,isLoading:false})
          onSuccess("User succesfully deleted")
        })
        .catch(err => {
          this.setState({...this.state,isLoading:false})
           if(err.response.status===401){
            onSuccess("unauthorized Access",true);
          }
          console.log(err)
        })
    }
    
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              
              fetchUsers : this.fetchUsers,
              fetchById : this.fetchById,
              createUser : this.createUser,
              updateUser : this.updateUser,
              deleteUser : this.deleteUser
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}

export { UserProvider, Consumer, UserContext };
