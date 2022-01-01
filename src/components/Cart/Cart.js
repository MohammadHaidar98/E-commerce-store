import React from 'react'
import {Container,Typography,Grid,Button} from '@material-ui/core'
import useStyle from './style'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'
const Cart = ({cart,handleCartUpdate,handleRemoveFromCart,handleEmptyCart}) => {
   
    const classes=useStyle();

    const EmptyCart=()=>(
        <Typography variant='subtitle1'>You have no items in your shopping cart,
        <Link to="/" className={classes.link}>start adding some</Link>
        </Typography>   
 )
    const FilledCart=()=>(
     <>
        <Grid container spacing={3}>
            {cart.line_items.map((item)=>(
                <Grid item xs={12} sm={4} key={item.id}>
                   <CartItem Item={item} handleCartUpdate={handleCartUpdate} handleRemoveFromCart={handleRemoveFromCart}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button type="Button" variant="contained" className={classes.emptyButton} size="large" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                <Button type="Button" variant="contained" className={classes.checkoutButton} size="large" color="primary" component={Link} to="/checkout">Checkout</Button>
            </div>

        </div>
    </>
    );
    if(!cart.line_items) return 'Loading.....'
    return (

        <Container>
            <div className={classes.toolbar}/>
                <Typography className={classes.title} variant="h4" gutterBottom>your Shopping Cart</Typography>
                {!cart.line_items.length?<EmptyCart/>:<FilledCart/> }
        </Container>
    )
}

export default Cart
