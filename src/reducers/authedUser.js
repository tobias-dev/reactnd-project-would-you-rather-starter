import { SET_USER, UNSET_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.id;
    case UNSET_USER:
      return null;
    default:
      return state;
  }
}
