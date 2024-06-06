import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/MailDataTable/data-table-view-options";


export function DataTableToolbar({ table }) {

  return (
    <div className="flex items-center justify-between pr-2">
      <div className="flex flex-1 items-center space-x-2 relative">
        <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter sender names..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[350px] pl-8"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
