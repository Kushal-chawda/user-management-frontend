import { useState } from 'react'


import UserTable from '../components/UserTable'

import { useUsers } from '../hooks/useUsers'

import { useCreateUser } from '../hooks/useCreateUser'

import { useUpdateUser } from '../hooks/useUpdateUser'

import { useDeleteUser } from '../hooks/useDeleteUser'

import { useDebounce } from '../../../shared/hooks/useDebounce'
import { Link } from 'react-router-dom'
import LogoutButton
from '../../auth/components/LogoutButton'



function UsersPage() {

    const [editingUser, setEditingUser] =
        useState(null)
    const [page, setPage] = useState(1)

    const [search, setSearch] = useState('')

    const debouncedSearch =
        useDebounce(search)

    const { data, isLoading } = useUsers({

        page,

        search: debouncedSearch
    })


    const createMutation = useCreateUser()

    const updateMutation = useUpdateUser()

    const deleteMutation = useDeleteUser()

    const users = data?.data || []

    const handleSubmit = async (formData) => {

        if (editingUser) {

            await updateMutation.mutateAsync({

                id: editingUser.id,

                data: formData
            })

            setEditingUser(null)

        } else {

            await createMutation.mutateAsync(
                formData
            )
        }
    }

    const handleDelete = async (id) => {

        if (!window.confirm(
            'Delete this user?'
        )) return

        await deleteMutation.mutateAsync(id)
    }

    isLoading && <p key="initial-loader">Loading...</p>

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>User Management</h1>

                <input

                    type="text"

                    className="form-control w-25"

                    placeholder="Search users"

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <Link
                    className="btn btn-primary"
                    to="/users/create"
                >
                    Create User
                </Link>
               <LogoutButton />

            </div>


            <UserTable

                users={users}

                onEdit={setEditingUser}

                onDelete={handleDelete}
            />

        </div>
    )
}

export default UsersPage