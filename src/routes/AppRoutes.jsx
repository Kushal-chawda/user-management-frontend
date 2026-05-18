import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

import Login from '../features/auth/pages/Login'

import UsersPage from '../features/users/pages/UsersPage'

import ProtectedRoute from './ProtectedRoute'

import Register
    from '../features/auth/pages/Register'

import CreateUserPage
    from '../features/users/pages/CreateUserPage'

import EditUserPage
    from '../features/users/pages/EditUserPage'

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route

                    path="/users"

                    element={

                        <ProtectedRoute>

                            <UsersPage />

                        </ProtectedRoute>
                    }
                />
                <Route

                    path="/logout"

                    element={

                        <ProtectedRoute>

                            <UsersPage />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users/create"
                    element={<CreateUserPage />}
                />

                <Route
                    path="/users/edit/:id"
                    element={<EditUserPage />}
                />

            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes