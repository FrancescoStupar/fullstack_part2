import React from 'react'

const Header = (props) => {
	console.log("WAWAWEWWAA")
	console.log(props.name)
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
  
  const Content = ({parts, key}) => {
	console.log(parts)
	console.log(" luuuuummahiaaaa")
	return (
	  <>
	 
	  {parts.map(part => 
			 <li><Part name={part.name} exercises={part.exercises} /></li>
		  )}
	  
	  </>
	)
  }
  
  const Total = ({ parts }) =>{
	  
	const anto = parts.reduce((a, v)=> {
		return(a + v.exercises)}, 0)
	return(
	<h3>
	number of exercises: {anto}
	</h3>
	)
  }
  
  const Course = ({ course }) => {
	console.log(course)
	console.log(" ahiaaaa")
	return(
	  <>
	  <ul>
	  {course.map(ciao =>
			<div key={ciao.id} >
			<Header name={ciao.name} />
			<Content parts={ciao.parts}/>
			<Total parts={ciao.parts}/>
			</div>
		  )}
	  </ul>
	  </>
	)
  }

  export default Course
