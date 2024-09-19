import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './OrderCard.css'
import { useState } from 'react';

function OrderCard({ fulfilled, lineItems, orderId, fulfillHandler, date }) {

    const toggleFulfill = () => {
        fulfilled = !fulfilled
        fulfillHandler(fulfilled, orderId)
    }

    return (
        <Card sx={{ minWidth: 500 }}>
            <CardContent>
                <Typography variant="subtitle1" component="div">
                    Order ID: {orderId}
                </Typography>
                <Typography gutterBottom sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    textAlign: "left",
                }}>
                    Line Items: {lineItems.length}
                </Typography>
                <Typography gutterBottom sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    textAlign: "left",
                    borderBottom: "1px solid rgba(24, 28, 20, 0.5)"
                }}>
                    Date Purchased: {date}
                </Typography>
                {lineItems.map((item) => (
                    <div className="orderCard">
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Product Name: {item.productName}
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Quantity: {item.quantity}
                        </Typography>
                    </div>
                ))
                }
            </CardContent>
            <CardActions>
                <Button size="small" onClick={toggleFulfill}>
                    {fulfilled === true ? "Fulfilled" : "Not Fulfilled"}
                </Button>
            </CardActions>
        </Card>
    )
}

export default OrderCard