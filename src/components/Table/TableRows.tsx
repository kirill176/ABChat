import { TableRow, TableCell } from "@mui/material";
import { flexRender, Cell } from "@tanstack/react-table";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IUpworkFeedItemDTO } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";

interface TableRowProps<T> {
  row: {
    id: string;
    getVisibleCells: () => Cell<T, any>[];
    original: IUpworkFeedItemDTO;
  };
}

const TableRows: FC<TableRowProps<any>> = ({ row }) => {
  const navigate = useNavigate();

  const handleFeedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`${row.original.id}`);
  };

  return (
    <TableRow onClick={handleFeedClick} sx={{ cursor: "pointer" }}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableRows;
