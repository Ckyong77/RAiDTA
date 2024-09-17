import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


function TopBar({ navHandler, status, userDetails, page }) {

    const topNavHandler = (event) => {
        navHandler(event.target.name)
    }

    const logInOutRegister = (<>
        <Button
            color="inherit"
            onClick={topNavHandler}
            name={status != true ? "login" : "logout"}>
            {status != true ? "Login" : "Logout"}
        </Button>
        {status != true &&
            <Button
                color="inherit"
                onClick={topNavHandler}
                name={'register'}>
                Register
            </Button>
        }</>)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {status === true && <> {userDetails.isAdmin === true && <><Button
                        color="inherit"
                        onClick={topNavHandler}
                        name='adminboard'>
                        Adminboard
                    </Button>
                    <Divider orientation='vertical' flexItem/>
                        <Button
                            color="inherit"
                            onClick={topNavHandler}
                            name='addnew'>
                            Add new
                        </Button></>}</>}
                    {page === 'admin' && <Button
                        color="inherit"
                        onClick={topNavHandler}
                        name='/'>
                        Home
                    </Button>}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Welcome {userDetails != undefined && `${userDetails.firstName} ${userDetails.lastName}`}
                    </Typography>
                    {page != 'admin' && logInOutRegister}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar