import { USER_ACTIONS } from 'store/action/index'

const initialState = {
  login: false,
  profile: {
    id: '',
    name: '',
    picture: '',
    type: '',
    email: '',
    google: '',
    facebook: '',
    role: '',
  },
  socket: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.SIGNIN:
      const payload = action.payload
      return { state, ...payload }

    case USER_ACTIONS.SIGNOUT:
      const resetPayload = {
        login: false,
        profile: {
          id: '',
          name: '',
          picture: '',
          type: '',
          email: '',
          google: '',
          facebook: '',
          role: '',
        },
      }
      return { state, ...resetPayload }
    default:
      return state
  }
}

export default userReducer
