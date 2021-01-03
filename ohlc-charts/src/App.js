import Chart from "./Components/Chart";
import Esper from "./Components/Esper";

function App() {
  return (
    <div>
      <Chart />
      {/* <Esper /> */}
    </div>
  );
}

export default App;

// useEffect(() => {
//   fetch("http://kaboom.rksv.net/api/historical?interval=1")
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// }, []);
