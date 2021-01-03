import React, { useEffect } from "react";

export default function Esper() {
  useEffect(() => {
    fetch(
      "https://foo-api.esper.cloud/api/enterprise/9fad3e41-3fd5-4344-8c31-bf297f0c9bfa/devicegroup/",
      {
        headers: {
          method: "GET",
          Authorization: "9fad3e41-3fd5-4344-8c31-bf297f0c9bfa",
          "Content-Type": "application/json",
          origin: "https://kquik.esper.cloud",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });

  return (
    <div>
      <div> </div>
    </div>
  );
}
