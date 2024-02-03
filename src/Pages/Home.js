import React from 'react'

import { Box } from '@mui/material'
import { ItemStyle,ItemListStyle,HomeContentStyle } from './home_style'
import ItemList from '../Components/ItemList'
import { Link } from 'react-router-dom'
import ProductContent from '../Components/ProductContent'
export default function Home() {
const catImage = [
  "https://motorolain.vtexassets.com/arquivos/ids/158550-800-auto?width=800&height=auto&aspect=true","https://t4.ftcdn.net/jpg/00/60/22/53/360_F_60225311_S8DcTVag5dytCiTQDzXwKbq8UNKBBYJU.jpg","https://images.expertreviews.co.uk/wp-content/uploads/2022/11/best_washing_machine_-_bosch_series_4_wgg04409gb.jpg?width=960&height=540&crop=960:540","https://as2.ftcdn.net/v2/jpg/03/20/04/99/1000_F_320049905_wQuDmVm1HOwvWLagSdCk1GDIJ7QpJUM6.jpg","https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWULX0?ver=b03d"
];
  return (
    <>
    <Box sx={ItemStyle}>
      <Link to="/mobilePhones">
      <ItemList itemListStyle={ItemListStyle} itemImage={catImage[0]}/>
      </Link>
      <Link to="/televisions">
      <ItemList itemListStyle={ItemListStyle} itemImage={catImage[1]}/>
      </Link>
      <Link to="/washingMachines">
      <ItemList itemListStyle={ItemListStyle} itemImage={catImage[2]}/>
      </Link>
      <Link to="/refrigerators">
      <ItemList itemListStyle={ItemListStyle} itemImage={catImage[3]}/>
      </Link>
      <Link to="/laptops">
      <ItemList itemListStyle={ItemListStyle} itemImage={catImage[4]}/>
      </Link>
    </Box>
      <ProductContent/>
    </>
  )
}
