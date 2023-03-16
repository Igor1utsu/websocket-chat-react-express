import { FC, memo } from "react"
import "./Message.scss"

interface MessageProps {
  user: string
  message?: string
  event: string
}

export const Message: FC<MessageProps> = memo((props) => {
  const { user, message, event } = props

  if (event === "connection")
    return (
      <li className="message__connection">{`user ${user} has connected`}</li>
    )

  return (
    <li className="message">
      <div className="message__user">{user}</div>
      <div className="message__text"> {message}</div>
    </li>
  )
})
