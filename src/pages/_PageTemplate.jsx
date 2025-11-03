import { PageLayout, PageHeader } from '@ansible/ansible-ui-framework'
import {
  Card,
  CardBody,
  Button,
  Title,
} from '@patternfly/react-core'

/**
 * Template Page
 *
 * Copy this file to create a new prototype page:
 * 1. Copy: cp src/pages/_PageTemplate.jsx src/pages/YourPageName.jsx
 * 2. Rename the function below to match your page name
 * 3. Update the PageHeader title and description
 * 4. Add your content inside the PageLayout
 * 5. Add the page to Navigation.jsx and App.jsx
 */

function PageTemplate() {
  return (
    <PageLayout>
      {/* Page Header - Update this with your page title */}
      <PageHeader
        title="Your Page Title"
        description="Brief description of what this page demonstrates"
      />

      {/* Main Content - Add your prototype content here */}
      <Card>
        <CardBody>
          <Title headingLevel="h2" size="xl">
            Start Building Your Prototype
          </Title>
          <p style={{ marginTop: '16px' }}>
            This is a template page. Replace this content with your own components.
          </p>

          {/* Example: Add a button */}
          <div style={{ marginTop: '24px' }}>
            <Button variant="primary">Example Button</Button>
          </div>

          {/* Tips */}
          <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <strong>Quick Tips:</strong>
            <ul>
              <li>Import components from @patternfly/react-core or @ansible/ansible-ui-framework</li>
              <li>Check out the existing demo pages for examples</li>
              <li>Visit <a href="https://www.patternfly.org" target="_blank" rel="noopener noreferrer">patternfly.org</a> for component documentation</li>
              <li>Changes you make will automatically reload in the browser</li>
            </ul>
          </div>
        </CardBody>
      </Card>

      {/* Add more Cards, Forms, Tables, etc. below */}

    </PageLayout>
  )
}

export default PageTemplate
