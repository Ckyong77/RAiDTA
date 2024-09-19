import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


function TopBar({ navHandler, status, userDetails, page, message }) {

    const topNavHandler = (event) => {
        navHandler(event.target.name)
    }
    
    //displaying the button options
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


    const adminTopNavButtons = (
        <><Button
            color="inherit"
            onClick={topNavHandler}
            name='adminboard'>
            Orders
        </Button>
            <Divider orientation='vertical' flexItem sx={{ backgroundColor: '#caf0f8' }} variant='middle'/>
            <Button
                color="inherit"
                onClick={topNavHandler}
                name='addnew'>
                Add new
            </Button></>
    )

    const customerTopNavButton = (
        <Button
            color='inherit'
            onClick={topNavHandler}
            name='orderhistory'
        >
            History
        </Button>
    )

    //messages to display on the top Nav bar
    const topNavMessages = {
        'welcome': <>Welcome {userDetails != null && `${userDetails.firstName} ${userDetails.lastName}`}</>,
        'orderHistory': <>Order History</>,
        'cusOrder': <>Customer Orders</>,
        'add': <>Add New Products</>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {status === true && <> {userDetails.isAdmin === true ? adminTopNavButtons : customerTopNavButton}</>}
                    {page === "order" && <Button
                        color="inherit"
                        onClick={topNavHandler}
                        name='/'>
                        Home
                    </Button>}
                    {<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {topNavMessages[message]}
                    </Typography>}
                    {page === 'home' && logInOutRegister}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar