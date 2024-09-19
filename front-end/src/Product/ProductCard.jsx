import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import './ProductCard.css'
import { useState, useEffect } from 'react';

function ProductCard({ product, status, addCart, adminStatus, updateStock, removeProduct }) {
    const [qty, setQty] = useState(0)

    function qtyHandler(event) {
        if (!adminStatus) {
            if (event.target.name === "minus") {
                setQty(qty <= 0 ? 0 : qty - 1)
            } else if (event.target.name === "plus") {
                setQty(qty >= product.stock ? product.stock : qty + 1)
            }
        } else {
            if (event.target.name === "minus") {
                setQty(qty - 1)
            } else if (event.target.name === "plus") {
                setQty(qty + 1)
            }
        }
    }
    function cart() {
        const totalPrice = parseFloat(((product.price * 100) * qty) / 100)
        const cartItem = {
            product: product,
            quantity: qty,
            totalPrice: totalPrice
        }
        addCart(cartItem)
        setQty(0)
    }

    function update() {
        product.stock = product.stock + qty
        updateStock(product)
        setQty(0)
    }

    function remove() {
        removeProduct(product)
    }


    function qtyChangeHandler(event) {
        if (event.target.value < 0 || isNaN(event.target.value)) {
            setQty(0)
        } else {
            parseInt(event.target.value)
        }
    }

    const cardActionStylesLayout = ({
        maxWidth: '30px',
        maxHeight: '50px',
        minWidth: '30px',
        minHeight: '50px'
    })

    const userCard = (<>
        <CardMedia className='image'
            component="img"
            image={product.image}
            alt={product.name}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Price: ${product.price}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Available stock: {product.stock}
            </Typography>
        </CardContent>
        <CardActions >
            {status === true &&
                <Grid
                    container spacing={{ xs: 2 }}
                    justifyContent="center"
                >
                    <Button style={cardActionStylesLayout}
                        onClick={qtyHandler}
                        name="minus"
                    >-</Button>
                    <TextField style={{
                        maxWidth: '50px',
                        maxHeight: '50px',
                        minHeight: '50px'
                    }}
                        id="quantity"
                        name="quantity"
                        onChange={qtyChangeHandler}
                        value={qty} />
                    <Button style={cardActionStylesLayout} onClick={qtyHandler}
                        name="plus">+</Button>
                    <Button
                        disabled = {product.stock <= 0}
                        size="small"
                        color="primary"
                        onClick={cart}>
                        ADD TO CART
                    </Button>
                </Grid>
            }
        </CardActions>
    </>)


    const adminCard = (
        <>
            <CardActionArea>
                <CardMedia className='image'
                    component="img"
                    image={product.image}
                    alt={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Available stock: {product.stock}
                    </Typography>
                </CardContent>
            </CardActionArea >
            <CardActions >
                {status === true &&
                    <Grid
                        container spacing={{ xs: 2 }}
                        justifyContent="center"
                    >
                        <Button style={cardActionStylesLayout}
                            onClick={qtyHandler}
                            name="minus"
                        >-</Button>
                        <TextField style={{
                            maxWidth: '50px',
                            maxHeight: '30px',
                            minWidth: '50px',
                            minHeight: '30px'
                        }}
                            id="quantity"
                            name="quantity"
                            onChange={qtyChangeHandler}
                            value={qty} />
                        <Button style={cardActionStylesLayout}
                            onClick={qtyHandler}
                            name="plus">+</Button>
                        <Button size="small" variant="outlined" color="primary" onClick={update}>
                            Update Stock
                        </Button>
                        <Button size="small" variant="contained" color="error" onClick={remove}>
                            Delete Stock
                        </Button>
                    </Grid>
                }
            </CardActions>
        </>
    )

    return (
        <Card sx={{ maxWidth: 200 }} >
            {adminStatus === true ? adminCard : userCard}
        </Card>
    )
}

export default ProductCard