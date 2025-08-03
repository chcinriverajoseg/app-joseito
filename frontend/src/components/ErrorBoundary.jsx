// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para renderizar UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Puedes enviar el error a un servicio de logs aquí
    console.error("ErrorBoundary atrapó un error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center text-red-600">
          <h2>Algo salió mal. Por favor, recarga la página o intenta más tarde.</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
