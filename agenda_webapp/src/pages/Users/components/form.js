import React, { useEffect } from "react"
import _ from "lodash"

import { useForm } from "react-hook-form"
import {
    Alert,
    Row,
    Col,
    Form,
    Label,
    Input,
    FormGroup,
    FormFeedback,
    FormText,
} from "reactstrap"

// utils
import { getErrors } from "../../../helpers/utils"


export let EditableForm = props => {
    const { register, handleSubmit, errors, reset, watch } = useForm()
    const {
        data,
        handleOnSubmit,
    } = props

    const err = getErrors(props.errors)
    const totalErrors = Object.keys(errors).length + err.totalErrors

    useEffect(() => {
        reset(data)
    }, [reset, data])


    return (
        <Form
            id="user_form"
            className={"form-horizontal m-t-30 needs-validation" + (totalErrors && " was-validated")}
            onSubmit={handleSubmit(handleOnSubmit)}
            noValidate
        >
            {err.validationErrors ?
                err.validationErrors.filter(e => e.field === undefined).map((error, key) =>
                    <Alert key={key} color="danger">
                        {error.message}
                    </Alert>
                ) : null
            }
            <Input type="hidden" name="id" innerRef={register} />

            <Row>
                <Col>
                    <FormGroup>
                        <Label htmlFor="username">Nombre de usuario <span className="text-danger">*</span></Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            required
                            innerRef={register({ required: true })}
                        />
                        <FormText>
                            Nombre de usuario con el que se iniciará sesión
                        </FormText>
                        {errors.username && errors.username.type === "required" && (
                            <FormText color="danger">
                                Este campo es obligatorio
                            </FormText>
                        )}
                        {err.validationErrors.find(error => error.field === "username") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "username").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            innerRef={register}
                        />
                        {errors.email && errors.email.type === "required" && (
                            <FormText color="danger">
                                Este campo es obligatorio
                            </FormText>
                        )}
                        {err.validationErrors.find(error => error.field === "email") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "email").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <Label htmlFor="first_name">Nombres <span className="text-danger">*</span></Label>
                        <Input
                            type="text"
                            name="first_name"
                            id="first_name"
                            required
                            innerRef={register({ required: true })}
                        />
                        {errors.first_name && errors.first_name.type === "required" && (
                            <FormText color="danger">
                                Este campo es obligatorio
                            </FormText>
                        )}
                        {err.validationErrors.find(error => error.field === "first_name") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "first_name").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="last_name">Apellidos <span className="text-danger">*</span></Label>
                        <Input
                            type="text"
                            name="last_name"
                            id="last_name"
                            required
                            innerRef={register({ required: true })}
                        />
                        {errors.last_name && errors.last_name.type === "required" && (
                            <FormText color="danger">
                                Este campo es obligatorio
                            </FormText>
                        )}
                        {err.validationErrors.find(error => error.field === "last_name") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "last_name").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>

            <hr />
            {_.get(data, "id", false) &&
                <Row className="pb-4 text-center">
                    <Col>
                        <span className="text-muted">Dejar en blanco para no modificar</span>
                    </Col>
                </Row>
            }

            <Row>
                <Col>
                    <FormGroup>
                        <Label htmlFor="password">Contraseña <span className="text-danger">*</span></Label>
                        <Input
                            autoComplete="off"
                            type="password"
                            name="password"
                            id="password"
                            innerRef={register}
                        />
                        {errors.password && errors.password.type === "required" && (
                            <FormFeedback>Este campo es obligatorio</FormFeedback>
                        )}
                        {err.validationErrors.find(error => error.field === "password") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "password").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="password_confirm">Confirmar contraseña <span className="text-danger">*</span></Label>
                        <Input
                            autoComplete="off"
                            type="password"
                            name="password_confirm"
                            id="password_confirm"
                            innerRef={register({
                                validate: value => value === watch("password")
                            })}
                        />
                        {errors.password_confirm && errors.password_confirm.type === "required" && (
                            <FormFeedback>Este campo es obligatorio</FormFeedback>
                        )}
                        {errors.password_confirm && errors.password_confirm.type === "validate" && (
                            <FormText color="danger">
                                Las contraseñas deben coincidir
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}
