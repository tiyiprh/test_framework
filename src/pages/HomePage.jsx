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
          Authentication Provider Management
        </Title>
        <p>
          Manage external authentication providers, configure single sign-on, and track
          authentication events across your organization.
        </p>
      </PageSection>

      <PageSection>
        <Gallery hasGutter minWidths={{ default: '300px' }}>
          <Card isRounded>
            <CardTitle>Key Features</CardTitle>
            <CardBody>
              <List>
                <ListItem>
                  <strong>Multi-Step Provider Setup:</strong> Guided wizard for configuring Azure AD, Google, GitHub, and SAML
                </ListItem>
                <ListItem>
                  <strong>Permission Management:</strong> Assign users and teams to specific providers
                </ListItem>
                <ListItem>
                  <strong>Usage Analytics:</strong> Track login statistics and success rates
                </ListItem>
                <ListItem>
                  <strong>Audit Logging:</strong> Monitor all authentication events and configuration changes
                </ListItem>
              </List>
            </CardBody>
          </Card>

          <Card isRounded>
            <CardTitle>Quick Links</CardTitle>
            <CardBody>
              <List>
                <ListItem>
                  <a href="/providers" style={{ textDecoration: 'none' }}>
                    View Authentication Providers
                  </a>
                </ListItem>
                <ListItem>
                  <a href="/providers/new" style={{ textDecoration: 'none' }}>
                    Add New Provider
                  </a>
                </ListItem>
                <ListItem>
                  <a href="/audit-log" style={{ textDecoration: 'none' }}>
                    View Audit Log
                  </a>
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
                    href="https://ansible.github.io/ansible-ui/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ansible UI Framework Documentation
                  </a>
                </ListItem>
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
              </List>
            </CardBody>
          </Card>
        </Gallery>
      </PageSection>
    </>
  )
}

export default HomePage
