import React from 'react';
import { Badge, Button, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NavBar(props) {    
    const { username, onLogout, cartItemCount, orderItemCount } = props;
    let navigate = useNavigate();

    return (
        <Navbar className="navbar" variant="dark">
            <Navbar.Brand 
                className="mx-2" 
                onClick={() => navigate('/')}
            >
                Store
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end mx-2">
                {username ? (
                    <React.Fragment>
                        <Navbar.Text>
                            Logged in as:&nbsp;&nbsp;
                        </Navbar.Text>
                        
                        <Navbar.Text className="text-light">
                            {username}&nbsp;
                        </Navbar.Text>

                        {orderItemCount > 0 ? (
                        <Badge 
                            bg="warning" 
                            pill={true} 
                            onClick={() => navigate('/order')}
                        >
                            order!
                        </Badge>
                        ) : (<br />)}

                        <Button 
                            className="mx-3" 
                            variant="secondary"
                            onClick={onLogout} 
                        >
                            Logout
                        </Button>
                        
                    </React.Fragment>
                ) : (
                    <Button 
                        className="mx-3" 
                        variant="secondary"
                        onClick={() => navigate('/login')} 
                    >
                        Login
                    </Button>
                )}   

                <Button 
                    className="mx-1" 
                    variant="success"
                    onClick = {() => navigate('/cart')}
                >
                    Cart{' '}
                    {cartItemCount > 0 ? (
                    <Badge bg="warning" pill={true}>{cartItemCount}</Badge>
                    ) : (<br />)}
                </Button>
            </Navbar.Collapse>
        </Navbar>
    );
};