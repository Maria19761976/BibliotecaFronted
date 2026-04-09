import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthorList from "./pages/authors/AuthorList";
import AuthorForm from "./pages/authors/AuthorForm";
import BookList from "./pages/books/BookList";
import BookForm from "./pages/books/BookForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/authors/new" element={<AuthorForm />} />
        <Route path="/authors/edit/:id" element={<AuthorForm />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/edit/:id" element={<BookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;