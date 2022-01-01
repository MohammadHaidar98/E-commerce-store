import React,{useState,useEffect} from 'react'
import Products from './components/products/products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Checkout from './components/checkoutForm/checkOut/Checkout'
import { commerce } from './lib/commerce'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
const App = () => {
    const [products, setProducts] =useState([])
    const [cart, setCart] =useState({})
    const [order, setOrder] =useState({})
    const [errorMessage, setErrorMessage] =useState('');
    const fetchProducts=async()=>{
        const {data}=await commerce.products.list();
        setProducts(data);
    }
    
    const fetchCart=async()=>{
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart=async(productId,quantity)=>{
        const item=await commerce.cart.add(productId,quantity);
        setCart(item.cart)
    }
    const handleCartUpdate=async(productId,quantity)=>{
        const {cart}=await commerce.cart.update(productId,{quantity})
        setCart(cart);
    }
    const handleRemoveFromCart=async(productId)=>{
        const {cart}=await commerce.cart.remove(productId);
        setCart(cart);
    }
    const handleEmptyCart=async()=>{
        const {cart}=commerce.cart.empty();
        setCart(cart);
    }
    
    const refreshCart=async()=>{
        const newCart=await commerce.cart.refresh();
        setCart(newCart);
    }
    const handleCaptureCheckout=async(checkoutTokenId,newOrder)=>{
        try {
            const incomingorder=await commerce.checkout.capture(checkoutTokenId,newOrder);
            setOrder(incomingorder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }
    useEffect(()=>{
        fetchProducts();
        fetchCart();
    },[])
    console.log(cart);
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">

                        <Products products={products} onAddToCart={handleAddToCart}/> 
                    
                    </Route>
                            
                    <Route exact path="/cart">
                        <Cart cart={cart} handleCartUpdate={handleCartUpdate} handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart}
                        />

                    </Route>
                    <Route exact path="/checkout">
                        <Checkout 
                        cart={cart}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                        order={order}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
