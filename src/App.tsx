import { useRoutes } from 'react-router-dom'
import './App.css'
import { routes } from './routes'

function App() {
  const routerElements = useRoutes(routes)
  return (
    <>
      {routerElements}
    </>
  )
}

export default App
