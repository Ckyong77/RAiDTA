import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ProductCard from "../Product/ProductCard"
import TopBar from "../TopBar"
import "./AddNew.css"



function AddNew() {
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, stock: 0, image: '' })

    useEffect(function () {
        async function createNewProduct() {
            console.log(newProduct)
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



    const navHandler = async (navName) => {
        navigate(navName)
    }


    const submitHandler = (product) => {
        setNewProduct({ ...product });
        reset();
    }

    return (<>
        <TopBar
            page={'admin'}
            navHandler={navHandler} />
        <form onSubmit={handleSubmit(submitHandler)} className="formWrapper">
            <div>
                <label htmlFor="name">Product Name </label>
                <span><input type="text" id="name" name="name" {...register('name', registerOptions.name)} /></span>
            </div>
            <div>
                <label htmlFor="price">Product Price </label>
                <span><input type="text" id="price" name="price" {...register('price', registerOptions.price)} /></span>
            </div>
            <div>
                <label htmlFor="stock">Product Stock</label>
                <span><input type="text" id="stock" name="stock" {...register('stock', registerOptions.stock)} /></span>
            </div>
            <div>
                <label htmlFor="image">Product Image (URL) </label>
                <span><input type="text" id="image" name="image" {...register('image')} /></span>
            </div>
            <div>
                <button>Add New</button>
            </div>
        </form>
    </>
    )
}

export default AddNew