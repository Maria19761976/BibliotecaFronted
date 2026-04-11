import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/global.css";
import AuthorList from "./pages/authors/AuthorList";
import AuthorForm from "./pages/authors/AuthorForm";
import BookList from "./pages/books/BookList";
import BookForm from "./pages/books/BookForm";
import Layout from "./components/Layout";

function NotFoundPage() {
    return (
        <section className="mx-auto flex min-h-[55vh] max-w-3xl items-center justify-center py-10">
            <div className="w-full rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-sm sm:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Error 404</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Pagina no encontrada
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                    La ruta que has intentado abrir no existe o ya no esta disponible. Puedes volver al inicio
                    o continuar desde una de las secciones principales.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
                    >
                        Ir al inicio
                    </Link>
                    <Link
                        to="/authors"
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                    >
                        Ver autores
                    </Link>
                </div>
            </div>
        </section>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/authors" element={<AuthorList />} />
                    <Route path="/authors/new" element={<AuthorForm />} />
                    <Route path="/authors/edit/:id" element={<AuthorForm />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/books/new" element={<BookForm />} />
                    <Route path="/books/edit/:id" element={<BookForm />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
