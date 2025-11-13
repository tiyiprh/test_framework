import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppNavigation } from './Navigation'
import HomePage from './pages/HomePage'
import DashboardDemo from './pages/DashboardDemo'
import TableDemo from './pages/TableDemo'
import FormDemo from './pages/FormDemo'
import DetailsDemo from './pages/DetailsDemo'
import ProvidersList from './pages/ProvidersList'
import ProviderDetails from './pages/ProviderDetails'
import ProviderWizard from './pages/ProviderWizard'
import AuditLog from './pages/AuditLog'
import SampleTable from './pages/SampleTable'
import '@patternfly/react-core/dist/styles/base.css'

function App() {
  return (
    <Router>
      <AppNavigation>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/providers" element={<ProvidersList />} />
          <Route path="/providers/new" element={<ProviderWizard />} />
          <Route path="/providers/:id" element={<ProviderDetails />} />
          <Route path="/audit-log" element={<AuditLog />} />
          <Route path="/sample-table" element={<SampleTable />} />
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
