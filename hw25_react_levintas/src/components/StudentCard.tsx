import ViewButton from './ViewButton';

type StudentCardProps = {
  firstName: string;
  lastName: string;
  age: number;
  credits: number;
};

function StudentCard() {
  return (
    <div>
      <p>Name: Alina</p>
      <p>Last Name: Levintas</p>
      <p>Age: 33</p>
      <p>Credits: 15</p>
      <ViewButton />
    </div>
  );
}

export default StudentCard;
