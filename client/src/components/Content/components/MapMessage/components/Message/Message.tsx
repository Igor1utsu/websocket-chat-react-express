import moment from "moment"
import { FC, memo } from "react"
import { IMessage } from "../../../../../../shared/models/IMessage.model"
import "./Message.scss"

export const Message: FC<IMessage> = memo((props) => {
  const { id, userName, message } = props

  const date = moment(id).format("LT") // 9:23 PM

  return (
    <li className="mess">
      <span className="mess__user">{userName}</span>
      <p className="mess__text"> {message}</p>
      <span className="mess__date"> {date}</span>
    </li>
  )
})
