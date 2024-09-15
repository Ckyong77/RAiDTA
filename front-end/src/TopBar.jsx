import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


function TopBar({ logHandler, status, userDetails, page }) {

    const navigate = useNavigate()

    const logStatusHandler = (event) => {
        logHandler(event.target.name)
    }

    const registerHandler = () => {
        navigate('register')
    }

    const adminhandler = () => {
        navigate('adminboard')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {status === true && <div> {userDetails.isAdmin === true && <Button
                        color="inherit"
                        onClick={adminhandler}
                        name='adminboard'>
                        Adminboard
                    </Button>}</div>}
                    {page === 'admin' && <Button
                        color="inherit"
                        onClick={logStatusHandler}
                        name='/'>
                        Home
                    </Button>}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Welcome {userDetails && `${userDetails.firstName} ${userDetails.lastName}`}
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={logStatusHandler}
                        name={status != true ? "login" : "logout"}>
                        {status != true ? "Login" : "Logout"}
                    </Button>
                    {status != true &&
                        <Button
                            color="inherit"
                            onClick={registerHandler}>
                            Register
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar