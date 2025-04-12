import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import QuestionPage from "./pages/QuestionPage";


function App() {
  return (
    <div className="p-4">
     <Routes>
      <Route path="/" element={ <Homepage />}/>
      <Route path="/questionPage" element={<QuestionPage/>}/>
     </Routes>
    </div>
  );
}
export default App;