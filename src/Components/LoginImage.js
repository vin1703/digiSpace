import React from 'react'
import { Box } from '@mui/material'

export default function LoginImage(props) {
  return (
    <Box sx={props.login_image}>
      <img style={{"height":"100%",width:"100%","object-fit":"contain"}}src="https://img.freepik.com/premium-vector/ecommerce-online-market-place-illustration_251005-483.jpg" />
    </Box>
  )
}
