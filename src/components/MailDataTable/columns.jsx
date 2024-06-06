"use client";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

function getBadgeVariantFromLabel(label) {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Task"
        className={"hidden"}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] hidden">{row.getValue("id")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      // const labels = row.getValue("labels");
      return (
        <div className="flex flex-col gap-1 justify-start items-start ">
          {/* {labels.map((label) => (
            <Badge
              key={label}
              variant="outline"
            >
              {label}
            </Badge>
          ))} */}
          <span className="max-w-[200px] font-medium">
            {row.getValue("name")}
          </span>
          {/* <span className="max-w-[200px] font-medium">
            {row.getValue("email")}
          </span> */}
          <span className="max-w-[200px] text-xs font-semibold">
            {row.getValue("subject")}
          </span>
          {/* <span>
            {!row.getValue("read") && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}

          </span> */}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Text"
        className={"hidden"}
      />
    ),
    cell: ({ row }) => {
      const labels = row.getValue("labels");
      const text = row.getValue("text");
      const truncatedText =
        text.length > 100 ? `${text.substring(0, 80)}...` : text;

      return (
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm">{truncatedText}</span>
          {labels.length ? (
            <div className="flex w-full items-start gap-2">
              {labels.map((label) => (
                <Badge
                  key={label}
                  variant={getBadgeVariantFromLabel(label)}
                >
                  {label}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className={"hidden"}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full">
          {formatDistanceToNow(new Date(row.getValue("date")), {
            addSuffix: true,
          })}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "labels",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Label"
        className={"hidden"}
      />
    ),
    cell: ({ row }) => {
      return <div className="w-full hidden">{row.getValue("labels")}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Subject"
        className={"hidden"}
      />
    ),
    cell: ({ row }) => {
      return <div className="w-full hidden">{row.getValue("subject")}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className={"hidden"}
      />
    ),
    cell: ({ row }) => {
      return <div className="w-full hidden">{row.getValue("email")}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
