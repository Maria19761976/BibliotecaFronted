import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)] text-slate-800">
            <Navbar />
            <main className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}


