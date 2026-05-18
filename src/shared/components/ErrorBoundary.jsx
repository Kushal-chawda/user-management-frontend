import React from 'react'

class ErrorBoundary extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            hasError: false,

            error: null
        }
    }

    static getDerivedStateFromError(error) {

        return {

            hasError: true,

            error
        }
    }

    componentDidCatch(error, errorInfo) {

        console.log('Error:', error)

        console.log('Error Info:', errorInfo)
    }

    handleRefresh = () => {

        window.location.reload()
    }

    render() {

        if (this.state.hasError) {

            return (

                <div
                    className="
                  container
                  mt-5
               "
                >

                    <div
                        className="
                     card
                     shadow
                     border-danger
                  "
                    >

                        <div className="card-body text-center">

                            <h1
                                className="
                           text-danger
                           mb-3
                        "
                            >
                                Something went wrong
                            </h1>

                            <p className="text-muted">

                                An unexpected error occurred.

                            </p>

                            <button

                                className="
                           btn
                           btn-danger
                        "

                                onClick={this.handleRefresh}
                            >
                                Refresh Page
                            </button>

                        </div>

                    </div>

                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary