import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

const Button = () => {
  const { isDark, setIsDark } = useContext(ThemeContext)
  return (
    <button
      style={{
        background: `${isDark ? "#E8BD0D" : "#5A20CB"}`,
        color: `${isDark ? "#000" : "#fff"}`,
        paddingTop: "1rem",
        paddingBottom: "1rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "1.2rem",
        border: "none",
      }}
      onClick={() => setIsDark((isDark) => !isDark)}>
      Button
    </button>
  )
}

export default Button
