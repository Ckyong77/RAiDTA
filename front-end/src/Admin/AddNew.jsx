import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ProductCard from "../Product/ProductCard"
import TopBar from "../TopBar"
import "./AddNew.css"
import { Stack, Button, capitalize } from "@mui/material"



function AddNew() {
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, stock: 0, image: '' })

    useEffect(function () {
        async function createNewProduct() {
            if (newProduct.name != '') {
                await axios.post('/addnew', { newProduct })
            }
        } createNewProduct()
    }, [newProduct]
    )


    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const registerOptions = {
        name: { required: 'Name of product is required' },
        price: {
            required: 'Price of product is required',
            min: {
                value: 0,
                message: 'Price of product cannot be negative'
            }
        },
        stock: {
            min: {
                value: 0,
                message: 'Stock cannot be negative'
            }
        }
    }

    const navHandler = async (name) => {
        navigate(name)
    }


    const submitHandler = (product) => {
        setNewProduct({ ...product });
        reset();
    }

    return (<>
        <TopBar
            navHandler={navHandler}
            message={'add'}
            page={'order'} />
        <form onSubmit={handleSubmit(submitHandler)} className="formWrapper">
            <Stack
                direction='column'
                spacing={0.5}
                sx={{
                    alignItems: 'center'
                }}
            >
                <div>
                    <label htmlFor="name">Product Name </label><br />
                    <small>
                        {errors.name && errors.name.message}
                    </small>
                    <span><input style={{ textTransform: 'capitalize' }} type="text" id="name" name="name" {...register('name', registerOptions.name)} /></span>
                </div>
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-evenly' }}>
                    <div>
                        <label htmlFor="price">Product Price ($) </label>
                        <br />
                        <small>
                            {errors.price && errors.price.message}
                        </small>
                        <input style={{ maxWidth: '150px' }} type="number" id="price" name="price" {...register('price', registerOptions.price)} />
                    </div>
                    <div className="numbers">
                        <label htmlFor="stock">Product Stock</label>
                        <br />
                        <small>
                            {errors.stock && errors.stock.message}
                        </small>
                        <input value={0}style={{ maxWidth: '150px' }} type="number" id="stock" name="stock" {...register('stock', registerOptions.stock)} />
                    </div>
                </Stack>
                <div>
                    <label htmlFor="image">Product Image (URL) </label>
                    <span><input type="text" id="image" name="image" {...register('image')} /></span>
                </div>
                <Stack
                    spacing={2}
                    direction="row">
                    <Button type="submit" variant="contained">Add</Button>
                    <Button variant="contained" color="error" onClick={() => { navHandler('/') }}>Cancel</Button>
                </Stack>
            </Stack>
        </form>
    </>
    )
}

export default AddNew