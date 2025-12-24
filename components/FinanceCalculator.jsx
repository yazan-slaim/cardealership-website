'use client'
import { useState,useEffect } from "react";
export default function FinanceCalculator ({price}){
const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(5);
  const [months, setMonths] = useState(36);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const payment =
      (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    setMonthlyPayment(payment > 0 ? payment.toFixed(2) : 0);
  }, [downPayment, interestRate, months, price]);

  return (
    <div style={{ padding: "80px 20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Finance Calculator
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <label>
          Down Payment:
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              background: "black",
              color: "white",
              border: "1px solid white",
            }}
          />
        </label>

        <label>
          Interest Rate (%):
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              background: "black",
              color: "white",
              border: "1px solid white",
            }}
          />
        </label>

        <label>
          Term (Months):
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              background: "black",
              color: "white",
              border: "1px solid white",
            }}
          />
        </label>

        <p style={{ marginTop: "20px", fontSize: "20px" }}>
          Estimated Monthly Payment:
        </p>
        <p style={{ fontSize: "26px", color: "white" }}>
          JOD {monthlyPayment}
        </p>
      </div>
    </div>
  );
};
