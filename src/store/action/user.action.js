import { USER_ACTIONS } from './index'

export const user_signin = (payload) => {
  return {
    type: USER_ACTIONS.SIGNIN,
    payload,
  }
}

export const user_signout = () => {
  return {
    type: USER_ACTIONS.SIGNOUT,
  }
}
