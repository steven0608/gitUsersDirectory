import React, { Component, Fragment } from 'react';
import './App.css';
import {connect} from "react-redux"
import SearchUser from "./SearchUser"
import UserList from "./UserList"
import RepoList from "./RepoList"

class App extends Component {

  getUserData=(userlist)=>{
    const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
    console.log("API_key",API_KEY)
    const configSubmit = {
        headers: {
    Authorization: `token ${API_KEY}`
  }
}
  console.log()
    if (!!userlist.message) {
        this.props.hasUserListFetchError()
        this.props.handleUserListFetchError(userlist.message)
    }else {
      this.props.noUserListFetchError()
      return userlist.forEach(user=>{
        fetch(user.url,configSubmit).then(r=>r.json()).then(data=>this.props.fetchUsers(data)).catch(data=>console.log(data))
      })
    }

  }

  componentDidMount(){
    const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
    console.log("API_key",API_KEY)
    const configSubmit = {
        headers: {
    Authorization: `token ${API_KEY}`
  }
}
    const url = "https://api.github.com/users?since=0"
    fetch(url,configSubmit).then(r=>r.json()).then(userlist=>this.getUserData(userlist))
  }

  handleClickToClose = ()=>{
      this.props.closeReposDiv()
  }


  render() {
    return (
      <Fragment>
        <SearchUser/>
        {this.props.showRepos ?
          <div className="bodycontent">
            <div className="half"><UserList/></div>
            <div className="half container">
            <button id = "x" onClick={this.handleClickToClose}>
            X
        </button>
            <RepoList/></div>
          </div>

        :
        <div className="middle">
        <UserList/>
        </div>
      }

      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {showRepos: state.showRepos,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: (data) => {
      dispatch({type: "GET_USERS", payload: data})
    },
    handleUserListFetchError:(data) =>{
      dispatch({type:"FETCHING_ERROR",payload:data})
    },
    hasUserListFetchError:() =>{
      dispatch({type:"USER_LIST_FETCH_ERROR"})
    },
    noUserListFetchError:() =>{
      dispatch({type:"NO_USER_LIST_FETCH_ERROR"})
    },
    closeReposDiv:() =>{
      dispatch({type:"DO_NOT_SHOW_REPO"})
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
