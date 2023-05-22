import { useContext } from "react"
import Button from "../components/Button"
import { ThemeContext } from "../context/ThemeContext"

const Dashboard = () => {
  const { isDark } = useContext(ThemeContext)
  return (
    <div
      style={{
        height: "100vh",
        background: `${isDark ? "#333" : "#eee"}`,
        color: `${isDark ? "#fff" : "#333"}`,
      }}>
      <div
        style={{
          width: "1000px",
          marginRight: "auto",
          marginLeft: "auto",
          paddingTop: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <h1>Dashboard page</h1>
        <Button />
      </div>
    </div>
  )
}

export default Dashboard
