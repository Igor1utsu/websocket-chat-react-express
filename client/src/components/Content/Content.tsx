import React, { FC, memo, useRef, useState } from "react"
import { IMessage } from "../../shared/models/IMessage.model"
import { sendMessage } from "../../shared/utils/SendMessage.utils"
import { Message } from "./components/Message"
import "./Content.scss"

export const Content: FC = memo(() => {
  const [connected, setConnected] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("")
  const [message, setMessage] = useState<IMessage[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const socket = useRef<WebSocket>()

  const handleConnect = (e: React.SyntheticEvent) => {
    e.preventDefault()

    socket.current = new WebSocket("ws://localhost:9000")

    socket.current.onopen = () => {
      setConnected(true)
      console.log("WebSocket: подключение установлено")

      sendMessage(socket, "connection", userName)
    }

    socket.current.onmessage = (e) => {
      const message = JSON.parse(e.data)

      setMessage((prev) => [message, ...prev])
    }

    socket.current.onclose = () => {
      console.log("WebSocket: подключение отсутствует")
    }

    socket.current.onerror = () => {
      console.error("WebSocket: ошибка")
    }
  }

  const handleMessage = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const func = async () => {
      sendMessage(socket, "message", userName, inputValue)
    }

    func().then(() => setInputValue(""))
  }

  return (
    <div className="container">
      <div className="content">
        {connected ? (
          <>
            <ul className="content__window">
              {message.map((i) => (
                <Message
                  id={i.id}
                  userName={i.userName}
                  message={i.message}
                  event={i.event}
                  key={i.id}
                />
              ))}
            </ul>
            <form className="content__field field" onSubmit={handleMessage}>
              <input
                className="field__input"
                value={inputValue}
                placeholder="Write a message"
                onChange={(e) => setInputValue(e.target.value)}
              ></input>
              <button type="submit" className="field__button">
                Send
              </button>
            </form>
          </>
        ) : (
          <form className="content__field field" onSubmit={handleConnect}>
            <input
              className="field__input"
              value={userName}
              placeholder="enter your name"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <button type="submit" className="field__button">
              Sign in
            </button>
          </form>
        )}
      </div>
    </div>
  )
})
