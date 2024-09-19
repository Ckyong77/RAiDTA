import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Checkout.css'

function Checkout() {
    const [user, setUser] = useState({})
    const [order, setOrder] = useState({})
    const [cart, setCart] = useState([])
    const navigate = useNavigate()



    useEffect(
        function () {
            async function getCurrentUser() {
                let res = await axios.get('/currentuser');
                let data = res.data
                data.statusCode != 200 && navigate('/')
                setUser(data.currentUser)
                setCart(data.currentUser.cart)
            }
            getCurrentUser();
        }, []
    )


    useEffect(
        function () {
            async function sendOrder() {
                console.log(order.lineItems)
                if (order.lineItems != undefined ) {
                    console.log('sending!')
                    let res = await axios.post('/checkout', { order })
                    let data = res.data
                    data != undefined && navigate('/')
                }
            }
            sendOrder();
        }, [order]
    )

    let finalTotal = 0;
    cart.map((item) =>
        finalTotal = (Math.round(finalTotal*100) + Math.round(item.totalPrice*100))/100
    )

    const transactionHandler = async (event) => {
        if (event.target.name === 'checkout') {
            const userid = user._id
            setOrder({ lineItems: cart, user: userid })
        } else {
            navigate('/')
        }
    }

    return (
        <div>
            <TableContainer>
                <Table
                    style={{ backgroundColor: "#FCFAEE" }}>
                    <TableHead
                        style={{ backgroundColor: "#507687" }}>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Item Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        className="tableRow">
                        {cart.map((cartItem, index) =>
                            <TableRow
                                key={index}
                            >
                                <TableCell component="th" scope="row">{cartItem.productName}</TableCell>
                                <TableCell>{cartItem.quantity}</TableCell>
                                <TableCell>${cartItem.productPrice}</TableCell>
                                <TableCell>${cartItem.totalPrice}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="totalCheckout">
                <span>Order Total: ${finalTotal}</span>
            </div>
            <button className="cancelBtn" onClick={transactionHandler} name="cancel">Cancel</button>
            <button className="placeBtn" onClick={transactionHandler} name="checkout">Place Order</button>

        </div >
    )
}

export default Checkout