import OrderCard from './OrderCard';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TopBar from '../TopBar';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function AdminBoard (){

    const [productList, setProductList] = useState([])
    const [logStatus, setLogStatus] = useState({ statusCode: 0, status: false, userDetails: {} })
    const [orderList, setOrderList] = useState([])
    const [cartItem, setCartItem] = useState({})

    const navigate = useNavigate()

    useEffect(
        function () {
            async function getAdminDetails() {
                try {
                    let res = await axios.get(`/adminboard`)
                    let data = res.data;
                    setOrderList(data.order)
                    setLogStatus({
                        statusCode: data.code,
                        status: data.code != 200 ? false : true,
                        userDetails: data.userDetails
                    })
                    if(data.statusCode != 200){
                        navigate('/')
                    }
                }
                catch (e) {
                    console.log(e)
                    navigate('/')
                }
            }
            getAdminDetails()
        }
        , [])

    const logHandler = async (logStatus) => {
        navigate(logStatus)
    }

    console.log(orderList)

    return (
        <Box sx={{ width: '100%' }}>
            <TopBar
                logHandler={logHandler}
                status={logStatus.status}
                userDetails={logStatus.userDetails} 
                page = 'admin'/>
            <Grid container spacing={2} className="homeGrid">
                {orderList.map((order)=> (
                    <OrderCard
                    key={order._id}
                    fulfilled={order.fulfilled}
                    lineItems = {order.lineItems}
                    orderId = {order._id}/>
                ))}
            </Grid>
        </Box>
    )
}

export default AdminBoard

