import { useState } from "react";

const Header = ({ header }) => <h1>{header}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
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

  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = good / all;

  let statistic = <p>no</p>;
  if (all === 0) {
    statistic = <p>No feedback given</p>;
  } else {
    statistic = (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="avg" value={avg} />
          <StatisticLine text="positive" value={positive + " %"} />
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <Header header="give feedback" />
      <Button handleClick={plus(setGood, good)} text="good" />
      <Button handleClick={plus(setNeutral, neutral)} text="neutral" />
      <Button handleClick={plus(setBad, bad)} text="bad" />
      <Header header="statistics" />
      {statistic}
    </div>
  );
};

export default App;
