const authReducer = (state = {auth: null}, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
            auth: action.auth
        }
      case 'LOGOUT':
        return {
            auth: null
        }
      default:
        return state
    }
  }
  
  export default authReducer