import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Cart.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


function Cart({ cartDetails, deleteCartItem }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    let totalPrice = 0;
    cartDetails.map((item) =>
        totalPrice = (Math.round(totalPrice*100) + Math.round(item.totalPrice*100))/100
    )

    const checkoutHandler = () => {
        navigate('checkout')
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {cartDetails.map((item, index) => (
                    <ListItem key={index} disablePadding className='cartItem'>
                        <div id='details'>
                            <ListItemText secondary={item.productName} primary={'Product Name: '} />
                            <ListItemText secondary={item.quantity} primary={'Quantity: '} />
                            <ListItemText secondary={' $' + item.productPrice} primary={'Unit Price:'} />
                            <ListItemText secondary={' $' + item.totalPrice} primary={'Item Subtotal:'} />
                        </div>
                        <Divider orientation='vertical' flexItem variant='middle' sx={{ paddingLeft: '10%' }} />
                        <DeleteIcon className='deleteBtn' sx={{ fontSize: '30px' }} onClick={() => deleteCartItem(item.productId)} />
                    </ListItem>
                ))}
            </List>
            <div className="totalPrice">
                <p>Total Cost: ${totalPrice}</p>
                <Button onClick={checkoutHandler}>Checkout</Button>
            </div>
        </Box>
    );

    return (
        <div className="cartWrapper">
            <Button onClick={toggleDrawer(true)}>
                <ShoppingCartIcon className="cartIcon" fontSize="large" />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default Cart
