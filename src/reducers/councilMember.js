import objectAssign from 'object-assign'

function council_member(state = {}, action) {
  switch (action.type) {
    case 'setCouncilMember':
      return objectAssign({}, state, {
        councilMember: action.value
      })
    default:
      return state
  }
}

export default council_member