import React,{useState,useEffect} from 'react'
import { useForm,FormProvider } from 'react-hook-form'
import { Typography,Button,Select,Grid,InputLabel,MenuItem } from '@material-ui/core';
import CustomCheck from './CustomCheck';
import {commerce} from '../../lib/commerce'
import {Link} from 'react-router-dom';
const AddressForm = ({checkoutToken,next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');


    const countries=Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}));
    const subdivisions=Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}));
    const options=shippingOptions.map((so)=>({id:so.id,label:`${so.description}-(${so.price.formatted_with_symbol})`}))
    const methods=useForm();
    const fetshShippingCountries=async(checkoutTokenId)=>{
            const {countries}=await commerce.services.localeListShippingCountries(checkoutTokenId);
            setShippingCountries(countries);
            setShippingCountry(Object.keys(countries)[0]);
    }
const fetshShippingSubdivisions=async(countryCode)=>{
    const {subdivisions}=await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0])
}

const fetshShippingOptions=async(checkoutTokenId,country,region=null)=>{
    const options=await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region});
    setShippingOptions(options);
    setShippingOption(options[0].id);
}
    useEffect(()=>{
        fetshShippingCountries(checkoutToken.id);
    },[]);
    useEffect(()=>{
      if(shippingCountry) fetshShippingSubdivisions(shippingCountry);
    },[shippingCountry]);

    useEffect(()=>{
      if(shippingSubdivision) fetshShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision);
    },[shippingSubdivision]);
    return (
        <>
           <Typography variant="h6" gutterBottom>Shipping Address</Typography>
           <FormProvider {...methods}>
               <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
                   <Grid container spacing={3}> 
                        <CustomCheck required name='firstName' label='First Name'/>
                        <CustomCheck required name='lastName' label='Last Name'/>
                        <CustomCheck required name='address1' label='Address'/>
                        <CustomCheck required name='email' label='Email'/>
                        <CustomCheck required name='city' label='City'/>
                        <CustomCheck required name='zip' label='ZIP/Postal Code'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                {countries.map((country)=>(
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                               ) )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={e=>setShippingSubdivision(e.target.value)}>
                               {subdivisions.map((subdivision)=>(
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
                                </MenuItem>

                               ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={e=>setShippingOption(e.target.value)}>
                            {options.map((option)=>(
                                <MenuItem key={option.id} value={option.id}>
                                {option.label}
                                </MenuItem>

                               ))}
                            </Select>
                        </Grid>
                   </Grid> 
                <br/>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Button variant="outlined" component={Link} to="/cart" >Back to cart</Button>
                    <Button variant="contained" color="primary" type="submit" >Next</Button>
                </div>
               </form>
               
            </FormProvider> 
        </>
    )
}

export default AddressForm
