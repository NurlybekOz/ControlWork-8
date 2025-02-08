import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";


const NavBar = () => {
    return (
        <Box sx={{flexGrow: 1, mb: 5}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color='inherit'
                        component={NavLink}
                        to='/'
                        sx={{ flexGrow: 1, textDecoration: 'none' }}
                    >
                        Quotes Centre
                    </Typography>
                    <Button color='inherit' component={NavLink} to='/'>Home</Button>
                    <Button color='inherit' component={NavLink} to='/quotes/new-quote'>Submit New Quote</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;