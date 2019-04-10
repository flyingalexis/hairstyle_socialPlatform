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
      case 'UPDATE':
        return{
          auth:{
            ...state.auth,
            ...action.updates
          }
        }
      default:
        return state
    }
  }
  
  export default authReducer