import classes from './AnimatedTitle.module.css'

export default function AnimatedTitle({ titleText }) {
  return (
    <h1
      className={`mb-12 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-center text-6xl font-black text-transparent ${classes.animatedTitle}`}
    >
      {titleText}
    </h1>
  )
}
