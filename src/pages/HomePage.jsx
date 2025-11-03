import {
  Card,
  CardBody,
  CardTitle,
  Gallery,
  PageSection,
  Title,
  List,
  ListItem,
} from '@patternfly/react-core'

function HomePage() {
  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">
          Welcome to Ansible UI Framework Prototyping
        </Title>
        <p>
          This environment is set up for UX designers to prototype and experiment with
          Ansible UI Framework components. Each demo page showcases different patterns
          and components available in the framework.
        </p>
      </PageSection>

      <PageSection>
        <Gallery hasGutter minWidths={{ default: '300px' }}>
          <Card isRounded>
            <CardTitle>Getting Started</CardTitle>
            <CardBody>
              <List>
                <ListItem>Navigate using the sidebar menu</ListItem>
                <ListItem>Explore different component demos</ListItem>
                <ListItem>Copy and modify existing pages</ListItem>
                <ListItem>Create new prototype pages in src/pages/</ListItem>
              </List>
            </CardBody>
          </Card>

          <Card isRounded>
            <CardTitle>Available Demos</CardTitle>
            <CardBody>
              <List>
                <ListItem>
                  <strong>Dashboard:</strong> Comprehensive dashboard with charts, stats, alerts, and more
                </ListItem>
                <ListItem>
                  <strong>Table Demo:</strong> Data tables with sorting and pagination
                </ListItem>
                <ListItem>
                  <strong>Form Demo:</strong> Form inputs and validation patterns
                </ListItem>
                <ListItem>
                  <strong>Details Demo:</strong> Resource details and information display
                </ListItem>
              </List>
            </CardBody>
          </Card>

          <Card isRounded>
            <CardTitle>Resources</CardTitle>
            <CardBody>
              <List>
                <ListItem>
                  <a
                    href="https://www.patternfly.org/components/all-components"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PatternFly Components
                  </a>
                </ListItem>
                <ListItem>
                  <a
                    href="https://www.patternfly.org/patterns/about-patterns"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PatternFly Patterns
                  </a>
                </ListItem>
                <ListItem>See README.md for detailed instructions</ListItem>
              </List>
            </CardBody>
          </Card>
        </Gallery>
      </PageSection>
    </>
  )
}

export default HomePage
