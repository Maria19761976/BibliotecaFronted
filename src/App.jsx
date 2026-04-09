import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorList from "./pages/authors/AuthorList";
import AuthorForm from "./pages/authors/AuthorForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/authors/new" element={<AuthorForm />} />
        <Route path="/authors/edit/:id" element={<AuthorForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;