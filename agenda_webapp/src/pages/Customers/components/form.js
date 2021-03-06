import React, { useEffect, useState } from "react"
import _ from "lodash"
import { connect } from "react-redux"

import { useForm } from "react-hook-form"
import {
    Alert,
    Row,
    Col,
    Form,
    Label,
    Input,
    FormGroup,
    FormText,
} from "reactstrap"
import Select from "react-select"

// utils
import { getErrors } from "../../../helpers/utils"

// actions
import userActions from "../../../store/users/actions"


export let EditableForm = props => {
    const { register, handleSubmit, errors, reset } = useForm()
    const {
        getAllUsers,
        data,
        handleOnSubmit,
        auth,
        sellers,
    } = props

    const err = getErrors(props.errors)
    const totalErrors = Object.keys(errors).length + err.totalErrors

    const [seller, setSeller] = useState(null)


    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])

    useEffect(() => {
        const payload = { ...data }
        if (_.get(data, "seller", false)) {
            payload["seller"] = _.get(data.seller, "id", null)
            setSeller({
                id: _.get(data, "id", null),
                label: `${_.get(data.seller, "username")} | ${_.get(data.seller, "full_name")}`,
            })
        }
        reset(payload)
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
                        <Label htmlFor="name">Nombre <span className="text-danger">*</span></Label>
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

            {_.get(auth.data, "is_superuser") &&
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="seller">Vendedor <span className="text-danger">*</span></Label>
                            <Input
                                style={{ display: "none" }}
                                type="text"
                                name="seller"
                                id="seller"
                                required
                                value={_.get(seller, "value", "")}
                                innerRef={register({ required: true })}
                            />
                            <Select
                                placeholder="Seleccionar..."
                                options={
                                    sellers.options.data.map(row => (
                                        { label: `${row.username} | ${row.full_name}`, value: row.id }
                                    ))
                                }
                                value={seller}
                                isLoading={sellers.options.loading}
                                onChange={setSeller}
                            />
                            {errors.seller && errors.seller.type === "required" && (
                                <FormText color="danger">
                                    Este campo es obligatorio
                                </FormText>
                            )}
                            {err.validationErrors.find(error => error.field === "seller") && (
                                <FormText color="danger">
                                    {err.validationErrors.find(error => error.field === "seller").message}
                                </FormText>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
            }
        </Form>
    )

}

const mapStateToProps = ({ auth, users }) => {
    return {
        auth,
        sellers: users,
    }
}

EditableForm = connect(mapStateToProps, {
    getAllUsers: userActions.getAllOptionsRequest,
})(EditableForm)
