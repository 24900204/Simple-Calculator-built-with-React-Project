import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [memory, setMemory] = useState(0);

  const appendNumber = (value) => {
    if (display === "0" || display === "Error") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const appendDecimal = () => {
    if (display === "Error") {
      setDisplay("0.");
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const chooseOperator = (operator) => {
    if (display === "Error") return;
    setExpression(`${display} ${operator}`);
    setDisplay("0");
  };

  const calculate = () => {
    if (!expression || display === "Error") return;

    const match = expression.match(/^(-?\d*\.?\d+)\s([+\-×÷])$/);
    if (!match) return;

    const first = Number(match[1]);
    const second = Number(display);
    let result;

    switch (match[2]) {
      case "+": result = first + second; break;
      case "-": result = first - second; break;
      case "×": result = first * second; break;
      case "÷":
        if (second === 0) {
          setExpression("");
          setDisplay("Error");
          return;
        }
        result = first / second;
        break;
      default: return;
    }

    const rounded = Number(result.toPrecision(12));
    setDisplay(String(rounded));
    setExpression("");
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
  };

  const backspace = () => {
    if (display === "Error" || display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const percent = () => {
    if (display !== "Error") {
      setDisplay(String(Number(display) / 100));
    }
  };

  const toggleSign = () => {
    if (display !== "0" && display !== "Error") {
      setDisplay(String(Number(display) * -1));
    }
  };

  const memoryClear = () => setMemory(0);
  const memoryRecall = () => setDisplay(String(memory));
  const memoryAdd = () => setMemory(memory + (Number(display) || 0));
  const memorySubtract = () => setMemory(memory - (Number(display) || 0));

  const press = (key) => {
    if (/^\d$/.test(key)) appendNumber(key);
    else if (key === ".") appendDecimal();
    else if (["+", "-", "×", "÷"].includes(key)) chooseOperator(key);
    else if (key === "=") calculate();
    else if (key === "C") clear();
    else if (key === "⌫") backspace();
    else if (key === "%") percent();
    else if (key === "±") toggleSign();
  };

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">+</div>
          <div>
            <span>REACT</span>
            <strong>CALCULATOR</strong>
          </div>
        </div>
        <div className="experiment-tag">EX.04 • SIMPLE CALCULATOR</div>
      </header>

      <main className="content">
        <section className="intro">
          <p className="eyebrow">REACT PROJECT</p>
          <h1>Simple Calculator</h1>
          <p className="intro-text">
            A clean and responsive calculator built with React. Perform
            basic arithmetic operations with an easy-to-use interface.
          </p>
          <div className="feature-list">
            <span>✓ Addition</span>
            <span>✓ Subtraction</span>
            <span>✓ Multiplication</span>
            <span>✓ Division</span>
            <span>✓ Percentage</span>
          </div>
        </section>

        <section className="calculator" aria-label="Calculator">
          <div className="display-panel">
            <div className="expression">{expression || " "}</div>
            <div className="display" aria-live="polite">{display}</div>
          </div>

          <div className="memory-row">
            <button onClick={memoryClear}>MC</button>
            <button onClick={memoryRecall}>MR</button>
            <button onClick={memoryAdd}>M+</button>
            <button onClick={memorySubtract}>M−</button>
          </div>

          <div className="keys">
            <button className="utility" onClick={() => press("C")}>AC</button>
            <button className="utility" onClick={() => press("⌫")}>⌫</button>
            <button className="utility" onClick={() => press("%")}>%</button>
            <button className="operator" onClick={() => press("÷")}>÷</button>

            <button onClick={() => press("7")}>7</button>
            <button onClick={() => press("8")}>8</button>
            <button onClick={() => press("9")}>9</button>
            <button className="operator" onClick={() => press("×")}>×</button>

            <button onClick={() => press("4")}>4</button>
            <button onClick={() => press("5")}>5</button>
            <button onClick={() => press("6")}>6</button>
            <button className="operator" onClick={() => press("-")}>−</button>

            <button onClick={() => press("1")}>1</button>
            <button onClick={() => press("2")}>2</button>
            <button onClick={() => press("3")}>3</button>
            <button className="operator" onClick={() => press("+")}>+</button>

            <button className="wide" onClick={() => press("0")}>0</button>
            <button onClick={() => press(".")}>.</button>
            <button className="equals" onClick={() => press("=")}>=</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>Ex.04 — Simple Calculator built with React</strong>
          <span>Responsive calculator using React state and event handling.</span>
        </div>
        <div className="student-details">
          <span><b>Name:</b> Rithika L</span>
          <span><b>Register Number:</b> 212224230231</span>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Calculator />);
