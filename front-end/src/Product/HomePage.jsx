import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TopBar from '../TopBar';
import Cart from './Cart'
import axios from 'axios'
import './HomePage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

function HomePage() {
    const [productList, setProductList] = useState([])
    const [logStatus, setLogStatus] = useState({ statusCode: 0, status: false, userDetails: {} })
    const [cart, setCart] = useState([])
    const [cartItem, setCartItem] = useState({})
    const [adminStatus, setAdminStatus] = useState(false)

    const navigate = useNavigate()

    useEffect(
        function () {
            async function getProductAndUserDetails() {
                try {
                    let res = await axios.get(`/productDetail`)
                    let data = res.data;
                    setProductList(data.products);
                    setLogStatus({
                        statusCode: data.code,
                        status: data.code != 200 ? false : true,
                        userDetails: data.userDetails === null ? null : data.userDetails
                    })
                    if (data.userDetails != null) {
                        setAdminStatus(data.userDetails.isAdmin)
                        setCart(data.userDetails.cart)
                    }
                }

                catch (e) {
                    console.log(e)
                }
            }
            getProductAndUserDetails()
        }
        , [cartItem, logStatus.status, productList])

    const navHandler = async (navName) => {
        if (navName === 'logout') {
            setLogStatus({ statusCode: 206, status: false, userDetails: {} })
            axios.post('/logout')
        } else {
            navigate(navName)
        }
    }

    const addCart = async (cartItem) => {
        const currentUser = logStatus.userDetails._id
        setCartItem(cartItem);
        await axios.post('/addCart', { cartItem , currentUser});
    }

    const updateStock = async (product) => {
        await axios.post('/updateStock', { product })
    }

    const removeProduct = async (product) => {
        setProductList((productItem) => {
            return productItem.filter((e) => e._id != product._id)
        })
        await axios.delete('/deleteproduct', { data: { product } })
    }

    const deleteCartItem = async (cartItem) => {
        const currentUser = logStatus.userDetails._id
        await axios.delete('/deleteCartItem', {data: {cartItem, currentUser}})

    }

    const userHomepage = (
        <Grid container spacing={2} className="homeGrid">
            {productList.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    status={logStatus.status}
                    addCart={addCart}
                />
            ))}
        </Grid>
    )

    const adminHomepage = (
        <Grid container spacing={2} className="homeGrid">
            {productList.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    status={logStatus.status}
                    updateStock={updateStock}
                    adminStatus={adminStatus}
                    removeProduct={removeProduct}
                />
            ))}
        </Grid>
    )

    const loadingPage = (
        <>
            <h1>Loading...</h1>
            <LinearProgress
                sx={{ width: '100%', color: 'grey.500' }}
            />
        </>
    )

    return (
        <>
            {productList.length===0 ? loadingPage : <Box sx={{ width: '100%' }}>
                <TopBar
                    navHandler={navHandler}
                    status={logStatus.status}
                    userDetails={logStatus.userDetails}
                    message='welcome'
                    page="home" />
                <Grid container spacing={2} className="homeGrid">
                    {adminStatus === true ? adminHomepage : userHomepage}
                </Grid>
                {logStatus.status === true && <Cart cartDetails={cart} deleteCartItem={deleteCartItem} />}
            </Box>}

        </>
    )
}


export default HomePage