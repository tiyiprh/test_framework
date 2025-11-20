import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, PageHeader, PageTable, usePageNavigate } from '@ansible/ansible-ui-framework'
import {
  Button,
  Label,
  Badge,
  Flex,
  FlexItem,
  SearchInput,
} from '@patternfly/react-core'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PencilAltIcon,
  TrashIcon,
  PowerOffIcon,
  CheckIcon,
} from '@patternfly/react-icons'

function ProvidersList() {
  const navigate = useNavigate()
  const [providers, setProviders] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [filterState, setFilterState] = useState({})
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    // Load providers from localStorage (in real app, this would be an API call)
    const storedProviders = JSON.parse(localStorage.getItem('authProviders') || '[]')
    
    // If no providers exist, create some sample data
    if (storedProviders.length === 0) {
      const sampleProviders = [
        {
          id: 1,
          type: 'azure-ad',
          name: 'Azure AD Production',
          status: 'active',
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
          permissions: {
            users: ['alice@company.com', 'bob@company.com'],
            teams: ['Engineering', 'Operations'],
          },
          stats: {
            totalLogins: 342,
            activeUsers: 28,
            successRate: 98.5,
          },
        },
        {
          id: 2,
          type: 'google',
          name: 'Google Workspace',
          status: 'active',
          createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
          permissions: {
            users: ['charlie@company.com', 'diana@company.com'],
            teams: ['Engineering'],
          },
          stats: {
            totalLogins: 156,
            activeUsers: 12,
            successRate: 99.2,
          },
        },
        {
          id: 3,
          type: 'github',
          name: 'GitHub OAuth',
          status: 'active',
          createdAt: new Date(Date.now() - 86400000 * 21).toISOString(),
          permissions: {
            users: ['alice@company.com'],
            teams: ['Engineering'],
          },
          stats: {
            totalLogins: 89,
            activeUsers: 8,
            successRate: 97.8,
          },
        },
        {
          id: 4,
          type: 'saml',
          name: 'SAML Enterprise',
          status: 'inactive',
          createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
          permissions: {
            users: [],
            teams: ['Management'],
          },
          stats: {
            totalLogins: 0,
            activeUsers: 0,
            successRate: 0,
          },
        },
      ]
      localStorage.setItem('authProviders', JSON.stringify(sampleProviders))
      setProviders(sampleProviders)
    } else {
      setProviders(storedProviders)
    }
  }, [])

  const getProviderTypeName = (type) => {
    const names = {
      'azure-ad': 'Azure AD',
      'google': 'Google Workspace',
      'github': 'GitHub',
      'saml': 'SAML 2.0',
    }
    return names[type] || type
  }

  const StatusIndicator = ({ status }) => {
    if (status === 'active') {
      return (
        <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <CheckCircleIcon style={{ color: '#3e8635' }} />
          </FlexItem>
          <FlexItem>Active</FlexItem>
        </Flex>
      )
    } else {
      return (
        <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <ExclamationCircleIcon style={{ color: '#6a6e73' }} />
          </FlexItem>
          <FlexItem>Inactive</FlexItem>
        </Flex>
      )
    }
  }

  const tableColumns = useMemo(() => [
    {
      header: 'Name',
      cell: (provider) => (
        <Button
          variant="link"
          isInline
          onClick={() => navigate(`/providers/${provider.id}`)}
          style={{ padding: 0, fontSize: 'inherit' }}
        >
          {provider.name}
        </Button>
      ),
      sort: 'name',
      card: 'name',
      list: 'name',
    },
    {
      header: 'Type',
      cell: (provider) => getProviderTypeName(provider.type),
      sort: 'type',
    },
    {
      header: 'Status',
      cell: (provider) => <StatusIndicator status={provider.status} />,
      sort: 'status',
    },
    {
      header: 'Total Logins',
      cell: (provider) => provider.stats?.totalLogins || 0,
      sort: 'stats.totalLogins',
    },
    {
      header: 'Active Users',
      cell: (provider) => provider.stats?.activeUsers || 0,
      sort: 'stats.activeUsers',
    },
    {
      header: 'Success Rate',
      cell: (provider) => `${provider.stats?.successRate || 0}%`,
      sort: 'stats.successRate',
    },
    {
      header: 'Permissions',
      cell: (provider) => (
        <Flex spaceItems={{ default: 'spaceItemsSm' }}>
          <FlexItem>
            <Badge isRead>
              {provider.permissions?.users?.length || 0} users
            </Badge>
          </FlexItem>
          <FlexItem>
            <Badge isRead>
              {provider.permissions?.teams?.length || 0} teams
            </Badge>
          </FlexItem>
        </Flex>
      ),
    },
  ], [])

  const toolbarFilters = useMemo(() => [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      placeholder: 'Filter by status',
    },
    {
      key: 'type',
      label: 'Provider Type',
      type: 'select',
      options: [
        { label: 'Azure AD', value: 'azure-ad' },
        { label: 'Google Workspace', value: 'google' },
        { label: 'GitHub', value: 'github' },
        { label: 'SAML 2.0', value: 'saml' },
      ],
      placeholder: 'Filter by type',
    },
  ], [])

  // Filter providers based on search
  const filteredProviders = useMemo(() => {
    if (!searchValue) return providers
    return providers.filter(provider => 
      provider.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [providers, searchValue])

  const toolbarActions = useMemo(
    () => [
      {
        type: 0, // PageActionType.Button
        selection: 0, // PageActionSelection.None (no selection needed)
        variant: 'primary',
        label: 'Create provider',
        onClick: () => navigate('/providers/new'),
        isPinned: true, // Pin to toolbar instead of dropdown
      },
    ],
    [navigate]
  )

  const rowActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      icon: PencilAltIcon,
      label: 'Edit',
      onClick: (provider) => navigate(`/providers/${provider.id}`),
    },
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      icon: (provider) => provider.status === 'active' ? PowerOffIcon : CheckIcon,
      label: (provider) => provider.status === 'active' ? 'Disable' : 'Enable',
      onClick: (provider) => {
        const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
        const updated = providers.map((p) => 
          p.id === provider.id 
            ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
            : p
        )
        localStorage.setItem('authProviders', JSON.stringify(updated))
        setProviders(updated)
      },
    },
    {
      type: 4, // PageActionType.Separator
    },
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      icon: TrashIcon,
      label: 'Delete',
      onClick: (provider) => {
        const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
        const updated = providers.filter((p) => p.id !== provider.id)
        localStorage.setItem('authProviders', JSON.stringify(updated))
        setProviders(updated)
      },
      isDanger: true,
    },
  ], [navigate, setProviders])

  const bulkActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 2, // PageActionSelection.Multiple
      label: 'Enable selected',
      onClick: (selectedProviders) => {
        const providerIds = selectedProviders.map(p => p.id)
        const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
        const updated = providers.map((p) => 
          providerIds.includes(p.id) ? { ...p, status: 'active' } : p
        )
        localStorage.setItem('authProviders', JSON.stringify(updated))
        setProviders(updated)
      },
    },
    {
      type: 0, // PageActionType.Button
      selection: 2, // PageActionSelection.Multiple
      label: 'Disable selected',
      onClick: (selectedProviders) => {
        const providerIds = selectedProviders.map(p => p.id)
        const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
        const updated = providers.map((p) => 
          providerIds.includes(p.id) ? { ...p, status: 'inactive' } : p
        )
        localStorage.setItem('authProviders', JSON.stringify(updated))
        setProviders(updated)
      },
    },
    {
      type: 4, // PageActionType.Separator
    },
    {
      type: 0, // PageActionType.Button
      selection: 2, // PageActionSelection.Multiple
      label: 'Delete selected',
      onClick: (selectedProviders) => {
        const providerIds = selectedProviders.map(p => p.id)
        const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
        const updated = providers.filter((p) => !providerIds.includes(p.id))
        localStorage.setItem('authProviders', JSON.stringify(updated))
        setProviders(updated)
      },
      isDanger: true,
    },
  ], [setProviders])

  return (
    <PageLayout>
      <PageHeader
        title="Authentication Providers"
        description="Manage external authentication providers for single sign-on"
      />
      <PageTable
        keyFn={(provider) => provider.id}
        tableColumns={tableColumns}
        toolbarFilters={toolbarFilters}
        filterState={filterState}
        setFilterState={setFilterState}
        toolbarContent={
          <SearchInput
            placeholder="Search providers"
            value={searchValue}
            onChange={(_event, value) => setSearchValue(value)}
            onClear={() => setSearchValue('')}
            style={{ width: '300px' }}
          />
        }
        toolbarActions={toolbarActions}
        rowActions={rowActions}
        bulkActions={bulkActions}
        itemCount={filteredProviders.length}
        pageItems={filteredProviders}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        errorStateTitle="Error loading providers"
        emptyStateTitle="No providers found"
        showSelect
        isSelectMultiple
      />
    </PageLayout>
  )
}

export default ProvidersList
