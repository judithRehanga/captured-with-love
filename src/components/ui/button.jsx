import "./button.css";

function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      className="primary-button"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;