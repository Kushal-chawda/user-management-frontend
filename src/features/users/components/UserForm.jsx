import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { userSchema } from '../schema/userSchema'

function UserForm({

    onSubmit,

    defaultValues = {},

    isLoading = false

}) {

    const {

        register,

        handleSubmit,

        setError,

        formState: { errors }

    } = useForm({

        resolver: zodResolver(userSchema),

        defaultValues
    })

    const handleFormSubmit = async (data) => {

        try {

            await onSubmit(data)

        } catch (error) {

            const responseErrors =
                error.response?.data?.errors

            if (!responseErrors) return

            Object.keys(responseErrors).forEach(
                (field) => {

                    setError(field, {

                        type: 'server',

                        message: responseErrors[field][0]
                    })
                }
            )
        }
    }

    return (

        <form
            onSubmit={handleSubmit(handleFormSubmit)}

            className="card shadow p-4 mb-4"
        >

            <h3 className="mb-4">
                {
                    defaultValues?.id
                        ? 'Update User'
                        : 'Create User'
                }
            </h3>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label className="form-label">
                        Name
                    </label>

                    <input

                        type="text"

                        className={`form-control ${errors.name
                                ? 'is-invalid'
                                : ''
                            }`}

                        {...register('name')}
                    />

                    {

                        errors.name && (

                            <div className="invalid-feedback">

                                {errors.name.message}

                            </div>
                        )
                    }

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input

                        type="email"

                        className={`form-control ${errors.email
                                ? 'is-invalid'
                                : ''
                            }`}

                        {...register('email')}
                    />

                    {

                        errors.email && (

                            <div className="invalid-feedback">

                                {errors.email.message}

                            </div>
                        )
                    }

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">
                        Password
                    </label>

                    <input

                        type="password"

                        className={`form-control ${errors.password
                                ? 'is-invalid'
                                : ''
                            }`}

                        {...register('password')}
                    />

                    {

                        errors.password && (

                            <div className="invalid-feedback">

                                {errors.password.message}

                            </div>
                        )
                    }

                </div>

            </div>

            <button

                className="btn btn-success"

                disabled={isLoading}
            >

                {

                    isLoading
                        ? 'Saving...'
                        : 'Save User'
                }

            </button>

        </form>
    )
}

export default UserForm