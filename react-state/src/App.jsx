import "./App.css";
import Component1 from "./components/RxJS/Component1";
import Component2 from "./components/RxJS/Component2";
import Tak from "./pages/Tak/Tak";

function App() {
  return (
    <div className="App">
      <h2>RxJS</h2>
      <Component1 />
      <Component2 />
      <h2>Context</h2>
      <Tak />
    </div>
  );
}

export default App;
