import { useState } from "react";
import "./App.css";

function App() {
  const [teachers, setTeachers] = useState([
    { name: "Mohamed", age: 26 },
    { name: "Yassin", age: 30 },
  ]);

  const removeTeacher = () => {
    setTeachers(teachers.filter((teacher) => teacher.name === "Mohamed"));
  };

  return (
    <div className="app">
      {teachers.map((teacher, index) => (
        <div key={index}>
          <h1>{teacher.name}</h1>
          <h2>{teacher.age}</h2>
        </div>
      ))}
      <button onClick={removeTeacher}>Remove teacher</button>
    </div>
  );
}

export default App;
