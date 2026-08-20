import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export default function Table<T>({
  columns,
  rows,
  keyExtractor,
  emptyMessage = "Nothing here yet.",
  onRowClick,
}: TableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="px-5 py-10 text-center text-sm text-ink-400 sm:px-6">{emptyMessage}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead>
          <tr className="border-b border-paper-rule text-xs font-semibold uppercase tracking-wide text-ink-400">
            {columns.map((col) => (
              <th
                key={col.header}
                className={`px-5 py-3 sm:px-6 ${col.hideOnMobile ? "hidden sm:table-cell" : ""} ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={keyExtractor(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-b border-paper-rule last:border-0 ${
                onRowClick ? "cursor-pointer hover:bg-paper-rule/30" : ""
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.header}
                  className={`px-5 py-3 sm:px-6 ${col.hideOnMobile ? "hidden sm:table-cell" : ""} ${col.className ?? ""}`}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
