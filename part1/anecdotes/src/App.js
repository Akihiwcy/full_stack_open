import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const pickRandom = () => {
    const pick = Math.floor((Math.random() * anecdotes.length))
    setSelected(pick)
  }

  const plusHelper =(idx, votes) => {
    const copy = [...votes]
    copy[idx] += 1
    return () => {
      setVotes(copy)
    }
  }

  const maxVote = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVote)
  console.log(maxIndex)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={plusHelper(selected, votes)} text='vote'/>
      <Button handleClick={pickRandom} text='next anecdote' />

      <h1>Anecdote with the most vote</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {votes[maxIndex]} votes</p>
    </div>
  )
}

export default App