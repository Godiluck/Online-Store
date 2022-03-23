import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password)
            }
            user.setUser(user);
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="mx-auto">{isLogin ? "Authorisation" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Type your email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Type your password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between align-items-center flex-nowrap mt-3 ps-3">
                        {isLogin ?
                            <Col style={{display: "contents"}}>
                                No Account? <NavLink className="mx-2" to={REGISTRATION_ROUTE}> Sign up!</NavLink>
                            </Col>
                            :
                            <Col style={{display: "contents"}}>
                                Have account? <NavLink className="mx-2" to={LOGIN_ROUTE}> Sign in!</NavLink>
                            </Col>
                        }
                        <Col className="d-flex justify-content-end">
                           <Button
                               onClick={click}
                            variant={"outline-success"}
                            className="align-self-end"
                    >
                               {isLogin ? "Sign in" : "Sign up"}
                    </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;