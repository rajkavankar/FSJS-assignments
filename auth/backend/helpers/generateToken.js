import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: "2d",
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  })
}
