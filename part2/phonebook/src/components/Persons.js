const Person = ({person, deleteHandler}) => (
  <li key = {person.name}>
    {person.name} {person.number}&nbsp;
    <button onClick={deleteHandler}>delete</button>
  </li>
)

const Persons = ({ persons, deletePerson }) => (
  <ul>
    {persons.map((person) => (
      <Person key={person.id} person={person} deleteHandler={() => deletePerson(person.name, person.id)} />
    ))}
  </ul>
);

export default Persons;
