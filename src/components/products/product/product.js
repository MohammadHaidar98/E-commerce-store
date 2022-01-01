import React from 'react';
import { Card,CardMedia,CardContent,CardActions,Typography,IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons' 
import makeStyles from './styles'

const product = ({product,onAddToCart}) => {
    const classes=makeStyles();
    
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name}> </CardMedia>
            <CardContent>
                <div className={classes.cardContent}>
                     <Typography variant="h5" gutterBottom>
                         {product.name}
                     </Typography>
                     <Typography variant="h5">
                         {product.price.formatted_with_symbol}
                     </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html:product.description}} variant="body2"  />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to cart" onClick={()=>onAddToCart(product.id,1)}>
                    <AddShoppingCart/>
                </IconButton>

            </CardActions>
        </Card>
    )
}

export default product
