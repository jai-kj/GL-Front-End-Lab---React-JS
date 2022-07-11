const jsonServer = require("json-server")
const auth = require("json-server-auth")

const app = jsonServer.create()
const router = jsonServer.router("db.json")

// Bind router db to app
app.db = router.db

// Add auth middleware
app.use(auth)

// Add route middleware
app.use(router)

// Setup App Server
const PORT = 5000
app.listen(PORT, () => console.log(`Fake DB Server running on PORT: ${PORT}`))
