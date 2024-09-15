import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TopBar from '../TopBar';
import Cart from './Cart'
import axios from 'axios'
import './HomePage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [productList, setProductList] = useState([])
    const [logStatus, setLogStatus] = useState({ statusCode: 0, status: false, userDetails: {} })
    const [cart, setCart] = useState([])
    const [cartItem, setCartItem] = useState({})

    const navigate = useNavigate()

    useEffect(
        function () {
            async function getProductDetails() {
                try {
                    let res = await axios.get(`/productDetail`)
                    let data = res.data;
                    console.log(data.userDetails)
                    setProductList(data.products);
                    setLogStatus({
                        statusCode: data.code,
                        status: data.code != 200 ? false : true,
                        userDetails: data.userDetails
                    })
                    setCart(data.userDetails.cart)
                }
                catch (e) {
                    console.log(e)
                }
            }
            getProductDetails()
        }
        , [cartItem, logStatus.status])

    const logHandler = async (logStatus) => {
        if (logStatus === 'logout') {
            setLogStatus({ statusCode: 206, status: false })
            axios.post('/logout')
        } else if (logStatus === 'login') {
            navigate('/login')
        }
    }

    const addCart = async (cartItem) => {
        setCartItem(cartItem)
        await axios.post('/addCart', { cartItem })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <TopBar
                logHandler={logHandler}
                status={logStatus.status}
                userDetails={logStatus.userDetails} />
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
            {logStatus.status === true && <Cart cartDetails={cart} />}
        </Box>
    )
}


export default HomePage