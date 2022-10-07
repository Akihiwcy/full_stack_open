import { useState } from "react";

const Header = ({ header }) => <h1>{header}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ feedback, count }) => (
  <p>
    {feedback} {count}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const plus = (setFunc, value) => {
    const handler = () => setFunc(value + 1);
    return handler;
  };

  return (
    <div>
      <Header header="give feedback" />
      <Button handleClick={plus(setGood, good)} text="good" />
      <Button handleClick={plus(setNeutral, neutral)} text="neutral" />
      <Button handleClick={plus(setBad, bad)} text="bad" />
      <Header header="statistics" />
      <Statistic feedback="good" count={good} />
      <Statistic feedback="neutral" count={neutral} />
      <Statistic feedback="bad" count={bad} />
    </div>
  );
};

export default App;
