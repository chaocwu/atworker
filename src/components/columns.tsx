"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Test } from "@/types/test";

export const columns: ColumnDef<Test>[] = [
  {
    accessorKey: "code",
    header: "编号",
  },
];
