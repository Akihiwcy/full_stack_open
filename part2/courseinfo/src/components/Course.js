const Header = ({ header }) => <h1>{header}</h1>

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Contend = ({ content }) => {
  return (
    <>
      {content.map(part => 
        <Part key={part.id} part={part}/>
      )}
    </>
      
  )
}

const Total = ({parts}) => {
  // console.log(parts);
  let total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );

  for (let i in parts) {
    console.log(parts[i])
    total += parts[i].exercises;
  }

  return (
  <div>
    <p>
      <b>
        total of {total} exercises
      </b>
    </p>
  </div>
  )
}
  


const Course = ({ course }) => {
  // console.log(course);
  return (
    <>
      <Header header={course.name} />
      <Contend content={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course