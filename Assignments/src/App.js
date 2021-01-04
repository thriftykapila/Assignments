import Esper from "./Esper/Esper";

function App() {
  return (
    <div>
      <Esper />
    </div>
  );
}

export default App;

// useEffect(() => {
//   fetch("http://kaboom.rksv.net/api/historical?interval=1")
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// }, []);
