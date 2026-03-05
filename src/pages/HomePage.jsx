import {
  Card,
  CardBody,
  CardTitle,
  Gallery,
  PageSection,
  Title,
  List,
  ListItem,
  Content,
  Flex,
  FlexItem,
  Button,
} from '@patternfly/react-core'
import { ExternalLinkAltIcon } from '@patternfly/react-icons'

function HomePage() {
  return (
    <>
      <PageSection>
        <Card isRounded style={{ backgroundColor: '#0066cc', color: 'white' }}>
          <CardBody style={{ padding: '24px' }}>
            <Title
              headingLevel="h1"
              size="2xl"
              style={{ color: '#fff', marginBottom: '12px' }}
            >
              Ansible UX Prototype: Project Name
            </Title>
            <Content
              component="p"
              style={{
                color: '#ffffff',
                fontSize: '16px',
                marginBottom: '16px',
                maxWidth: '1500px',
              }}
            >
              This environment demonstrates Ansible UI Framework components and
              patterns for UX prototyping. Use the navigation on the left to
              explore the different screens.
            </Content>
            <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsCenter' }}>
              <FlexItem>
                <span style={{ color: '#ffffff', fontSize: '14px' }}>
                  Related Jira:
                </span>
              </FlexItem>
              <FlexItem>
                <Button
                  variant="link"
                  component="a"
                  href="https://issues.redhat.com/browse/AAP"
                  target="_blank"
                  icon={
                    <ExternalLinkAltIcon style={{ color: '#ffffff' }} />
                  }
                  iconPosition="end"
                  style={{ color: '#ffffff', padding: 0 }}
                >
                  AAP-XXXX
                </Button>
              </FlexItem>
            </Flex>
          </CardBody>
        </Card>
      </PageSection>

      <PageSection>
        <Card
          isPlain
          style={{
            border: '1px dashed #8a8d90',
            borderRadius: '8px',
            backgroundColor: '#f0f0f0',
            marginBottom: '32px',
          }}
        >
          <CardBody>
            <Title headingLevel="h3" size="md" style={{ marginBottom: '12px' }}>
              Important notes
            </Title>
            <List>
              <ListItem>
                This is just to show the intended experience of framework
                components and patterns.
              </ListItem>
              <ListItem>
                There are some limitations to the prototype and mock data is
                used.
              </ListItem>
              <ListItem>
                Once implementation begins, the UI framework has pre-baked
                functionality (styling, padding, etc.) so it may look slightly
                different than the prototype, but the functionality should
                remain the same as shown here.
              </ListItem>
            </List>
          </CardBody>
        </Card>

        <Gallery hasGutter minWidths={{ default: '300px' }}>
          <Card isRounded>
            <CardTitle>Available screens</CardTitle>
            <CardBody>
              <List>
                <ListItem>
                  <strong>Dashboard:</strong> Comprehensive dashboard with
                  charts, stats, alerts, and more.
                </ListItem>
                <ListItem>
                  <strong>Table Demo:</strong> Data tables with toolbar filters,
                  search, sorting, and row actions.
                </ListItem>
                <ListItem>
                  <strong>Form Demo:</strong> Form inputs and validation
                  patterns in a multi-column layout.
                </ListItem>
                <ListItem>
                  <strong>Details Demo:</strong> Resource details and
                  information display with breadcrumbs.
                </ListItem>
              </List>
            </CardBody>
          </Card>

          <Card isRounded>
            <CardTitle>Key features</CardTitle>
            <CardBody>
              <List>
                <ListItem>PatternFly v6 components</ListItem>
                <ListItem>Ansible UI Framework (PageTable, PageDetails, etc.)</ListItem>
                <ListItem>Collapsible masthead and sidebar navigation</ListItem>
                <ListItem>GitLab Pages–compatible routing</ListItem>
              </List>
            </CardBody>
          </Card>

          <Card isRounded>
            <CardTitle>PatternFly components used (new in this experience)</CardTitle>
            <CardBody>
              <Content component="p" style={{ marginBottom: '12px' }}>
                Direct PatternFly components used in this prototype that are new to this experience:
              </Content>
              <List>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/search-input"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    SearchInput
                  </Button>
                  {' — Table toolbar search'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/dropdown"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Dropdown
                  </Button>
                  {' — Table toolbar actions'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/menu-toggle"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    MenuToggle
                  </Button>
                  {' — Select and dropdown toggles'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/popover"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Popover
                  </Button>
                  {' — Form field help'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/forms/form"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    FormGroupLabelHelp
                  </Button>
                  {' — Form label help icon (see Form component)'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/alert"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Alert / AlertGroup
                  </Button>
                  {' — Dashboard alerts'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/progress"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Progress
                  </Button>
                  {' — Dashboard metrics'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/description-list"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    DescriptionList
                  </Button>
                  {' — Dashboard key-value display'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/tabs"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Tabs
                  </Button>
                  {' — Dashboard performance metrics'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/bullseye"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Bullseye
                  </Button>
                  {' — Icon centering in stat cards'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/tooltip"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Tooltip
                  </Button>
                  {' — Dashboard system health'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/component-groups/status-and-state-indicators/status#basic-status"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Status
                  </Button>
                  {' — Job status indicators (Table, Details, Dashboard)'}
                </ListItem>
                <ListItem>
                  <Button
                    variant="link"
                    component="a"
                    href="https://www.patternfly.org/components/page"
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                    isInline
                  >
                    Page / Masthead / PageSidebar
                  </Button>
                  {' — App layout and navigation'}
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
