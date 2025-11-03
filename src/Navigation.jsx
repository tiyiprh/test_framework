import { Link, useLocation } from 'react-router-dom'
import {
  Nav,
  NavList,
  NavItem,
  Page,
  PageSidebar,
  PageSidebarBody,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageSection,
  Title,
} from '@patternfly/react-core'

export function AppNavigation({ children }) {
  const location = useLocation()

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Table Demo', path: '/table-demo' },
    { name: 'Form Demo', path: '/form-demo' },
    { name: 'Details Demo', path: '/details-demo' },
  ]

  const Header = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <Title headingLevel="h1" size="2xl">
            Ansible UI Framework Prototypes
          </Title>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <span style={{ color: 'white', fontSize: '14px' }}>
          UX Prototype Environment
        </span>
      </MastheadContent>
    </Masthead>
  )

  const Sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="Navigation">
          <NavList>
            {navigation.map((item) => (
              <NavItem
                key={item.path}
                isActive={location.pathname === item.path}
              >
                <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {item.name}
                </Link>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  )

  return (
    <Page header={Header} sidebar={Sidebar}>
      <PageSection>{children}</PageSection>
    </Page>
  )
}
