import React from 'react'
import { Box } from '@mui/material'
export default function ItemList(props) {
  return (
    <Box sx={props.itemListStyle}>
    
        <img style={{"object-fit":"contain","width":"100%","height":"100%"}} src={props.itemImage} alt="img" />
    </Box>
  )
}
