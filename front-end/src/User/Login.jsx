import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"

function Login() {

    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const [loginStatus, setLoginStatus] = useState({ statusCode: 0, message: '' })
    const [user, setUser] = useState({ username: "", password: "", email: "" })
    const navigate = useNavigate()

    const loginHandler = async (loginData) => {
        try {
            let { username, password } = { ...loginData }
            username = username.toLowerCase()
            let res = await axios.post(`/login`, { username, password })
            console.log(res.data)
            reset();
            navigate('/')
        } catch (e) {
            e.response.status != 200 &&
                setLoginStatus({
                    statusCode: e.response.status,
                    message: 'Authentication failed please check your Username and Password'
                })
        }
    }

    const loginOptions = {
        username: { required: "username is empty" },
        password: { required: "password is empty" }
    }

    return (
        <form onSubmit={handleSubmit(loginHandler)} className='formWrapper'>
            <h1>Login</h1>
            {loginStatus.statusCode === 401 && <small>{loginStatus.message}</small>}
            <div className="loginWrapper">
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
                        {...register("username", loginOptions.username)}
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
                        {...register("password", loginOptions.password)}
                    />
                </div>
                <span>
                    <button>Login</button>
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

export default Login