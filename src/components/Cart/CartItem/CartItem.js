import React from 'react'
import {Typography,Card,CardContent,CardMedia,CardActions,Button} from '@material-ui/core'
import useStyles from './Styles'
const CartItem = ({Item,handleCartUpdate,handleRemoveFromCart}) => {
    const classes=useStyles();
    return (
        <Card>
            <CardMedia image={Item.image.url} alt={Item.name} className={classes.media}/>
            <CardContent className={classes.cardContent} >
                <Typography variant='h4'>{Item.name}</Typography>
                <Typography variant='h5'>{Item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button type='button' size="small" onClick={()=>handleCartUpdate(Item.id,Item.quantity-1)}>-</Button>
                    <Typography>{Item.quantity}</Typography>
                    <Button type='button' size="small" onClick={()=>handleCartUpdate(Item.id,Item.quantity+1)}>+</Button>
                </div>
                <Button variant='contained' color="secondary" type='button' onClick={()=>handleRemoveFromCart(Item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
