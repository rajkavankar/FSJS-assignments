const Button = ({ children, span }) => {
  return (
    <button
      className={`bg-slate-200/70 hover:bg-slate-200 text-xl rounded-md m-1 ${
        span && "col-span-2"
      }`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  span: false,
}
export default Button
