import React,{Fragment} from 'react';
import {connect} from "react-redux";
import ShowUser from "./ShowUser"
import UUID from "uuid"



const UserList =(props) => {


    function handleUserslist(data) {
      const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
      const configSubmit = {
          headers: {
      Authorization: `token ${API_KEY}`
    }
  }
      if (!!data.message) {
        props.hasUserListFetchError()
        props.handleUserListFetchError(data.message)
      } else {
        props.noUserListFetchError()
        return data.forEach(user=>{
        fetch(user.url,configSubmit).then(r=>r.json()).then(data=>props.fetchUsers(data)).catch(data=>console.log(data))
      })
      }
    }

    function handleNextUserPageClick() {
      props.emptyUser()
      const nextPage = props.currentUserPage +1
      const nextNum = (nextPage - 1)* 30
      console.log(nextNum)
      console.log("next Page", nextPage)
      const url = `https://api.github.com/users?since=${nextNum}`

      const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
      const configSubmit = {
          headers: {
      Authorization: `token ${API_KEY}`
    }
  }

      fetch(url, configSubmit).then(r=>r.json()).then(data=>handleUserslist(data))
      props.updateUserCurrentPage(nextPage)
    }

    function handlePrevUserPageClick() {
        if (props.currentUserPage >1) {
          const prevPage = props.currentUserPage -1
          const nextNum = (prevPage-1)*30
          const url = `https://api.github.com/users?since=${nextNum}`

          const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
          const configSubmit = {
              headers: {
          Authorization: `token ${API_KEY}`
        }
      }

          fetch(url, configSubmit).then(r=>r.json()).then(data=>handleUserslist(data))
          props.updateUserCurrentPage(prevPage)
        }
    }


  return(<Fragment>
            {props.userListFetchError ?
                <div  className="ui red message">
                  {props.userListFetchMessage}
                </div>
                :
                props.showSearchUser ?
                <Fragment>
                  <div className="ui six doubling cards">
                    {props.searchResultUserList.map(user=>
                    <ShowUser user={user} key={UUID()}/>
                    )}
                  </div>
                </Fragment>
                :
                  props.currentUserPage === 1 ?
                    <Fragment>
                      <div className="ui six doubling cards">
                        {props.userList.map(user=>
                          <ShowUser user={user} key={UUID()}/>
                        )}
                      </div>
                      <div className="center"><button className="ui right labeled icon green basic button changeColor"
                          onClick={handleNextUserPageClick}>Current Page: {props.currentUserPage} Next
                            <i className="right chevron icon"></i></button>
                      </div>
                    </Fragment>
                    :
                      <Fragment>
                        <div className="ui six doubling cards">
                          {props.userList.map(user=>
                            <ShowUser user={user} key={UUID()}/>
                          )}
                        </div>
                            <div className="center"><button className="ui labeled icon red basic button changeColor" onClick={handlePrevUserPageClick}>
                                <i className="left chevron icon"></i>Prev</button><span className="pageNum">Current Page: {props.currentUserPage}</span><button className="ui right labeled icon green basic button changeColor" onClick={handleNextUserPageClick}>Next<i className="right chevron icon"></i></button>
                            </div>
                      </Fragment>
                    }
                  </Fragment>
  )
}

function mapStateToProps(state) {
  return {userList: state.userList,
          currentUserPage:state.currentUserPage,
          userListFetchMessage:state.userListFetchMessage,
          userListFetchError:state.userListFetchError,
          showSearchUser:state.showSearchUser,
          searchResultUserList:state.searchResultUserList,
          }
        }

function mapDispatchToProps(dispatch) {

  return {
          updateUserCurrentPage: (data) => {
            dispatch({type: "UPDATE_USER_CURRENT_PAGE",payload:data})
        },
        fetchUsers: (data) => {
          dispatch({type: "GET_USERS", payload: data})
        },
        emptyUser: () => {
          dispatch({type: "EMPTY_USERS"})
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

      }
  }


export default connect(mapStateToProps,mapDispatchToProps)(UserList)
