import "./App.css";
import Component1 from "./components/RxJS/Component1";
import Component2 from "./components/RxJS/Component2";
import Tak from "./pages/Tak/Tak";
import { Provider } from "react-redux";
import { TakStore } from "./redux/store";
import ComponentRedux1 from "./components/Redux/ComponentRedux1";
import ComponentRedux2 from "./pages/Tak/Components/ComponentRedux2";

function App() {
  return (
    <div className="App">
      <Provider store={TakStore}>
        <h2>RxJS</h2>
        <Component1 />
        <Component2 />
        <h2>Context</h2>
        <Tak />
        <h2>Redux</h2>
        <ComponentRedux1 />
        <ComponentRedux2 />
      </Provider>
    </div>
  );
}

export default App;
