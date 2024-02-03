import React, { useEffect,Suspense } from "react";
import { useAppContext } from "./Context/Context";
import { Routes, Route, useLocation,Navigate } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Home from "./Pages/Home";
// import ProductCategory from "./Pages/ProductCatagory";
// import Login from "./Pages/Login";
// import ProductInfo from "./Pages/ProductInfo";
// import SignUp from "./Pages/SignUp"
// import Cart from "./Pages/Cart";
// import Order from "./Pages/Order";

const Navbar = React.lazy(()=>import("./Components/Navbar"));
const Home = React.lazy(()=>import("./Pages/Home"));
const ProductCategory = React.lazy(()=>import("./Pages/ProductCatagory"));
const Login = React.lazy(()=>import("./Pages/Login"));
const SignUp = React.lazy(()=>import("./Pages/SignUp"));
const ProductInfo = React.lazy(()=>import("./Pages/ProductInfo"));
const Cart = React.lazy(()=>import("./Pages/Cart"));
const Order = React.lazy(()=>import("./Pages/Order"));

function App() {
  const { login,handleToken,handleUser,token } = useAppContext();
  const location = useLocation();
  useEffect(()=>{
    const storeData = JSON.parse(localStorage.getItem('userData'));
    if(storeData && storeData.token){
      login();
      handleToken(storeData.token);
      handleUser(storeData.user);
    }
  })
  
  const isProductOrderPage = location.pathname.startsWith("/product/order/");
  if (token) {
    return (
      <div style={{ backgroundColor: "#F0F0F0" }}>
      {!isProductOrderPage && <Navbar />}
      <Suspense fallback={ <div>loading</div>}>
      <Routes>
        <Route path="/" element={<Home myorder="My Order" />} />
        <Route
          path="/mobilePhones"
          element={<ProductCategory category="mobilePhones" />}
        />
        <Route
          path="/refrigerators"
          exact
          element={<ProductCategory category="refrigerator" />}
        />
        <Route
          path="/televisions"
          exact
          element={<ProductCategory category="televisions" />}
        />
        <Route
          path="/laptops"
          exact
          element={<ProductCategory category="laptop" />}
        />
        <Route
          path="/washingMachines"
          exact
          element={<ProductCategory category="washingMachine" />}
        />
        <Route path="/product/:id" exact element={<ProductInfo />} />
        <Route path="/cart/:userid" exact element={<Cart/>}/>
        <Route path="/product/order/:prodId" exact element={<Order/>}/>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
      </Suspense>
    </div>
    );
  }
  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      {(location.pathname !== "/login"&&location.pathname!=="/signup") && <Navbar />}
      <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mobilePhones"
          element={<ProductCategory category="mobilePhones" />}
        />
        <Route
          path="/refrigerators"
          exact
          element={<ProductCategory category="refrigerator" />}
        />
        <Route
          path="/televisions"
          exact
          element={<ProductCategory category="televisions" />}
        />
        <Route
          path="/laptops"
          exact
          element={<ProductCategory category="laptop" />}
        />
        <Route
          path="/washingMachines"
          exact
          element={<ProductCategory category="washingMachine" />}
        />
        <Route path="/product/:id" exact element={<ProductInfo />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp/>}/>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
      </Suspense>
    </div>
  );

  
}

export default App;
