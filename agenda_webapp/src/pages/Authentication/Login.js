import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
    Row,
    Col,
    CardBody,
    Card,
    Alert,
    Container,
    Form,
    Button,
    Input,
    FormText,
    FormGroup,
} from "reactstrap";


// actions
import authActions from "../../store/auth/actions"

// utils
import { getErrors } from '../../helpers/utils'

// components
import { IconLoading } from '../../components/Icons'

// import images
import logo from "../../assets/images/logo-sm-light.png";


export let Login = props => {
    const { register, handleSubmit, errors } = useForm()

    const {
        history,
        login,
        loading,
        data: { auth_token }
    } = props

    const err = getErrors(props.errors)
    const totalErrors = Object.keys(errors).length + err.totalErrors

    useEffect(() => {
        if (auth_token) {
            history.push("/")
        }
    }, [auth_token, history])

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-soft-info">
                                    <Row>
                                        <Col>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Login</h5>
                                                <p>Administración de agenda</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div>
                                        <Link to="/">
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-dark">
                                                    <img src={logo} alt="" className="rounded-circle" height="50" />
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        <Form
                                            className={"form-horizontal m-t-30 needs-validation " + (totalErrors ? " was-validated" : "")}
                                            onSubmit={handleSubmit(login)}
                                            noValidate
                                        >
                                            {err.generalErrors ?
                                                err.generalErrors.map((error, key) =>
                                                    <Alert key={key} color="danger">
                                                        {error.message}
                                                    </Alert>
                                                ) : null
                                            }
                                            <FormGroup className="formLogin text-muted" >
                                                <i className="icon-user text-muted"></i>
                                                <Input
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    placeholder="Nombre de usuario"
                                                    required
                                                    innerRef={register({ required: true })}
                                                />
                                                {errors.username && errors.username.type === 'required' && (
                                                    <FormText color="danger">
                                                        Este campo es obligatorio
                                                    </FormText>
                                                )}
                                            </FormGroup>

                                            <FormGroup className="formLogin text-muted">
                                                <i className="icon-lock2 text-muted"></i>
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    placeholder="Contraseña"
                                                    required
                                                    innerRef={register({ required: true })}
                                                />
                                                <i className="icon-lock2 text-muted"></i>
                                                {errors.password && errors.password.type === 'required' && (
                                                    <FormText color="danger">
                                                        Este campo es obligatorio
                                                    </FormText>
                                                )}
                                            </FormGroup>

                                            <FormGroup>
                                                <Row>
                                                    <Col>
                                                        <Button
                                                            disabled={loading}
                                                            className="btn-info"
                                                            type="submit"
                                                            block
                                                        >
                                                            {loading ? <IconLoading /> : <i className="fa fa-lock" />} Iniciar sesión
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

const mapStatetoProps = state => {
    const {
        loading,
        errors,
        data,
    } = state.auth

    return {
        loading,
        errors,
        data,
    }
}

Login = withRouter(connect(mapStatetoProps, {
    login: authActions.loginRequest
})(Login))
