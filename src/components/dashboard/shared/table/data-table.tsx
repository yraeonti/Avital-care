"use client"

import {
    PaginationState,
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from "@/components/ui/input"
import ReactPaginate from "react-paginate"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    loading: boolean
    globalFilter: string
}





export default function DataTable<TData, TValue>({
    columns,
    data,
    loading,
    globalFilter
}: DataTableProps<TData, TValue>) {






    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter,
        }
    })

    table.getAllColumns()


    const handlePageChange = ({ selected }: { selected: number }) => {
        table.setPageIndex(selected)
    }

    return (
        <div>

            <div className="rounded-md border shadow-md">

                <Table className='whitespace-nowrap'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className=''>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className=''>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                                <TableRow key={i}>
                                    {
                                        table.getAllColumns().map((_, i) => (
                                            <TableCell key={i}>

                                                <Skeleton className='h-10 bg-stone-200' />
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))


                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell, i) => (
                                        i === 0 ? (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ) : (
                                            <TableCell key={cell.id} className=''>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )

                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
            {
                table.getPageCount() > 1 && (
                    <div className="flex items-center justify-end space-x-2 py-4">
                        {/* <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button> */}


                        <ReactPaginate
                            pageCount={table.getPageCount()}
                            activeClassName="text-[#0202CB] bg-stone-400"
                            className="flex space-x-3 "
                            forcePage={table.getState().pagination.pageIndex}
                            onPageChange={handlePageChange}
                            pageClassName="border border-stone-200 px-2 rounded-md"
                            previousClassName={`border border-stone-200 px-2 rounded-md 
                            ${!table.getCanPreviousPage() && 'opacity-50'}`}
                            nextClassName={`border border-stone-200 px-2 rounded-md 
                            ${!table.getCanNextPage() && 'opacity-50'}`}
                        />
                    </div>

                )
            }

        </div>

    )

}