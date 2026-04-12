import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] text-slate-800">
            <Navbar />
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-14 pt-6 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}
