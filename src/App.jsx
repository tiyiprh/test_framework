import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppNavigation } from './Navigation'
import HomePage from './pages/HomePage'
import DashboardDemo from './pages/DashboardDemo'
import TableDemo from './pages/TableDemo'
import FormDemo from './pages/FormDemo'
import DetailsDemo from './pages/DetailsDemo'
import '@patternfly/react-core/dist/styles/base.css'

const basename = import.meta.env.BASE_URL

function App() {
  return (
    <Router basename={basename}>
      <AppNavigation>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardDemo />} />
          <Route path="/table-demo" element={<TableDemo />} />
          <Route path="/form-demo" element={<FormDemo />} />
          <Route path="/details-demo" element={<DetailsDemo />} />
        </Routes>
      </AppNavigation>
    </Router>
  )
}

export default App
