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


export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    loading: boolean
}





export default function DataTable<TData, TValue>({
    columns,
    data,
    loading,
}: DataTableProps<TData, TValue>) {






    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    table.getAllColumns()




    return (
        <div>

            <div className="rounded-md border shadow-md">

                <Table className=''>
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
                            [1, 2, 3, 4, 5].map((_, i) => (
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

        </div>

    )

}