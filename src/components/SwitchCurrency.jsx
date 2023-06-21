import React, { useContext } from 'react'
import { Button, Grid } from '@mui/material'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { CurrencyContext } from '../context/CurrencyContext';
    
const SwitchCurrency = () => {

  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency
  } = useContext(CurrencyContext)

  // switching of currencies

  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <Grid item xs={12} md="auto">
      <Button onClick={handleSwitch} sx={{
        borderRadius: 1,
        color:"#fdfdfd",
        height: "100%"
      }}>
        <ModelTrainingIcon sx={{fontSize: 30}}/>
      </Button>
    </Grid>
  )
}

export default SwitchCurrency