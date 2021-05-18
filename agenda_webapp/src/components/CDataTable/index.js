import React, { useState, useEffect, useCallback } from "react"
import _ from "lodash"

import Datatable from "react-bs-datatable"
import { css } from "@emotion/css"

// components
import { IconBigLoading } from "../Icons"


export const CDataTable = props => {

    const {
        list,
        tableHeaders,
        handleReload,
        initalSort,
    } = props

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [maxPage, setMaxPage] = useState(1)
    const [sortedProp, setSortedProp] = useState(initalSort)

    const onSort = useCallback(nextProp => {
        setSortedProp(oldState => {
            const nextSort = { ...oldState }

            if (nextProp !== oldState.prop) {
                nextSort.prop = nextProp
                nextSort.isAscending = true
            } else {
                nextSort.isAscending = !oldState.isAscending
            }
            return nextSort
        })
    }, [])

    const onPaginate = useCallback(nextPage => {
        setCurrentPage(nextPage)
    }, [])

    const onRowsPerPageChange = useCallback(rowsPerPage => {
        setCurrentPage(1)
        setRowsPerPage(rowsPerPage)
    }, [])

    useEffect(() => {
        const count = _.get(list.data, "count", 0)
        if (count) {
            setMaxPage(Math.ceil(count / rowsPerPage))
        }
    }, [list, rowsPerPage])

    useEffect(() => {
        const params = {
            per_page: rowsPerPage,
            page: currentPage,
            ordering: `${sortedProp.isAscending ? "" : "-"}${sortedProp.prop}`,
        }
        handleReload(params)
    }, [sortedProp, currentPage, rowsPerPage])


    return (
        <Datatable
            tableHeaders={tableHeaders}
            tableBody={list.loading ? [] : _.get(list.data, "results", [])}
            rowsPerPage={10}
            rowsPerPageOption={[1, 10, 20, 50, 100]}
            initalSort={initalSort}
            classes={{
                table: "table table-bordered table-hover table-striped",
                theadCol: css`&.thead-th { font-weight: bold; border-top: 1px solid #eff2f7 !important; }`,
                paginationOptsFormText: css` &:first-of-type { margin-right: 8px; } &:last-of-type { margin-left: 8px; }`
            }}
            labels={{
                first: "<<",
                last: ">>",
                prev: "<",
                next: ">",
                show: "Ver ",
                entries: ` resultados de ${_.get(list.data, "count", 0)}`,
                noResults: list.loading ? <IconBigLoading /> : <>No hay datos para mostrar</>
            }}
            async={{
                currentPage,
                maxPage,
                rowsPerPage,
                sortedProp,
                onSort,
                onPaginate,
                onRowsPerPageChange,
            }}
        />
    )
}
