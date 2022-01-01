import React from 'react'
import { Typography,Grid } from '@material-ui/core'
import Product from './product/product'
import usestyles from './styles'

const products = ({products,onAddToCart}) => {
    // const products=[
    //     {id:1,name:'shoes',description:'Running Shoes',price:'5$',image:"https://images.unsplash.com/photo-1632556286461-c1959906acd0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
    //     {id:2,name:'MacBook',description:'Apple Mackbook',price:'10$',image:"https://images.unsplash.com/photo-1632556286461-c1959906acd0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
    // ];
    const classes=usestyles();
    return (
        
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            
            <Grid container justifyContent="center" spacing={4}>
                {products.map(p=>(
                    <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={p} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default products
