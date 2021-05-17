import React from "react"
import { Container, Row, Col } from "reactstrap"


const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid={true}>
                    <Row>
                        <Col md={6}>
                            {new Date().getFullYear()}
                        </Col>
                        <Col md={6}>
                            <div className="text-sm-right d-none d-sm-block">
                                Development by <a href="https://github.com/panttojo"><i className="fab fa-github" /> Panttojo</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    )
}

export default Footer
