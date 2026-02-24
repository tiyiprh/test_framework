import { useState } from 'react'
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
  MastheadToggle,
  PageToggleButton,
} from '@patternfly/react-core'
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon'

export function AppNavigation({ children }) {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const navigation = [
    { name: 'Prototype Introduction', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Table Demo', path: '/table-demo' },
    { name: 'Form Demo', path: '/form-demo' },
    { name: 'Details Demo', path: '/details-demo' },
  ]

  const Header = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label="Global navigation"
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <img
            src={`${import.meta.env.BASE_URL}aap-logo.svg`}
            alt="Red Hat Ansible Automation Platform"
            style={{ height: '36px' }}
          />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent />
    </Masthead>
  )

  const Sidebar = (
    <PageSidebar isSidebarOpen={isSidebarOpen}>
      <PageSidebarBody>
        <Nav aria-label="Navigation">
          <NavList>
            {navigation.map((item) => (
              <NavItem
                key={item.path}
                isActive={
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname === item.path ||
                      location.pathname.startsWith(item.path + '/')
                }
              >
                <Link
                  to={item.path}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {item.name}
                </Link>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  )

  return <Page masthead={Header} sidebar={Sidebar}>{children}</Page>
}
