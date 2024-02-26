import './Button.css';

function Button({ disabled, onClick, title, text }) {
  return (
    <button
      className="button"
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {text}
    </button>
  );
}

export default Button;
