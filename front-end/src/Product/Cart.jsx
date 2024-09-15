import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Cart.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart({ cartDetails }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    let totalPrice = 0;
    cartDetails.map((item) =>
        totalPrice = totalPrice + item.totalPrice
    )

    const checkoutHandler = () => {
        navigate('checkout')
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {cartDetails.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <div className='cartItem'>
                                <ListItemText primary={'Product Name: ' + item.productName} />
                                <ListItemText primary={'Quantity: ' + item.quantity} />
                                <ListItemText primary={'Unit Price: $' + item.productPrice} />
                                <ListItemText primary={'Item Subtotal: $' + item.totalPrice} />
                            </div>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <div className="totalPrice">
                <p>Total Cost: ${totalPrice.toFixed(2)}</p>
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
