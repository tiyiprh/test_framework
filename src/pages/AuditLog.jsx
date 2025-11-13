import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageLayout, PageHeader, PageTable } from '@ansible/ansible-ui-framework'
import {
  Label,
  Flex,
  FlexItem,
  Button,
} from '@patternfly/react-core'
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  DownloadIcon,
  FilterIcon,
} from '@patternfly/react-icons'

function AuditLog() {
  const [auditLogs, setAuditLogs] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)

  useEffect(() => {
    // Load audit logs from localStorage (in real app, this would be an API call)
    const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    
    // If no logs exist, create some sample data
    if (logs.length === 0) {
      const sampleLogs = [
        {
          id: 1,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          user: 'admin@company.com',
          action: 'Provider Created',
          providerName: 'Azure AD Production',
          providerType: 'azure-ad',
          status: 'Success',
          details: 'New Azure AD provider configured',
        },
        {
          id: 2,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          user: 'alice@company.com',
          action: 'User Login',
          providerName: 'Google Workspace',
          providerType: 'google',
          status: 'Success',
          details: 'User successfully authenticated',
        },
        {
          id: 3,
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          user: 'bob@company.com',
          action: 'User Login',
          providerName: 'Azure AD Production',
          providerType: 'azure-ad',
          status: 'Failed',
          details: 'Invalid credentials provided',
        },
        {
          id: 4,
          timestamp: new Date(Date.now() - 14400000).toISOString(),
          user: 'admin@company.com',
          action: 'Provider Modified',
          providerName: 'GitHub OAuth',
          providerType: 'github',
          status: 'Success',
          details: 'Updated permission assignments',
        },
        {
          id: 5,
          timestamp: new Date(Date.now() - 18000000).toISOString(),
          user: 'charlie@company.com',
          action: 'User Login',
          providerName: 'Google Workspace',
          providerType: 'google',
          status: 'Success',
          details: 'User successfully authenticated',
        },
        {
          id: 6,
          timestamp: new Date(Date.now() - 21600000).toISOString(),
          user: 'admin@company.com',
          action: 'Provider Disabled',
          providerName: 'SAML Enterprise',
          providerType: 'saml',
          status: 'Success',
          details: 'Provider temporarily disabled for maintenance',
        },
        {
          id: 7,
          timestamp: new Date(Date.now() - 25200000).toISOString(),
          user: 'diana@company.com',
          action: 'User Login',
          providerName: 'Azure AD Production',
          providerType: 'azure-ad',
          status: 'Success',
          details: 'User successfully authenticated',
        },
        {
          id: 8,
          timestamp: new Date(Date.now() - 28800000).toISOString(),
          user: 'admin@company.com',
          action: 'Provider Created',
          providerName: 'Google Workspace',
          providerType: 'google',
          status: 'Success',
          details: 'New Google OAuth provider configured',
        },
      ]
      localStorage.setItem('auditLogs', JSON.stringify(sampleLogs))
      setAuditLogs(sampleLogs)
    } else {
      setAuditLogs(logs)
    }
  }, [])

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

  const tableColumns = useMemo(() => [
    {
      header: 'Timestamp',
      cell: (log) => new Date(log.timestamp).toLocaleString(),
      sort: 'timestamp',
      defaultSort: true,
      defaultSortDirection: 'desc',
    },
    {
      header: 'User',
      cell: (log) => log.user,
      sort: 'user',
    },
    {
      header: 'Action',
      cell: (log) => <Label color={getActionColor(log.action)}>{log.action}</Label>,
      sort: 'action',
    },
    {
      header: 'Provider',
      cell: (log) => (
        <Link to={`/providers/${log.id}`}>{log.providerName}</Link>
      ),
      sort: 'providerName',
    },
    {
      header: 'Status',
      cell: (log) => <StatusIndicator status={log.status} />,
      sort: 'status',
    },
    {
      header: 'Details',
      cell: (log) => log.details,
    },
  ], [])

  const toolbarFilters = useMemo(() => [
    {
      key: 'action',
      label: 'Action',
      type: 'select',
      options: [
        { label: 'Provider Created', value: 'Provider Created' },
        { label: 'Provider Modified', value: 'Provider Modified' },
        { label: 'Provider Disabled', value: 'Provider Disabled' },
        { label: 'User Login', value: 'User Login' },
      ],
      placeholder: 'Filter by action',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Success', value: 'Success' },
        { label: 'Failed', value: 'Failed' },
      ],
      placeholder: 'Filter by status',
    },
    {
      key: 'user',
      label: 'User',
      type: 'string',
      placeholder: 'Search by user',
    },
    {
      key: 'providerName',
      label: 'Provider',
      type: 'string',
      placeholder: 'Search by provider name',
    },
  ], [])

  const toolbarActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 0, // PageActionSelection.None
      variant: 'secondary',
      label: 'Export logs',
      onClick: () => {
        console.log('Exporting audit logs...')
        // In a real app, this would trigger a CSV/JSON download
        const dataStr = JSON.stringify(auditLogs, null, 2)
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
        const exportFileDefaultName = `audit-logs-${new Date().toISOString().split('T')[0]}.json`
        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
      },
      icon: DownloadIcon,
    },
  ], [auditLogs])

  const rowActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'View details',
      onClick: (log) => {
        console.log('View audit log details:', log)
      },
    },
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'View provider',
      onClick: (log) => {
        console.log('Navigate to provider:', log.providerName)
      },
    },
  ], [])

  return (
    <PageLayout>
      <PageHeader
        title="Audit Log"
        description="Track authentication events, provider changes, and security activities"
        headerActions={
          <Button 
            variant="secondary" 
            onClick={() => {
              console.log('Exporting audit logs...')
              const dataStr = JSON.stringify(auditLogs, null, 2)
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
              const exportFileDefaultName = `audit-logs-${new Date().toISOString().split('T')[0]}.json`
              const linkElement = document.createElement('a')
              linkElement.setAttribute('href', dataUri)
              linkElement.setAttribute('download', exportFileDefaultName)
              linkElement.click()
            }}
          >
            <DownloadIcon /> Export logs
          </Button>
        }
      />
      <PageTable
        keyFn={(log) => log.id}
        tableColumns={tableColumns}
        toolbarFilters={toolbarFilters}
        toolbarActions={toolbarActions}
        rowActions={rowActions}
        itemCount={auditLogs.length}
        pageItems={auditLogs}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        errorStateTitle="Error loading audit events"
        emptyStateTitle="No audit logs found"
      />
    </PageLayout>
  )
}

export default AuditLog
