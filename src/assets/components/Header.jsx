import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <>
      <AppBar position="static" style={{backgroundColor: '#424242', alignItems: 'center', marginBottom: '15px', height: '80px' }}>
        <Toolbar>
            <Box>
                <img src="https://stuckidemexico.com.mx/wp-content/uploads/2021/02/Logo-Stucki-e1618884528834.png" style={{height: '35px', marginTop: '20px'}} />
            </Box>
          <Typography variant="h6" style={{marginLeft: '20px', marginRight: '20px', marginTop:'10px'}}>
             x 
          </Typography>
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" style={{height: '40px', marginTop: '10px'}} />
          
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
