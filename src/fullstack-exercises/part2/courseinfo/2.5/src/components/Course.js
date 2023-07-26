import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Part = (props) => (
  <p>
    {" "}
    {props.partName} - {props.exercises}{" "}
  </p>
);

const TotalExercises = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return <b>total of {total} exercises</b>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} partName={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <TotalExercises parts={course.parts} />
    </div>
  );
};

export default Course