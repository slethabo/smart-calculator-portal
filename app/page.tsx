"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import Calculator from "@/components/Calculator";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading Portal...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg text-slate-800">SecurePortal <span className="text-indigo-600">App</span></h1>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:inline">{user.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        {!user ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-500 mb-6 text-sm">Sign in with your Google account to access your authenticated portal.</p>
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800">User Dashboard</h2>
              <p className="text-slate-500 text-sm">Authorized session active. Use your calculator utility below.</p>
            </div>
            <Calculator />
          </div>
        )}
      </div>
    </main>
  );
}
