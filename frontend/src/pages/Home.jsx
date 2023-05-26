import React, { useEffect } from 'react'
import { Button, Container, Row } from "react-bootstrap";
import "./home.css"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {

    const navigate = useNavigate()
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        if (userInfo) {
            navigate("/profile");
        }
    }, [userInfo, navigate]);


    return (
        
            <Container>
                <Row>
                    <div className="intro-text ">
                        <div>
                            <h1 className="title">Welcome</h1>
                            <p className="subtitle"></p>
                        </div>
                        <div className="buttonContainer">
                            <Link to="/signin">
                                <Button size="lg" className="landingbutton">
                                    Login
                                </Button>
                            </Link>

                            <Link to="/register">
                                <Button
                                    variant="outline-primary"
                                    size="lg"
                                    className="landingbutton"
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Row>
            </Container>
     
    )
}

export default Home
