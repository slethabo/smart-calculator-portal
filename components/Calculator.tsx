"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNum = (val: string) => {
    setDisplay((prev) => (prev === "0" ? val : prev + val));
  };

  const handleOp = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const fullExpr = equation + display;
      const res = eval(fullExpr);
      setDisplay(String(res));
      setEquation("");
    } catch {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 border border-slate-100">
      <div className="mb-4 text-right bg-slate-900 text-white p-4 rounded-xl">
        <div className="text-xs text-slate-400 h-4">{equation}</div>
        <div className="text-3xl font-mono tracking-wider truncate">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-2 bg-rose-100 text-rose-600 p-3 rounded-lg font-semibold hover:bg-rose-200">AC</button>
        <button onClick={() => handleOp("/")} className="bg-slate-100 p-3 rounded-lg font-semibold hover:bg-slate-200">/</button>
        <button onClick={() => handleOp("*")} className="bg-slate-100 p-3 rounded-lg font-semibold hover:bg-slate-200">*</button>

        {["7", "8", "9"].map((n) => <button key={n} onClick={() => handleNum(n)} className="bg-slate-50 p-3 rounded-lg font-semibold hover:bg-slate-100">{n}</button>)}
        <button onClick={() => handleOp("-")} className="bg-slate-100 p-3 rounded-lg font-semibold hover:bg-slate-200">-</button>

        {["4", "5", "6"].map((n) => <button key={n} onClick={() => handleNum(n)} className="bg-slate-50 p-3 rounded-lg font-semibold hover:bg-slate-100">{n}</button>)}
        <button onClick={() => handleOp("+")} className="bg-slate-100 p-3 rounded-lg font-semibold hover:bg-slate-200">+</button>

        {["1", "2", "3"].map((n) => <button key={n} onClick={() => handleNum(n)} className="bg-slate-50 p-3 rounded-lg font-semibold hover:bg-slate-100">{n}</button>)}
        <button onClick={calculate} className="row-span-2 bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center">=</button>

        <button onClick={() => handleNum("0")} className="col-span-2 bg-slate-50 p-3 rounded-lg font-semibold hover:bg-slate-100">0</button>
        <button onClick={() => handleNum(".")} className="bg-slate-50 p-3 rounded-lg font-semibold hover:bg-slate-100">.</button>
      </div>
    </div>
  );
}
