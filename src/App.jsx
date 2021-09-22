import { useState } from "react";
import {
  findIfPalindrome,
  findNextPalindrome,
  findPrevPalindrome,
  nextOutput,
  noOutput,
  palindromeOutput,
  previousOutput,
} from "./helpers";

function App() {
  const [dob, setDob] = useState("");
  const [output, setOutput] = useState("Nothing to see here...");

  const checkPalindrome = () => {
    if (!dob) {
      setOutput(noOutput());
      return;
    }

    const isPalindrome = findIfPalindrome(dob);

    if (isPalindrome) {
      setOutput(palindromeOutput());
      return;
    }

    const [nextDate, nextDayCount] = findNextPalindrome(dob);
    const [prevDate, prevDayCount] = findPrevPalindrome(dob);

    if (prevDayCount >= nextDayCount) {
      setOutput(nextOutput(nextDayCount, nextDate));
      return;
    }

    if (nextDayCount > prevDayCount) {
      setOutput(previousOutput(prevDayCount, prevDate));
      return;
    }
  };

  return (
    <main>
      <h1>Palindrome Birthday!</h1>
      <div className="form-group">
        <label htmlFor="dob">Enter your birthday date:</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <button className="btn" onClick={checkPalindrome}>
        Show
      </button>

      <div className="output">{output}</div>
    </main>
  );
}

export default App;
