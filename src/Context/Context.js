import React, { createContext, useCallback, useContext, useState } from 'react';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [token,setToken]=useState(null);
  const [user,setUser] = useState({});
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [cartCount,setCartCount]=useState(0);
  const [order,setOrder] = useState({});

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[])

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[])

  const handleUser = (user) =>{
    setUser(user);
  }

  const handleToken = (token)=>{
    setToken(token);
  }
  
  const handleCount = (count)=>{
    setCartCount(count);
  }

  const handleOrder = (order)=>{
    setOrder(order);
  }

  return (
    <AppContext.Provider value={{ searchText, isLoggedIn,handleSearch,login,logout,handleUser,user,handleCount,cartCount,token,handleToken,handleOrder,order}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
