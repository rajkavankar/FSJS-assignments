import { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        height: "100vh",
        background: "#eee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          padding: "2rem",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0, 0.4)",
        }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "1rem",
          }}>
          {count}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}>
          <button
            style={{
              paddingTop: ".3rem",
              paddingBottom: ".3rem",
              paddingLeft: ".8rem",
              paddingRight: ".8rem",
              borderRadius: "5px",
              border: "none",
              background: "#02B290",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => setCount((count) => count + 1)}>
            Increment
          </button>
          <button
            style={{
              paddingTop: ".3rem",
              paddingBottom: ".3rem",
              paddingLeft: ".8rem",
              paddingRight: ".8rem",
              borderRadius: "5px",
              border: "none",
              background: "#E8BD0D",
              color: "#000",
              cursor: "pointer",
            }}
            onClick={() => setCount(0)}>
            Reset
          </button>
          <button
            style={{
              paddingTop: ".3rem",
              paddingBottom: ".3rem",
              paddingLeft: ".8rem",
              paddingRight: ".8rem",
              borderRadius: "5px",
              border: "none",
              background: "#BF3325",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => setCount((count) => count - 1)}>
            Decrement
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
