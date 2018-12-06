import React from 'react';
import {connect} from "react-redux";



const SearchUser =(props) => {

  function handleBackToMainUserslist() {
    props.noUserListFetchError()
    props.backToMainList()
  }

  function handleSearchResult(data) {
    if (!!data.message ||data.items.length===0) {
        props.hasUserListFetchError()
        props.handleUserListFetchError("No Result found, please try again")
    } else {
        props.noUserListFetchError()
        data.items.forEach(user=>{
          fetch(user.url).then(r=>r.json()).then(data=>props.fetchSearchUsers(data)).catch(data=>console.log(data))
        })
    }
  }

  function handleLoginSearch(event){
      event.preventDefault()
      props.emptyResultList()
      props.showSearchUserOuput()
      const username=encodeURIComponent(props.userNameInput.trim())
      const location = encodeURIComponent(props.locationInput.trim())
      const url=`https://api.github.com/search/users?q=${username}+repos:%3E${props.numberOfReposInput}+followers:%3E${props.numberOfFollowersInput}+location:%22${location}%22`
      fetch(url).then(r=>r.json()).then(data=>handleSearchResult(data)).catch(data=>console.log(data))
  }

  return(<div className="searchform">
          <form onSubmit={handleLoginSearch}>
          <label>Name:
              <input type="text" value={props.userNameInput} onChange={(event) => props.handleUserNameInput(event)} placeholder="searchname" required/>
          </label>
          <label>Repos:
              <input type="number" value={props.numberOfReposInput} onChange={(event) => props.handleReposInput(event)} placeholder="number of repos" required/>
          </label>
          <label>Location:
              <input type="text" value={props.locationInput} onChange={(event) => props.handleLocationInput(event)} placeholder="location" required/>
          </label>
          <label>Followers:
              <input type="number" value={props.numberOfFollowersInput} onChange={(event) => props.handleFollowersInput(event)} placeholder="number of followers" required/>
          </label>
              <input className="searchbutton" type="submit" value="Search"/>
              <span className="backToMainList" onClick={handleBackToMainUserslist}>Back To Main Users List</span>
          </form>
      </div>
  )
}

function mapStateToProps(state) {
  return {userNameInput: state.userNameInput,
          numberOfReposInput: state.numberOfReposInput,
          locationInput: state.locationInput,
          numberOfFollowersInput: state.numberOfFollowersInput,
        }
      }

function mapDispatchToProps(dispatch) {
  return {
    handleUserNameInput: (event) => {
      dispatch({type: "UPDATE_USER_NAME_INPUT", payload: event.target.value})
    },
    handleReposInput: (event) => {
      dispatch({type: "UPDATE_REPOS_INPUT", payload: event.target.value})
    },
    handleLocationInput: (event) => {
      dispatch({type: "UPDATE_LOCATION_INPUT", payload: event.target.value})
    },
    handleFollowersInput: (event) => {
      dispatch({type: "UPDATE_FOLLOWERS_INPUT", payload: event.target.value})
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
    fetchSearchUsers: (data) => {
      dispatch({type: "GET_SEARCH_USERS", payload: data})
    },
    emptyResultList: () => {
      dispatch({type: "EMPTY_RESULT_LIST"})
    },
    showSearchUserOuput: () => {
      dispatch({type: "SHOW_SEARCH_USERS_OUTPUT"})
    },
    backToMainList:()=>{
      dispatch({type:"SHOW_MAIN_USERS_LIST"})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchUser)
