import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
    <Container>
    <NavLink style={{color: "white"}} to={SHOP_ROUTE}>DeviceShop</NavLink>
        {user.isAuth ?
            <Nav className="ms-auto" style={{color: "white"}}>
                <Button
                    onClick={() => history.push(ADMIN_ROUTE)}
                    variant={"outline-danger"}>
                        Admin Panel
                </Button>
                <Button
                    className="ms-3"
                    onClick={() => logOut()}
                    variant={"outline-danger"}>
                        Sign Out
                </Button>
            </Nav>
                :
                <Nav className="m-lg-0" style={{color: "white"}}>
                <Button variant={"outline-danger"} onClick={() => history.push(LOGIN_ROUTE)}>Authorisation</Button>
            </Nav>
        }
    </Container>
  </Navbar>
    );
});

export default NavBar;