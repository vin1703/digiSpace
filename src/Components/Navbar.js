import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
// import { Link,NavLink } from 'react-router-dom';
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAppContext } from "../Context/Context";

export default function Navbar() {
  const [inputFocused, setInputFocused] = useState(false);
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  const buttonStyle = {
    '&:hover':{backgroundColor: "#25ba91"},
    width: "80px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
    
  }

  const searchBarStyle = {
    width: "600px",
    height: "40px",
    backgroundColor: "#fff",
    border: "none",
    outline: inputFocused ? "none" : "initial",
  };

  const { isLoggedIn, user, cartCount,logout,handleToken,handleUser } = useAppContext();
  const [textLogin, setTextLogin] = useState("Login");

  useEffect(() => {
    setTextLogin(isLoggedIn && user ? formatName(user.name) : "Login");
  }, [isLoggedIn, user]);

  const { handleSearch } = useAppContext();
  const [localSearchText, setLocalSearchText] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  const onLocalSearch = () => {
    if (onSearch === false) {
      setLocalSearchText("");
    }
    setOnSearch((prev) => !prev);
    handleSearch(localSearchText);
  };

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleLogout = () => {
    logout();
    handleToken(null);
    handleUser({});
    localStorage.removeItem('userData');
  }

  const formatName = (name) => {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    return "";
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#29ab87", boxShadow: "none" }}
      >
        <Toolbar sx={navStyle}>
          <Box>
            <Typography variant="h4">Digi Space</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={localSearchText}
              onChange={(e) => setLocalSearchText(e.target.value)}
              style={searchBarStyle}
              placeholder="search for products and more..."
              onFocus={handleFocus}
            />
            {onSearch ? (
              <ClearIcon
                sx={{
                  backgroundColor: "#fff",
                  color: "#29ab87",
                  height: "41px",
                  width: "35px",
                }}
                onClick={onLocalSearch}
              />
            ) : (
              <SearchIcon
                sx={{
                  backgroundColor: "#fff",
                  color: "#29ab87",
                  height: "41px",
                  width: "35px",
                }}
                onClick={onLocalSearch}
              />
            )}
          </Box>
          <Box sx={{width:"250px", display: "flex", justifyContent: "space-between" }}>
          <Box
              sx={buttonStyle}
            >
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "22px",
                }}
              >
                <Typography
                  sx={{
                    textDecoration: "none",
                    color: "#fff",
                    fontSize: "21px",
                  }}
                >
                  {textLogin}
                </Typography>
              </Link>
            </Box>
            {isLoggedIn && <Box
              sx={buttonStyle}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "29px",
                  display:"flex",
                  alignItems:"center"
                }}
                to={`/cart/${user._id}`}
              >
             
                <>
                  <Badge badgeContent={cartCount} sx={{color:"#fff"}} color='success'>
                    <ShoppingCartSharpIcon
                      style={{ color: "#fff",width:"30px",height:"30px" }}
                     
                    />
                  </Badge>
                </>
                
                
              </Link>
            </Box>}
            {isLoggedIn&& <Box
              sx={buttonStyle}
            >
              <Link
                onClick={handleLogout}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "21px",
                }}
              >
                <PowerSettingsNewIcon sx={{color:"#fff",width:"30px",height:"30px"}}/>
              </Link>
            </Box>}
            
            
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
