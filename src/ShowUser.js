import React,{Fragment} from 'react';
import {connect} from "react-redux"


const ShowUser=(props) => {

  function handleClickOnUser(event){
    event.preventDefault()
    props.clickShowRepos()
    props.selectUser(props.user.login)
    props.updateCurrentRepopage(1)
    props.resetEndOfRepo()
    // console.log(props.user.login)

    // "https://api.github.com/users/steven0608/repos?page=1&per_page=100"
    const url = `https://api.github.com/users/${props.user.login}/repos?page=1&per_page=20`
    // console.log(url)
    fetch(url).then(r=>r.json()).then(data=>props.getRepos(data)).catch(data=>console.log(data))
  }

  return(<Fragment>
    {props.showRepos ?
      <div className={props.selectedUser === props.user.login ? `small card selected` :`small card greyBackground`} onClick={handleClickOnUser}>
                <div className="image">
                  <img src={props.user.avatar_url} alt="Empty" />
                </div>

                <div className="content">
                  <div className="meta">
                    <div>{props.user.name}</div>
                  </div>
                </div>
          </div>

        :
        <div className={props.selectedUser === props.user.login ? `small card selected` :`small card greyBackground`} onClick={handleClickOnUser}>
                <div className="image">
                  <img src={props.user.avatar_url} alt="Empty" />
                </div>

                <div className="content">
                  <div className="header">{props.user.name}</div>
                  <div className="meta">
                    <div>{props.user.login}</div>
                  </div>
                  <div className="description">
                    {!!props.user.location ? `Live in ${props.user.location} ` : null}
                    {!!props.user.company ? `Company: ${props.user.company} ` : null}
                    Has {props.user.public_repos} Public Repos
                  </div>
                </div>
                <div className="extra content">
                  <span className="right floated">
                    Follwing:{props.user.following}
                  </span>
                  <span>
                    <i className="user icon"></i>
                    {props.user.followers} Followers
                  </span>
                </div>
          </div>}
      </Fragment>
  )
}

function mapStateToProps(state) {
  return {showRepos: state.showRepos,
          selectedUser:state.selectedUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickShowRepos: () => {
      dispatch({type: "SHOW_REPO"})
    },
    selectUser: (data)=>{
      dispatch({type: "SELECT_USER", payload: data})
    },
    getRepos: (data)=>{
      dispatch({type: "GET_REPOS", payload: data})
    },
    updateCurrentRepopage: (data) => {
      dispatch({type: "UPDATE_CURRENT_REPO_PAGE", payload: data})
    },
    resetEndOfRepo: () => {
      dispatch({type: "RESET_END_OF_REPO"})
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ShowUser)
