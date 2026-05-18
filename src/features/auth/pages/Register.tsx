import { useForm } from 'react-hook-form'

import { zodResolver }
from '@hookform/resolvers/zod'

import { registerSchema }
from '../schema/registerSchema'

import { useMutation }
from '@tanstack/react-query'

import { registerUser }
from '../api/authApi'

import { useDispatch }
from 'react-redux'

import { setCredentials }
from '../store/authSlice'

import { toast }
from 'react-toastify'

import { Link, useNavigate }
from 'react-router-dom'
import axios from 'axios'

function Register() {

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const {

      register,

      handleSubmit,

      setError,

      formState: { errors }

   } = useForm({

      resolver: zodResolver(registerSchema)
   })

   const registerMutation = useMutation({

      mutationFn: registerUser,

      onSuccess: (data) => {

         localStorage.setItem(
            'token',
            data.token
         )

         dispatch(setCredentials(data))

         toast.success(
            'Registration successful'
         )

         navigate('/users')
      },

      onError: (error) => {

         const responseErrors = axios.isAxiosError(error)

         if (!responseErrors) return

         Object.keys(responseErrors).forEach(
            (field) => {

               setError(field as
        | 'name'
        | 'email'
        | 'password'
        | 'password_confirmation', {

                  type: 'server',

                  message:
                     responseErrors[field][0]
               })
            }
         )
      }
   })

   const onSubmit = (data) => {

      registerMutation.mutate(data)
   }

   return (

      <div className="container">

         <div className="row justify-content-center">

            <div className="col-md-6">

               <div className="card shadow mt-5">

                  <div className="card-body">

                     <h2 className="text-center mb-4">
                        Register
                     </h2>

                     <form
                        onSubmit={
                           handleSubmit(onSubmit)
                        }
                     >

                        <div className="mb-3">

                           <label className="form-label">
                              Name
                           </label>

                           <input

                              type="text"

                              className={`form-control ${
                                 errors.name
                                    ? 'is-invalid'
                                    : ''
                              }`}

                              {...register('name')}
                           />

                           {

                              errors.name && (

                                 <div className="invalid-feedback">

                                    {
                                       errors.name.message
                                    }

                                 </div>
                              )
                           }

                        </div>

                        <div className="mb-3">

                           <label className="form-label">
                              Email
                           </label>

                           <input

                              type="email"

                              className={`form-control ${
                                 errors.email
                                    ? 'is-invalid'
                                    : ''
                              }`}

                              {...register('email')}
                           />

                           {

                              errors.email && (

                                 <div className="invalid-feedback">

                                    {
                                       errors.email.message
                                    }

                                 </div>
                              )
                           }

                        </div>

                        <div className="mb-3">

                           <label className="form-label">
                              Password
                           </label>

                           <input

                              type="password"

                              className={`form-control ${
                                 errors.password
                                    ? 'is-invalid'
                                    : ''
                              }`}

                              {...register('password')}
                           />

                           {

                              errors.password && (

                                 <div className="invalid-feedback">

                                    {
                                       errors.password.message
                                    }

                                 </div>
                              )
                           }

                        </div>

                        <div className="mb-3">

                           <label className="form-label">
                              Confirm Password
                           </label>

                           <input

                              type="password"

                              className={`form-control ${
                                 errors.password_confirmation
                                    ? 'is-invalid'
                                    : ''
                              }`}

                              {...register(
                                 'password_confirmation'
                              )}
                           />

                           {

                              errors.password_confirmation && (

                                 <div className="invalid-feedback">

                                    {
                                       errors
                                          .password_confirmation
                                          .message
                                    }

                                 </div>
                              )
                           }

                        </div>

                        <button

                           className="btn btn-primary w-100"

                           disabled={
                              registerMutation.isPending
                           }
                        >

                           {

                              registerMutation.isPending
                                 ? 'Loading...'
                                 : 'Register'
                           }

                        </button>

                     </form>

                     <div className="text-center mt-3">

                        <Link to="/login">

                           Already have account?

                        </Link>

                     </div>

                  </div>

               </div>

            </div>

         </div>

      </div>
   )
}

export default Register