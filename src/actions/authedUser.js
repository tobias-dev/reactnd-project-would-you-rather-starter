export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function setUser(userId) {
  return {
    type: SET_USER,
    id: userId,
  };
}

export function unsetUser() {
  return {
    type: UNSET_USER,
  };
}
