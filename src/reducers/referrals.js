import objectAssign from 'object-assign'

function referrals(state = {}, action) {
  switch (action.type) {
    case 'setReferrals':
      return objectAssign({}, state, {
        referrals: action.value
      })
    default:
      return state
  }
}

export default referrals