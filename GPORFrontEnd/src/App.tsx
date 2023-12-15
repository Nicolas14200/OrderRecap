import {DropZone} from "./components/DropZone";
import { OpenXlsFile } from "./components/OpenXlsFile";

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
    <h1>RECAP</h1>
      <OpenXlsFile />
      <DropZone />

    </div>
  );
}

export default App;
