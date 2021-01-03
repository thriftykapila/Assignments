import React, { useEffect, useState } from "react";
import "./Esper.css";

export default function Esper() {
  const [groupCount, setGroupCount] = useState(0);
  const [groups, setGroups] = useState([]);
  const [details, setDetails] = useState({});
  const [initials, setInitials] = useState("");
  const [showGroup, setShowGroup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        setGroupCount(data.count);
        setGroups(data.results);
        console.log(data);
      })
      .catch(console.error());
    fetch(
      "https://kquik-api.esper.cloud/api/enterprise/9fad3e41-3fd5-4344-8c31-bf297f0c9bfa/",
      {
        headers: {
          authorization: "Token eb7c9ebc644db45452f0f0429a1f7ce5cfa9a59e",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDetails(data.details);
        let shortName =
          data.details.registered_name.split(" ")[0][0] +
          data.details.registered_name.split(" ")[1][0];
        setInitials(shortName);
        console.log(data);
      })
      .catch(console.error());
  }, []);

  if (loading) {
    return <div style={{ margin: "50vh 0 0 50vw" }}>Loading...</div>;
  }

  return (
    <div>
      <div className="grid-container">
        <header className="header">
          <div className="header__search">
            Welcome Back, {details.registered_name}
          </div>
          <div className="header__avatar">
            <i className="far fa-address-book"></i> {initials}
          </div>
        </header>
        <aside className="sidenav">
          <ul className="sidenav__list">
            <li
              className="sidenav__list-item"
              onClick={() => setShowGroup(false)}
            >
              <i className="fa fa-home"></i> Home
            </li>
            <li
              className="sidenav__list-item"
              onClick={() => setShowGroup(true)}
            >
              <i className="fas fa-mobile-alt"></i> Device Groups
            </li>
            <li className="sidenav__list-item">
              <i className="fas fa-power-off"></i> Logout
            </li>
          </ul>
        </aside>
        <main className="main">
          {showGroup ? (
            <div>Groups Details</div>
          ) : (
            <div className="main-cards">
              <div>
                <div className="card">
                  Device Groups
                  <div className="details-card">
                    Total Group Count - {groupCount}
                  </div>
                  <button
                    className="details-btn"
                    onClick={() => setShowGroup(true)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="card">Reports</div>
              <div className="card">
                User Details
                <div className="details-card">
                  Name - {details.registered_name}
                </div>
                <div className="details-card">
                  Email - {details.contact_email}
                </div>
                <div className="details-card">
                  Contact Number - {details.contact_number}
                </div>
                <div className="details-card">
                  Location - {details.location}
                </div>
              </div>
            </div>
          )}
        </main>
        <footer className="footer">
          <div className="footer__copyright">&copy; 2021 Esper</div>
          <div className="footer__signature">
            Made with love by Thrifty Kapila
          </div>
        </footer>
      </div>
    </div>
  );
}
