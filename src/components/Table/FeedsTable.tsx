import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC, useEffect, useMemo } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Search from "./Search";
import TableRows from "./TableRows";
import { columns } from "./columns";
import { useAppSelector } from "../../hooks/redux";

interface FeedTableProps {
  loading: boolean;
}

const FeedsTable: FC<FeedTableProps> = ({ loading }) => {
  const {
    items: { items },
  } = useAppSelector((state) => state.feed);

  const table = useReactTable({
    columns,
    data: useMemo(() => items, [items]),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    table.setPageSize(items.length);
  }, [items]);

  return (
    <>
      <Table sx={{ height: "100%", width: "100%" }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} sx={{ verticalAlign: "top" }}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  sx={{
                    p: "8px",
                  }}
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <Search column={header.column} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={items.length}>
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRows key={row.id} row={row} />
            ))}
          </TableBody>
        )}
      </Table>
    </>
  );
};

export default FeedsTable;
