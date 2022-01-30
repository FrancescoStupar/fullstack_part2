import React from 'react'

const Header = (props) => {
  return(
  <>
  <h1>{props.name}</h1>
  </>
  )
}

const Part = (props) => {
  return(
    <>
    <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
    <li>
      <Part name = {props.name} exercises={props.exercises}/>
    </li>
    </>
  )
}

const Total = ({parts}) =>{
    
  const anto = parts.reduce((a, v)=> {
      return(a + v.exercises)}, 0)
  return(
  <h3>
  number of exercises: {anto}
  </h3>
  )
}

const Course = (props) => {
  return(
    <>
    <Header name={props.course.name} />
    <ul>
        {props.course.parts.map(parts => 
          <Content key={parts.id}  name={parts.name} exercises={parts.exercises} />
        )}
  
    <Total parts={props.course.parts}/>
    </ul>
    </>
  )
}

const App = () => {
    const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Seo of a component',
          exercises: 0,
          id: 4
        }
      ]
  }
  return <Course course={course} />
  /*return (
    <>
      <Header course = {course}/>
      <Content course= {course}/>
      <Total course = {course}/>
    </>
  )*/
}

export default App
