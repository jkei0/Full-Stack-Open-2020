import React from 'react'

const Course = (props) => {
  return (
    <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part =>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
    </div>
  )
}

const Total = (props) => {

  let total = props.parts.reduce((s,p) =>  {
    return (
      s+p.exercises
  )},0)

  return (
    <h4>total of {total} exercises</h4>
  )
}

export default Course
