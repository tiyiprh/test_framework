import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PageLayout, PageHeader, PageDetails, PageDetail, PageTable } from '@ansible/ansible-ui-framework'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Tabs,
  Tab,
  TabTitleText,
  Flex,
  FlexItem,
  Label,
  Alert,
  Grid,
  GridItem,
  Modal,
  ModalVariant,
  Checkbox,
  Icon,
  Title,
} from '@patternfly/react-core'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChartLineIcon,
} from '@patternfly/react-icons'

function ProviderDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTabKey, setActiveTabKey] = useState(0)
  const [provider, setProvider] = useState(null)
  const [auditLogs, setAuditLogs] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditPermissionsOpen, setIsEditPermissionsOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedTeams, setSelectedTeams] = useState([])

  // Mock data for editing
  const availableUsers = [
    'alice@company.com',
    'bob@company.com',
    'charlie@company.com',
    'diana@company.com',
  ]
  const availableTeams = ['Engineering', 'Operations', 'Security', 'Management']

  useEffect(() => {
    // Load provider from localStorage
    const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
    console.log('Looking for provider with ID:', id)
    console.log('Available providers:', providers)
    const foundProvider = providers.find((p) => p.id === parseInt(id))
    console.log('Found provider:', foundProvider)
    
    if (foundProvider) {
      setProvider(foundProvider)
      setSelectedUsers(foundProvider.permissions?.users || [])
      setSelectedTeams(foundProvider.permissions?.teams || [])
    }

    // Load relevant audit logs
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    const providerLogs = logs
      .filter((log) => log.providerName === foundProvider?.name)
      .slice(0, 5)
    setAuditLogs(providerLogs)
  }, [id])

  if (!provider) {
    return (
      <PageLayout>
        <PageHeader
          title="Provider Not Found"
          description="The requested authentication provider could not be found"
        />
        <Alert 
          variant="warning" 
          title="Provider not found" 
          style={{ margin: '2rem' }}
        >
          <p>The authentication provider with ID {id} does not exist or has been deleted.</p>
          <Button 
            variant="link" 
            onClick={() => navigate('/providers')}
            style={{ paddingLeft: 0, marginTop: '1rem' }}
          >
            Go back to providers list
          </Button>
        </Alert>
      </PageLayout>
    )
  }

  const getProviderTypeName = (type) => {
    const names = {
      'azure-ad': 'Azure Active Directory',
      'google': 'Google Workspace',
      'github': 'GitHub',
      'saml': 'SAML 2.0',
    }
    return names[type] || type
  }

  const handleDelete = () => {
    const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
    const updated = providers.filter((p) => p.id !== provider.id)
    localStorage.setItem('authProviders', JSON.stringify(updated))
    
    // Add audit log
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    logs.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: 'admin@company.com',
      action: 'Provider Deleted',
      providerName: provider.name,
      providerType: provider.type,
      status: 'Success',
      details: 'Authentication provider permanently deleted',
    })
    localStorage.setItem('auditLogs', JSON.stringify(logs))
    
    navigate('/providers')
  }

  const handleToggleStatus = () => {
    const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
    const updated = providers.map((p) =>
      p.id === provider.id
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    )
    localStorage.setItem('authProviders', JSON.stringify(updated))
    
    // Add audit log
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    const newStatus = provider.status === 'active' ? 'inactive' : 'active'
    logs.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: 'admin@company.com',
      action: newStatus === 'active' ? 'Provider Enabled' : 'Provider Disabled',
      providerName: provider.name,
      providerType: provider.type,
      status: 'Success',
      details: `Provider status changed to ${newStatus}`,
    })
    localStorage.setItem('auditLogs', JSON.stringify(logs))
    
    setProvider({ ...provider, status: newStatus })
  }

  const handleSavePermissions = () => {
    const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
    const updated = providers.map((p) =>
      p.id === provider.id
        ? {
            ...p,
            permissions: {
              users: selectedUsers,
              teams: selectedTeams,
            },
          }
        : p
    )
    localStorage.setItem('authProviders', JSON.stringify(updated))
    
    // Add audit log
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    logs.unshift({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: 'admin@company.com',
      action: 'Provider Modified',
      providerName: provider.name,
      providerType: provider.type,
      status: 'Success',
      details: 'Updated permission assignments',
    })
    localStorage.setItem('auditLogs', JSON.stringify(logs))
    
    setProvider({
      ...provider,
      permissions: { users: selectedUsers, teams: selectedTeams },
    })
    setIsEditPermissionsOpen(false)
  }

  const handleUserToggle = (user) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    )
  }

  const handleTeamToggle = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    )
  }

  const StatusIndicator = ({ status }) => {
    if (status === 'Success') {
      return (
        <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <CheckCircleIcon style={{ color: '#3e8635' }} />
          </FlexItem>
          <FlexItem>Success</FlexItem>
        </Flex>
      )
    } else if (status === 'Failed') {
      return (
        <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <ExclamationCircleIcon style={{ color: '#c9190b' }} />
          </FlexItem>
          <FlexItem>Failed</FlexItem>
        </Flex>
      )
    } else {
      return (
        <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <ExclamationCircleIcon style={{ color: '#f0ab00' }} />
          </FlexItem>
          <FlexItem>Warning</FlexItem>
        </Flex>
      )
    }
  }

  const getActionColor = (action) => {
    if (action.includes('Created')) return 'blue'
    if (action.includes('Modified')) return 'purple'
    if (action.includes('Disabled')) return 'orange'
    if (action.includes('Login')) return 'cyan'
    return 'grey'
  }

  const auditTableColumns = useMemo(() => [
    {
      header: 'Timestamp',
      cell: (log) => new Date(log.timestamp).toLocaleString(),
    },
    {
      header: 'User',
      cell: (log) => log.user,
    },
    {
      header: 'Action',
      cell: (log) => <Label color={getActionColor(log.action)}>{log.action}</Label>,
    },
    {
      header: 'Status',
      cell: (log) => <StatusIndicator status={log.status} />,
    },
    {
      header: 'Details',
      cell: (log) => log.details,
    },
  ], [])

  const headerActions = (
    <Flex>
      <FlexItem>
        <Button variant="secondary" onClick={handleToggleStatus}>
          {provider.status === 'active' ? 'Disable' : 'Enable'}
        </Button>
      </FlexItem>
      <FlexItem>
        <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
          Delete
        </Button>
      </FlexItem>
    </Flex>
  )

  return (
    <PageLayout>
      <PageHeader
        title={provider.name}
        description={`${getProviderTypeName(provider.type)} • Created ${new Date(provider.createdAt).toLocaleDateString()}`}
        headerActions={headerActions}
      />

      {provider.status === 'inactive' && (
        <Alert
          variant="warning"
          isInline
          title="This provider is currently disabled"
          style={{ marginBottom: '1rem' }}
        >
          Users cannot authenticate using this provider while it is disabled.
        </Alert>
      )}

      <Tabs
        activeKey={activeTabKey}
        onSelect={(e, tabIndex) => setActiveTabKey(tabIndex)}
        aria-label="Provider details tabs"
      >
        <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>}>
          <div style={{ paddingTop: '1.5rem' }}>
            <Grid hasGutter>
              <GridItem span={12} lg={8}>
                <Card style={{ marginBottom: '1rem' }}>
                  <CardTitle>Configuration</CardTitle>
                  <CardBody>
                    <PageDetails>
                      <PageDetail label="Provider Type">
                        {getProviderTypeName(provider.type)}
                      </PageDetail>
                      <PageDetail label="Client ID">
                        {provider.config?.clientId || 'Not configured'}
                      </PageDetail>
                      {provider.type === 'azure-ad' && (
                        <PageDetail label="Tenant ID">
                          {provider.config?.tenantId || 'Not configured'}
                        </PageDetail>
                      )}
                      <PageDetail label="Redirect URI">
                        {provider.config?.redirectUri || 'Not configured'}
                      </PageDetail>
                      <PageDetail label="Status">
                        {provider.status === 'active' ? (
                          <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                            <FlexItem>
                              <CheckCircleIcon style={{ color: '#3e8635' }} />
                            </FlexItem>
                            <FlexItem>Active</FlexItem>
                          </Flex>
                        ) : (
                          <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                            <FlexItem>
                              <ExclamationCircleIcon style={{ color: '#6a6e73' }} />
                            </FlexItem>
                            <FlexItem>Inactive</FlexItem>
                          </Flex>
                        )}
                      </PageDetail>
                    </PageDetails>
                  </CardBody>
                </Card>

                <Card>
                  <CardTitle>
                    <Flex alignItems={{ default: 'alignItemsCenter' }}>
                      <FlexItem flex={{ default: 'flex_1' }}>Permissions</FlexItem>
                      <FlexItem>
                        <Button variant="link" onClick={() => setIsEditPermissionsOpen(true)}>
                          Edit
                        </Button>
                      </FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <Grid hasGutter>
                      <GridItem span={6}>
                        <Title headingLevel="h4" size="md">
                          Authorized Users
                        </Title>
                        {provider.permissions?.users?.length > 0 ? (
                          <Flex
                            direction={{ default: 'column' }}
                            spaceItems={{ default: 'spaceItemsSm' }}
                            style={{ marginTop: '0.5rem' }}
                          >
                            {provider.permissions.users.map((user) => (
                              <FlexItem key={user}>
                                <Label color="blue">{user}</Label>
                              </FlexItem>
                            ))}
                          </Flex>
                        ) : (
                          <p style={{ color: '#6a6e73', marginTop: '0.5rem' }}>
                            No users assigned
                          </p>
                        )}
                      </GridItem>
                      <GridItem span={6}>
                        <Title headingLevel="h4" size="md">
                          Authorized Teams
                        </Title>
                        {provider.permissions?.teams?.length > 0 ? (
                          <Flex
                            direction={{ default: 'column' }}
                            spaceItems={{ default: 'spaceItemsSm' }}
                            style={{ marginTop: '0.5rem' }}
                          >
                            {provider.permissions.teams.map((team) => (
                              <FlexItem key={team}>
                                <Label color="purple">{team}</Label>
                              </FlexItem>
                            ))}
                          </Flex>
                        ) : (
                          <p style={{ color: '#6a6e73', marginTop: '0.5rem' }}>
                            No teams assigned
                          </p>
                        )}
                      </GridItem>
                    </Grid>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem span={12} lg={4}>
                <Card>
                  <CardTitle>
                    <Flex alignItems={{ default: 'alignItemsCenter' }}>
                      <FlexItem>
                        <Icon>
                          <ChartLineIcon />
                        </Icon>
                      </FlexItem>
                      <FlexItem>Usage Statistics</FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <PageDetails>
                      <PageDetail label="Total Logins">
                        <Title headingLevel="h3" size="2xl">
                          {provider.stats?.totalLogins || 0}
                        </Title>
                      </PageDetail>
                      <PageDetail label="Active Users">
                        <Title headingLevel="h3" size="2xl">
                          {provider.stats?.activeUsers || 0}
                        </Title>
                      </PageDetail>
                      <PageDetail label="Success Rate">
                        <Title headingLevel="h3" size="2xl">
                          {provider.stats?.successRate || 0}%
                        </Title>
                      </PageDetail>
                    </PageDetails>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </div>
        </Tab>

        <Tab eventKey={1} title={<TabTitleText>Recent Activity</TabTitleText>}>
          <div style={{ paddingTop: '1.5rem' }}>
            <Card>
              <CardTitle>
                <Flex alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem flex={{ default: 'flex_1' }}>Recent Audit Events</FlexItem>
                  <FlexItem>
                    <Button variant="link" component={Link} to="/audit-log">
                      View all events
                    </Button>
                  </FlexItem>
                </Flex>
              </CardTitle>
              <CardBody>
                {auditLogs.length > 0 ? (
                  <PageTable
                    keyFn={(log) => log.id}
                    tableColumns={auditTableColumns}
                    itemCount={auditLogs.length}
                    pageItems={auditLogs}
                    page={1}
                    setPage={() => {}}
                    perPage={10}
                    setPerPage={() => {}}
                    errorStateTitle="Error loading audit events"
                    disableCardView
                    disableListView
                    disablePagination
                  />
                ) : (
                  <Alert variant="info" isInline title="No recent activity">
                    There are no recent audit events for this provider.
                  </Alert>
                )}
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>

      {/* Delete Confirmation Modal */}
      <Modal
        variant={ModalVariant.small}
        title="Delete authentication provider?"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        actions={[
          <Button key="delete" variant="danger" onClick={handleDelete}>
            Delete Provider
          </Button>,
          <Button key="cancel" variant="link" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Alert variant="danger" isInline title="This action cannot be undone">
          Deleting this provider will prevent all associated users from authenticating. All
          configuration and statistics will be permanently lost.
        </Alert>
        <p style={{ marginTop: '1rem' }}>
          Provider: <strong>{provider.name}</strong>
        </p>
      </Modal>

      {/* Edit Permissions Modal */}
      <Modal
        variant={ModalVariant.medium}
        title="Edit Provider Permissions"
        isOpen={isEditPermissionsOpen}
        onClose={() => setIsEditPermissionsOpen(false)}
        actions={[
          <Button key="save" variant="primary" onClick={handleSavePermissions}>
            Save Changes
          </Button>,
          <Button
            key="cancel"
            variant="link"
            onClick={() => setIsEditPermissionsOpen(false)}
          >
            Cancel
          </Button>,
        ]}
      >
        <Grid hasGutter>
          <GridItem span={6}>
            <Title headingLevel="h4" size="md" style={{ marginBottom: '1rem' }}>
              Authorized Users
            </Title>
            {availableUsers.map((user) => (
              <Checkbox
                key={user}
                id={`edit-user-${user}`}
                label={user}
                isChecked={selectedUsers.includes(user)}
                onChange={() => handleUserToggle(user)}
                style={{ marginBottom: '0.5rem' }}
              />
            ))}
          </GridItem>
          <GridItem span={6}>
            <Title headingLevel="h4" size="md" style={{ marginBottom: '1rem' }}>
              Authorized Teams
            </Title>
            {availableTeams.map((team) => (
              <Checkbox
                key={team}
                id={`edit-team-${team}`}
                label={team}
                isChecked={selectedTeams.includes(team)}
                onChange={() => handleTeamToggle(team)}
                style={{ marginBottom: '0.5rem' }}
              />
            ))}
          </GridItem>
        </Grid>
      </Modal>
    </PageLayout>
  )
}

export default ProviderDetails
