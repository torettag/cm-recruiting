import objectAssign from 'object-assign'

function redirect(state = {}, action) {
  switch (action.type) {
    case 'SET_REDIRECT_TOKEN':
      return objectAssign({}, state, {
        redirect: action.value
      })


    case 'SET_REDIRECT_URL':
      return objectAssign({}, state, {
        redirectUrl: action.value
      })

    case 'SET_JWT_TOKEN':
      return objectAssign({}, state, {
        jwt: action.value
      })

    case 'SET_FOCUS_MODE':
      return objectAssign({}, state, {
        focusMode: action.value
      })

    default:
      return state
  }
}

export default redirect
