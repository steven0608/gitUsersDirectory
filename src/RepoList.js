import React, {Fragment }from 'react';
import {connect} from "react-redux";
import UUID from "uuid"
import ShowRepo from "./ShowRepo"



const RepoList =(props) => {


  function handleRepolist(data){
      props.updateRepoList(data)
      if(data.length ===0){
          props.noMoreRepo()
      }
  }


  function handleNextPageClick(){
    const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
    const configSubmit = {
        headers: {
    Authorization: `token ${API_KEY}`
  }
}
    const nextPage = props.currentRepoPage + 1
    const url = `https://api.github.com/users/${props.selectedUser}/repos?page=${nextPage}&per_page=20`
    fetch(url,configSubmit).then(r=>r.json()).then(data=>handleRepolist(data))
    props.updateCurrentRepopage(nextPage)
  }



  function handlePrevPageClick(){
    if (props.endOfRepos) {
      props.noMoreRepo()
    }
    if (props.currentRepoPage>1) {
      const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
      const configSubmit = {
          headers: {
      Authorization: `token ${API_KEY}`
    }
  }
      const prevPage = props.currentRepoPage - 1
      const url = `https://api.github.com/users/${props.selectedUser}/repos?page=${prevPage}&per_page=20`
      fetch(url,configSubmit).then(r=>r.json()).then(data=>props.updateRepoList(data))
      props.updateCurrentRepopage(prevPage)
    }
  }

  return(
    <Fragment>
      <center className="black">{props.selectedUser}'s repositories List</center>
        <div className="ui list">
          {props.reposList.map(repo=>
            <ShowRepo repo={repo} key={UUID()}/>
            )}
          </div>
        <div>
        {props.endOfRepos ?
          <div  className="ui red message">
          No More Repos
          </div>
          :
          null
        }
        {props.currentRepoPage === 1 ?
          <div className="center"><button className="ui right labeled icon green basic button changeColor" onClick={handleNextPageClick}>Current Page: {props.currentRepoPage} Next<i className="right chevron icon"></i></button></div>
          :
            props.endOfRepos ?
            <div className="center"><button className="ui labeled icon red basic button changeColor" onClick={handlePrevPageClick}><i className="left chevron icon"></i>Current Page: {props.currentRepoPage} Prev</button></div>
            :
          <div className="center"><button className="ui labeled icon red basic button changeColor" onClick={handlePrevPageClick}><i className="left chevron icon"></i>Prev</button><span className="pageNum">Current Page: {props.currentRepoPage}</span><button className="ui right labeled icon green basic button changeColor" onClick={handleNextPageClick}>Next<i className="right chevron icon"></i></button></div>
        }
        </div>
      </Fragment>
  )
}

function mapStateToProps(state) {
  return {reposList: state.reposList,
          selectedUser: state.selectedUser,
          currentRepoPage:state.currentRepoPage,
          endOfRepos:state.endOfRepos,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrentRepopage: (data) => {
      dispatch({type: "UPDATE_CURRENT_REPO_PAGE", payload: data})
    },
    updateRepoList: (data) => {
      dispatch({type: "UPDATE_REPO_LIST", payload: data})
    },
    noMoreRepo: (data) => {
      dispatch({type: "NO_MORE_REPO"})
    },

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RepoList)
