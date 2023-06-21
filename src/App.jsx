
import { Box, Container, Grid, Typography } from '@mui/material'
import './App.css'
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { useContext, useEffect, useState } from 'react'
import { CurrencyContext } from './context/CurrencyContext'
import axios from 'axios';
import navlogo from "./images/navlogo.png";

function App() {


  const {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount
  } = useContext(CurrencyContext)
  // console.log(firstAmount)
  
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  // console.log(codeFromCurrency);
  // console.log(resultCurrency);

  useEffect(()=> {

    if(firstAmount){
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey:"BgbcQXhPjomSD5QUau09iOCqt8AsciJjks6h6pYD",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
      .then(response => setResultCurrency(response.data.data[codeToCurrency]))
      .catch(error => console.log(error))
    }

  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "#e6a500",
    marginTop:"9rem",
    textAlign:"center",
    color: "#fdfdfd",
    minHeight: "20rem",
    borderRadius:10,
    // padding:"4rem 2rem",
    paddingBottom: "2rem",
    border:'2px dotted white',
    boxShadow: "29px 24px 5px 5px rgba(0,0,0,0.4)",
    position: "relative"
  }

  return (
    <>
      <Container maxWidth="md" sx={boxStyles}>
      <img src={navlogo} width={100} height={100}  />
        <Typography variant='h5' sx= {{marginBottom:"3rem"}}> ---- Stay Ahead with accurate converter ----</Typography>
        <Grid container spacing={4}>
         <InputAmount/>
         <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
          <SwitchCurrency />
          <SelectCountry value={toCurrency} setValue={setToCurrency} label="To"/>

        </Grid>

        {firstAmount ? (
          <Box sx={{textAlign:"center", marginTop:"2rem"}}>
            <Typography>{firstAmount} {fromCurrency} </Typography>
            <Typography variant='h5' sx ={{marginTop:"5px", fontWeight:"semibold"}} >{resultCurrency*firstAmount} {toCurrency} </Typography>
          </Box>
        ) :""}
      </Container>
    </>
  )
}

export default App
