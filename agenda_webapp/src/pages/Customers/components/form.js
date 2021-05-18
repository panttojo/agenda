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
        handleOnSubmit
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
                        <Label htmlFor="username">Nombre <span className="text-danger">*</span></Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            required
                            innerRef={register({ required: true })}
                        />
                        {errors.name && errors.name.type === "required" && (
                            <FormText color="danger">
                                Este campo es obligatorio
                            </FormText>
                        )}
                        {err.validationErrors.find(error => error.field === "name") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "name").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )

}
