const ICONS = {
  NetworkError: "📡",
  ServerError: "🔥",
  ClientError: "🔍",
};

const TITLES = {
  NetworkError: "Sin conexión",
  ServerError: "Error del servidor",
  ClientError: "No encontrado",
};

const ErrorMessage = ({ message, type }) => (
  <div className="error-container">
    <span className="error-icon">{ICONS[type] ?? "⚠️"}</span>
    <h3 className="error-title">{TITLES[type] ?? "Error"}</h3>
    <p className="error-message">{message}</p>
    <button className="error-retry" onClick={() => window.location.reload()}>
      Reintentar
    </button>
  </div>
);

export default ErrorMessage;
