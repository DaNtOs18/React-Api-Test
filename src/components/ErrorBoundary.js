import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
            hasError: false,
            message: ""
        };
    }

    /*
    static getDerivedStateFromError(error) {
        // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
        console.log("aquí");
        return { hasError: true };
    }
    */

    componentDidCatch(error, errorInfo) {
        // También puedes registrar el error en un servicio de reporte de errores
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });
        if (error.message === "pepito") this.setState({ message: "Error de pepito" })
        console.log((error.message));
    }

    render() {
        if (this.state.hasError) {
            console.log("dentro del render del error")
            // Puedes renderizar cualquier interfaz de repuesto
            return <h1>{
                //this.state.errorInfo.componentStack
                this.state.message
            }
            </h1>;
        }

        return this.props.children;
    }
}