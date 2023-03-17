import moment from "moment"
import { FC, memo } from "react"
import { IMessage } from "../../../../../../shared/models/IMessage.model"
import "./Message.scss"

export const Message: FC<IMessage> = memo((props) => {
  const { id, userName, message } = props

  const date = moment(id).format("LT") // 9:23 PM

  return (
    <li className="mess">
      <div className="mess__user">{userName}</div>
      <div className="mess__text"> {message}</div>
      <div className="mess__date"> {date}</div>
    </li>
  )
})
