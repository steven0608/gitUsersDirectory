const defaultState = {
  userList:[],
  showRepos:false,
  selectedUser: "",
  reposList:[],
  currentRepoPage:1,
  endOfRepos:false,
  currentUserPage:1,
  userListFetchMessage: "",
  userListFetchError:false,
  userNameInput:"",
  numberOfReposInput:"",
  locationInput:"",
  numberOfFollowersInput:"",
  searchResultUserList:[],
  showSearchUser:false,
}

export default function(state = defaultState, action) {

  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        userList: [
          ...state.userList,
          action.payload
        ]
      }
      case "SHOW_REPO":
        return {
          ...state,
          showRepos: true
        }
      case "SELECT_USER":
        return {
          ...state,
          selectedUser:
            action.payload
        }
      case "GET_REPOS":
        return {
          ...state,
          reposList:
          action.payload
      }
      case "UPDATE_REPO_LIST":
        return {
          ...state,
          reposList:
          action.payload
      }
      case "UPDATE_CURRENT_REPO_PAGE":
        return {
          ...state,
          currentRepoPage:
          action.payload
      }
      case "NO_MORE_REPO":
        return {
          ...state,
          endOfRepos: !state.endOfRepos
      }
      case "UPDATE_USER_CURRENT_PAGE":
        return {
          ...state,
          currentUserPage: action.payload
      }
      case "EMPTY_USERS":
        return {
          ...state,
          userList: []
      }
      case "FETCHING_ERROR":
        return {
          ...state,
          userListFetchMessage: action.payload
      }
      case "USER_LIST_FETCH_ERROR":
        return {
          ...state,
          userListFetchError: true
      }
      case "NO_USER_LIST_FETCH_ERROR":
        return {
          ...state,
          userListFetchError: false
      }
      case "RESET_END_OF_REPO":
        return {
          ...state,
          endOfRepos: false
      }
      case "DO_NOT_SHOW_REPO":
        return {
          ...state,
          showRepos: false
      }
      case "UPDATE_USER_NAME_INPUT":
        return {
          ...state,
          userNameInput: action.payload
      }
      case "UPDATE_REPOS_INPUT":
        return {
          ...state,
          numberOfReposInput: action.payload
      }
      case "UPDATE_LOCATION_INPUT":
        return {
          ...state,
          locationInput: action.payload
      }
      case "UPDATE_FOLLOWERS_INPUT":
        return {
          ...state,
          numberOfFollowersInput: action.payload
      }
      case "GET_SEARCH_USERS":
        return {
          ...state,
          searchResultUserList:[
            ...state.searchResultUserList,
            action.payload
          ]
      }
      case "EMPTY_RESULT_LIST":
        return {
          ...state,
          searchResultUserList:[]
      }
      case "SHOW_SEARCH_USERS_OUTPUT":
        return {
          ...state,
          showSearchUser:true,
      }
      case "SHOW_MAIN_USERS_LIST":
        return {
          ...state,
          showSearchUser:false,
      }
    default:
      return state
  }
}
