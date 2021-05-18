import React from "react"
import {
    Row,
    Col,
    Alert,
} from "reactstrap"

// utils
import { getErrors } from "../../../helpers/utils"

// components
import { EditButton, DeleteButton } from "../../../components/Buttons"
import { CDataTable } from "../../../components/CDataTable"


export const ListTable = props => {

    const {
        handleRetrieve,
        handleDestroy,
        handleReload,
        list,
        detail,
        remove,
    } = props

    const err = getErrors(list.errors)

    const header = [
        {
            title: "Nombre",
            prop: "name"
        },
        {
            title: "Acciones",
            prop: "id",
            cell: row => (
                <>
                    <EditButton
                        loading={detail.loading}
                        click={() => { handleRetrieve(row.id) }}
                        title="Editar"
                    />
                    {" "}
                    <DeleteButton
                        loading={remove.loading}
                        click={() => { handleDestroy(row) }}
                        title="Eliminar"
                    />
                </>
            )
        },
    ]


    return (
        <Row>
            <Col>
                {err.validationErrors ?
                    err.validationErrors.filter(e => e.field === undefined).map((error, key) =>
                        <Alert key={key} color="danger">
                            {error.message}
                        </Alert>
                    ) : null
                }
                {err.generalErrors ?
                    err.generalErrors.map((error, key) =>
                        <Alert key={key} color="danger">
                            {error.message}
                        </Alert>
                    ) : null
                }
                <CDataTable
                    list={list}
                    tableHeaders={header}
                    handleReload={handleReload}
                    loading={list.loading}
                    initalSort={{ prop: "name", isAscending: true }}
                />
            </Col>
        </Row>
    )
}
