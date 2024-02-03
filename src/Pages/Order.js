import React from "react";
import { Box } from "@mui/material";
import {mainFlexBox, orderStyl} from "./orderStyle"
import Address from "../Components/Address";
import ProductDes from "../Components/ProductDes";

export default function Order() {
  return (
    <Box sx={orderStyl}>
      <Box sx={mainFlexBox}>
          <ProductDes/>
          <Address/>
      </Box>
    </Box>
  );
}
