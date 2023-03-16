const ws = require("ws")

// Создаем сервер
const wsServer = new ws.Server({ port: 9000 }, () =>
  console.log("Server started on 9000")
)

// Подписываемся на событие подключение / 'connection' принимает параметром websocket: какое-то одно подключение, на него вешаем слушатель событий 'message'
wsServer.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message)
    switch (message.event) {
      case "message":
        broadcastMessage(message)
        break
      case "connection":
        broadcastMessage(message)
        break
    }
  })
})

// Функция отправляющая собщение всем подключенным на данный момент пользователям / поле: clients - все подключенные пользователи
function broadcastMessage(message) {
  wsServer.clients.forEach((client) => client.send(JSON.stringify(message)))
}
