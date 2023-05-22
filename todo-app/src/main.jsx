import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { TodoProvider } from "./context/todoContext.jsx"
import "bootstrap/dist/css/bootstrap.min.css"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoProvider>
      <Toaster />
      <App />
    </TodoProvider>
  </React.StrictMode>
)
