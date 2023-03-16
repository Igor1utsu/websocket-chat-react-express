import { IMessage } from "../models/IMessage.model"

export const sendMessage = (
  socket: any,
  event: string,
  userName: string,
  value?: string
) => {
  const message: IMessage = {
    id: Date.now(),
    userName,
    message: value,
    event,
  }

  socket.current.send(JSON.stringify(message))
}
