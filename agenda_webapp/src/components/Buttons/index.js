import React from "react"
import {
    Button,
    UncontrolledTooltip,
} from "reactstrap"

import { IconLoading } from "../Icons"


export const EditButton = props => {
    const {
        loading,
        click,
    } = props

    return (
        <Button
            color="info"
            size="sm"
            onClick={click}
            id="editar"
        >
            {loading ? <IconLoading /> : <i className="fa fa-edit" />}
            <UncontrolledTooltip placement="right" target="editar">Editar</UncontrolledTooltip>
        </Button >
    )
}

export const DeleteButton = props => {
    const {
        loading,
        click,
    } = props

    return (
        <Button
            color="danger"
            size="sm"
            onClick={click}
            id="eliminar"
        >
            {loading ? <IconLoading /> : <i className="fa fa-trash" />}
            <UncontrolledTooltip placement="right" target="eliminar">Eliminar</UncontrolledTooltip>
        </Button >
    )
}

export const CancelButton = props => {
    const {
        loading,
        onClick,
    } = props

    return (
        <Button
            color="danger"
            onClick={onClick}
            disabled={loading}
        >
            <i className="fa fa-ban"></i> Cancelar
        </Button>
    )
}

export const CloseButton = props => {
    const {
        loading,
        onClick,
    } = props

    return (
        <Button
            color="danger"
            onClick={onClick}
            disabled={loading}
        >
            <i className="fa fa-ban"></i> Cerrar
        </Button>
    )
}

export const SaveButton = props => {
    const {
        loading,
        onClick,
    } = props

    return (
        <Button
            onClick={onClick}
            disabled={loading}
            color="success"
        >
            {loading ? <IconLoading /> : <i className="fa fa-save" />} Guardar
        </Button>
    )
}

export const NewButton = props => {
    const {
        loading,
        onClick,
    } = props

    return (
        <Button
            color="success"
            onClick={onClick}
        >
            {loading ? <IconLoading /> : <i className="fa fa-plus" />} Nuevo
        </Button>
    )
}
