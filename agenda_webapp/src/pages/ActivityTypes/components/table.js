import React from "react"
import _ from "lodash"
import { connect } from "react-redux"
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


export let ListTable = props => {

    const {
        handleRetrieve,
        handleDestroy,
        handleReload,
        list,
        detail,
        remove,
        auth,
    } = props

    const err = getErrors(list.errors)

    let header = [
        {
            title: "Nombre",
            prop: "name",
            sortable: true,
        },
        {
            title: "Valor en minutos",
            prop: "value",
            sortable: true,
        },
    ]

    if (_.get(auth.data, "is_superuser", false)) {
        header.push({
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
        })
    }


    return (
        <Row>
            <Col>
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


const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

ListTable = connect(mapStateToProps, {})(ListTable)
