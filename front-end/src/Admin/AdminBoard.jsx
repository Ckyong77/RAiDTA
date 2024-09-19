import OrderCard from './OrderCard';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TopBar from '../TopBar';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import './AdminBoard.css'




function AdminBoard() {

    const [logStatus, setLogStatus] = useState({ statusCode: 0, status: false, userDetails: {} })
    const [orderList, setOrderList] = useState([])
    const [orderStatus, setOrderStatus] = useState({ fulfilled: false })
    const [filteredOrderList, setFilteredOrderList] = useState([])

    const navigate = useNavigate()

    useEffect(
        function () {
            async function getAdminDetails() {
                try {
                    let res = await axios.get(`/adminboard`)
                    let data = res.data;
                    setFilteredOrderList(data.order)
                    setOrderList(data.order)
                    setLogStatus({
                        statusCode: data.code,
                        status: data.code != 200 ? false : true,
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
            getAdminDetails()
        }
        , [orderStatus])



    const navHandler = async (navName) => {
        navigate(navName)
    }

    const filterOrder = (event) => {
        if (event.target.textContent === 'FULFILLED') {
            setFilteredOrderList(orderList.filter((order) => order.fulfilled === true))
        } else{
            setFilteredOrderList(orderList.filter((order) => order.fulfilled === false))

        }
    }

    const fulfillHandler = async (fulfillStatus, orderId) => {
        let res = await axios.post('/orderfulfil', { orderId, fulfilled: fulfillStatus })
        let data = res.data
        console.log(data)
        setOrderStatus({ fulfilled: fulfillStatus })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <TopBar
                navHandler={navHandler}
                status={logStatus.status}
                userDetails={logStatus.userDetails}
                page='order'
                message='cusOrder' />
            <Stack
                direction="row"
                spacing={4}
                sx={{
                    marginTop: '10%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <h2 
                    onClick={filterOrder}
                >FULFILLED</h2>
                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{ backgroundColor: '#caf0f8' }}
                />
                <h2
                    onClick={filterOrder}
                >NOT FULFILLED</h2>
            </Stack>

            <Stack
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "stretch",
                    marginTop: '5%'
                }}>
                {filteredOrderList.map((order) => (
                    <OrderCard
                        key={order._id}
                        fulfilled={order.fulfilled}
                        lineItems={order.lineItems}
                        date={order.date}
                        fulfillHandler={fulfillHandler}
                        orderId={order._id} />
                ))}
            </Stack>
        </Box>
    )
}

export default AdminBoard

