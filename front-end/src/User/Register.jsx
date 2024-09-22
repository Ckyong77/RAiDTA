import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Register.css"

function Register() {

    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const [registerError, setRegisterError] = useState('')
    const navigate = useNavigate()

    const registerOptions = {
        username: { required: "username is required" },
        password: { required: "password is required" },
        firstName: { required: "first name is required" },
        lastName: { required: "last name is requried" }
    }

    const registerHandler = async (formData) => {
        try{
        formData.username = formData.username.toLowerCase()
        let res = await axios.post(`/register`, { formData })
        let data = res.data
        navigate('/login')
        reset();
        } catch(e){
            setRegisterError(e.response.data.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(registerHandler)} className='formWrapper'>
            <h1>Register</h1>
            {registerError && <>
                <small>
                    {registerError}
                </small></>}
            <div className="regisWrapper">
                <div>
                    <label htmlFor="firstName">First Name<br /></label>
                    {errors.firstName &&
                        <small>
                            {errors.firstName.message}<br />
                        </small>}
                    <input
                        type="text"
                        id='firstName'
                        placeholder='First Name'
                        name='firstName'
                        {...register('firstName', registerOptions.firstName)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name<br /></label>
                    {errors.lastName &&
                        <small>
                            {errors.lastName.message}<br />
                        </small>}
                    <input
                        type="text"
                        id='lastName'
                        placeholder='Last Name'
                        name='lastName'
                        {...register('lastName', registerOptions.lastName)}
                    />
                </div>

                <div>
                    <label htmlFor="username">Username<br /></label>
                    {errors.username &&
                        <small>
                            {errors.username.message}<br />
                        </small>}
                    <input
                        type="text"
                        id='username'
                        placeholder='Username'
                        name='username'
                        {...register('username', registerOptions.username)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password<br /></label>
                    {errors.password &&
                        <small>
                            {errors.password.message}<br />
                        </small>}
                    <input
                        type="password"
                        id='password'
                        placeholder='Password'
                        name='password'
                        {...register('password', registerOptions.password)} />
                </div>
                <span>
                    <button>Register</button>
                    <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                            navigate('/')
                        }}>Cancel</button>

                </span>
            </div>
        </form>
    )
}

export default Register