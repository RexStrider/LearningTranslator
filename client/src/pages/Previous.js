import React from "react";
import { search } from "../Components/yuuvisPost";
import { Link } from "react-router-dom";
function MyTable({ data }) {
  return (
    <table>
      <colgroup>
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
      </colgroup>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>CreatedAt</th>
          <th>Original Lang</th>
          <th>Target Lang</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>
              <Link to="/">{row["enaio:objectId"].value}</Link>
            </td>
            <td>{row.Name.value}</td>
            <td>{row["enaio:creationDate"].value}</td>
            <td>{row["enaio:lastModificationDate"].value}</td>
            <td>{row.Name.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default props => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    search()
      .then(res => res.json())
      .then(a => setData(a.objects.map(e => e.properties)))
      .catch(console.error);
  }, []);
  console.log(data);
  return <MyTable data={data} />;
};
