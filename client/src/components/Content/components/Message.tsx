import moment from "moment"
import { FC, memo } from "react"
import { IMessage } from "../../../shared/models/IMessage.model"
import "./Message.scss"

export const Message: FC<IMessage> = memo((props) => {
  const { id, userName, message, event } = props

  const date = moment(id).format("LT") // 9:23 PM

  if (event === "connection")
    return (
      <li className="message__connection">{`user ${userName} has connected`}</li>
    )

  return (
    <li className="message">
      <div className="message__user">{userName}</div>
      <div className="message__text"> {message}</div>
      <div className="message__date"> {date}</div>
    </li>
  )
})
