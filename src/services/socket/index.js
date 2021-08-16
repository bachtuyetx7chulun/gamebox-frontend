import { io } from 'socket.io-client'

export const socketConnected = (url) => {
  const socket = io(url)
  socket.on('connect', () => {})

  socket.on('connect_error', (err) => {
    return err
  })

  return socket
}

class SocketService {
  socket = null
  connect = (url) => {
    return new Promise((resolve, reject) => {
      this.socket = io(url)
      this.socket.on('connect', () => {
        resolve(this.socket)
      })

      this.socket.on('connect_error', (err) => {
        reject(err)
      })
    })
  }
}

export default new SocketService()
