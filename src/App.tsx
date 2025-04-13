import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import QuizPage from "./pages/quiz/QuizPage";


function App() {
  return (
    <div className="p-4">
     <Routes>
      <Route path="/" element={ <Homepage />}/>
      <Route path="/quizpage" element={<QuizPage/>}/>
     </Routes>
    </div>
  );
}
export default App;