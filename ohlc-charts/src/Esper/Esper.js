import React, { useEffect, useState } from "react";

export default function Esper() {
  const [groupCount, setGroupCount] = useState(0);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(
      "https://kquik-api.esper.cloud/api/enterprise/9fad3e41-3fd5-4344-8c31-bf297f0c9bfa/devicegroup/",
      {
        headers: {
          authorization: "Token eb7c9ebc644db45452f0f0429a1f7ce5cfa9a59e",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setGroupCount(data.count);
        setGroups(data.results);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <div>Dashboard</div>
    </div>
  );
}
