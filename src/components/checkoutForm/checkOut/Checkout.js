import React,{useState,useEffect} from 'react'
import { Typography,Button,Step,StepLabel,CircularProgress,Divider,Stepper,Paper } from '@material-ui/core'
import { mergeClasses } from '@material-ui/styles'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'
import {Link,useHistory} from 'react-router-dom';
const steps=['shipping address','payment details']
const Checkout = ({cart,onCaptureCheckout,error,order}) => {
    const classes=useStyles();
    const [activeStep,setActiveStep]=useState(0);
    const [checkoutToken,setCheckoutToken]=useState(null);
    const [shippingData,setShippingData]=useState({});
    const [isFinish,setIsFinish]=useState(false);
    const history=useHistory();
    useEffect(()=>{
        const generatetoken=async ()=>{
            try {
                const token=await commerce.checkout.generateToken(cart.id,{type:'cart'});
                setCheckoutToken(token);
            } catch (error) {
                history.pushState('/');
            }
        }
        generatetoken();
    },[cart]);
    
    const nextStep=()=>setActiveStep((prevActivestep)=>prevActivestep + 1);
    const backStep=()=>setActiveStep((prevActivestep)=>prevActivestep - 1);
    const next=(data)=>{
        setShippingData(data);
        nextStep();
    }
    const timeout=()=>{
        setTimeout(()=>{
            setIsFinish(true);
        },3000)
    }
    let ConfirmForm=()=> order.customer ?(
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase,{order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">order ref:{order.customer_refrence} </Typography>
            </div>
            <br/>
            <Button variant="outlined" type="button" component={Link} to="/">Back to Home</Button>
        </>
    ): isFinish ? (
        <div>
             <Typography variant="h5">Thank you for your purchase</Typography>
                <Divider className={classes.divider}/>
                <br/>
            <Button variant="outlined" type="button" component={Link} to="/">Back to Home</Button>
               
        </div>
    ) :(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    );

    if(error){
        <>
            <Typography variant="h5">{error}</Typography>
            <br/>
            <Button variant="outlined" type="button" component={Link} to="/">Back to Home</Button>

        </>
    }

    const Form=()=>activeStep===0 
    ?<AddressForm next={next} checkoutToken={checkoutToken}/>
    :<PaymentForm timeout={timeout} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout}  checkoutToken={checkoutToken} backStep={backStep} shippingData={shippingData}/>
    return (
        <>
         <div className={classes.toolbar}></div>  
         <main className={classes.layout}>
             <Paper className={classes.paper}>
                 <Typography variant='h4' align='center'>Checkout</Typography>
                 <Stepper activeStep={activeStep} className={classes.stepper}>
                     {steps.map((step)=>(
                         <Step key={step}> 
                            <StepLabel>{step}</StepLabel>
                         </Step>

                     ))}

                 </Stepper>
                    {activeStep===steps.length?<ConfirmForm/>: checkoutToken &&<Form/>}
             </Paper>

         </main> 
        </>
    )

    }
export default Checkout
