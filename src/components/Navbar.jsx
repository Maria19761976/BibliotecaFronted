import { NavLink } from "react-router-dom";

function Navbar() {
    const linkClassName = ({ isActive }) =>
        [
            "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all",
            "border shadow-sm",
            isActive
                ? "border-emerald-700 bg-emerald-700 text-white shadow-emerald-900/10"
                : "border-slate-200/90 bg-white/90 text-slate-700 hover:border-emerald-700 hover:bg-emerald-700 hover:text-white",
        ].join(" ");

    return (
        <header className="px-4 pt-4 sm:px-6 lg:px-8">
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                <NavLink to="/" className="inline-flex items-center gap-3 self-start">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-800 text-lg font-semibold text-white shadow-lg shadow-emerald-950/15">
                        B
                    </span>
                    <div className="leading-tight">
                        <p className="text-lg font-semibold tracking-tight text-slate-900">Biblioteca</p>
                        <p className="text-sm text-slate-500">Libros y autores al día</p>
                    </div>
                </NavLink>

                <div className="flex flex-wrap gap-3">
                    <NavLink to="/authors" className={linkClassName}>
                        Autores
                    </NavLink>
                    <NavLink to="/books" className={linkClassName}>
                        Libros
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
