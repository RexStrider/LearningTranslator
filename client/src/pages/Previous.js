import React from "react";
import { useTable } from "react-table";

function MyTable({ columns, data }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map(
          (row, i) =>
            prepareRow(row) || (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
}

export default props => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          }
        ]
      }
    ],
    []
  );

  const data = [
    {
      firstName: "Tanner",
      lastName: "Linsley"
    },
    {
      firstName: "Shawn",
      lastName: "Wang"
    },
    {
      firstName: "Kent C.",
      lastName: "Dodds"
    },
    {
      firstName: "Ryan",
      lastName: "Florence"
    }
  ];

  return <MyTable columns={columns} data={data} />;
};
