import { useRoutes } from 'react-router-dom'
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
