import { createStore } from 'redux'
const initialState = {
  login: false,
  user: {
    username: '',
    picture: '',
    type: '',
    email: '',
    google: '',
    facebook: '',
    role: '',
  },
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const userStore = createStore(userReducer)
export default userStore
