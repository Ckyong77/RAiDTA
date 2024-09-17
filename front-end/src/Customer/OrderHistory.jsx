import axios from "axios"
import { useEffect, useState } from "react"
import TopBar from "../TopBar"
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import OrderCard from "../Admin/OrderCard";


function OrderHistory() {
    const navigate = useNavigate()
    const [orderList, setOrderList] = useState([])
    const [logStatus, setLogStatus] = useState({})

    useEffect(
        function () {
            async function getCustomerDetails() {
                try {
                    let res = await axios.get(`/customerBoard`)
                    let data = res.data;
                    setOrderList(data.order)
                    setLogStatus({
                        statusCode: data.statusCode,
                        status: data.statusCode != 200 ? false : true,
                        userDetails: data.userDetails
                    })
                    if (data.statusCode != 200) {
                        navigate('/')
                    }
                }
                catch (e) {
                    console.log(e)
                    navigate('/')
                }
            }
            getCustomerDetails()
        }
        , [])


    const navHandler = (navName) => {
        navigate(navName)
    }

    return (

        <Box sx={{ width: '100%' }}>
            <TopBar
                navHandler={navHandler}
                message='orderHistory'
                page="orderHistory"
            />
            <Stack
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "stretch"
                }}>
                {orderList.map((order) => (
                    <OrderCard
                        key={order._id}
                        fulfilled={order.fulfilled}
                        lineItems={order.lineItems}
                        orderId={order._id} />
                ))}
            </Stack>



        </Box>
    )
}

export default OrderHistory