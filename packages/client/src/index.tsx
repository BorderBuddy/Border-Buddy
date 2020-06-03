import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.scss'

const App = () => {
  return <h1 className={styles.title}>Hello Webpack!</h1>
}
ReactDOM.render(<App />, document.getElementById('root'))
