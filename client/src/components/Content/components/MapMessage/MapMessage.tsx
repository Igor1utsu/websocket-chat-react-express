import { FC, memo } from "react"
import { IMessage } from "../../../../shared/models/IMessage.model"
import { Message } from "./components/Message/Message"
import "./MapMessage.scss"

interface MapMessageProps {
  day: string
  list: IMessage[]
}

export const MapMessage: FC<MapMessageProps> = memo((props) => {
  const { day, list } = props

  return (
    <ul className="mess-group">
      <li className="mess-day">{day}</li>
      {list.map((i) => {
        if (i.event === "connection")
          return (
            <li
              className="mess-connection"
              key={i.id}
            >{`user ${i.userName} has connected`}</li>
          )

        return (
          <Message
            id={i.id}
            userName={i.userName}
            message={i.message}
            event={i.event}
            key={i.id}
          />
        )
      })}
    </ul>
  )
})
