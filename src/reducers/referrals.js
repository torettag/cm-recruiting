import objectAssign from 'object-assign'

function referrals(state = {}, action) {
  switch (action.type) {
    case 'setReferrals':
      return objectAssign({}, state, {
        referrals: action.value
      })
    case 'setActivity':
      return objectAssign({}, state, {
        activity: action.value
      })
    default:
      return state
  }
}

export default referrals