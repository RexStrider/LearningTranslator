import React from "react";
import { getDoc } from "../Components/yuuvisPost";
import { search } from "../Components/yuuvisPost";
// import { Link } from "react-router-dom";
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
          <th>Last Modified</th>
          <th>Original Lang</th>
          <th>Target Lang</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>
              <button onClick={() => getDoc(row["enaio:objectId"].value)}>
                {row["enaio:objectId"].value}
              </button>
              {/* <Link to="/">{row["enaio:objectId"].value}</Link> */}
            </td>
            <td>
              {row.Name
                ? row.Name.value
                : row["ten5d1ba6a5f761b9031cf3276f:name"].value}
            </td>
            <td>
              {row["enaio:lastModificationDate"] &&
                row["enaio:lastModificationDate"].value}
            </td>
            <td>
              {row["ten5d1ba6a5f761b9031cf3276f:originalLang"] &&
                row["ten5d1ba6a5f761b9031cf3276f:originalLang"].value}
            </td>
            <td>
              {row["ten5d1ba6a5f761b9031cf3276f:targetLang"] &&
                row["ten5d1ba6a5f761b9031cf3276f:targetLang"].value}
            </td>
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
