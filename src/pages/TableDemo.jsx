import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, PageHeader, PageTable } from '@ansible/ansible-ui-framework'
import {
  Button,
  Label,
  Flex,
  FlexItem,
  Progress,
  ProgressVariant,
} from '@patternfly/react-core'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  SyncAltIcon,
  ClockIcon,
  PlusCircleIcon,
  PlayIcon,
} from '@patternfly/react-icons'

function TableDemo() {
  const navigate = useNavigate()
  const [items, setItems] = useState([
    { 
      id: 1, 
      name: 'Deploy Production App', 
      status: 'Success', 
      template: 'Deploy Application',
      created: '2024-11-13 14:23:00',
      duration: '2m 34s',
      progress: 100,
      user: 'admin',
    },
    { 
      id: 2, 
      name: 'Database Backup', 
      status: 'Running', 
      template: 'Backup Database',
      created: '2024-11-13 14:45:00',
      duration: '1m 12s',
      progress: 65,
      user: 'automation',
    },
    { 
      id: 3, 
      name: 'Update Security Patches', 
      status: 'Failed', 
      template: 'System Updates',
      created: '2024-11-13 12:15:00',
      duration: '0m 45s',
      progress: 30,
      user: 'admin',
    },
    { 
      id: 4, 
      name: 'Restart Web Services', 
      status: 'Success', 
      template: 'Service Management',
      created: '2024-11-13 11:00:00',
      duration: '0m 15s',
      progress: 100,
      user: 'operator',
    },
    { 
      id: 5, 
      name: 'Configure Load Balancer', 
      status: 'Pending', 
      template: 'Network Configuration',
      created: '2024-11-13 15:00:00',
      duration: '0m 00s',
      progress: 0,
      user: 'admin',
    },
    { 
      id: 6, 
      name: 'Infrastructure Scan', 
      status: 'Running', 
      template: 'Security Audit',
      created: '2024-11-13 14:50:00',
      duration: '3m 45s',
      progress: 42,
      user: 'security',
    },
    { 
      id: 7, 
      name: 'Deploy Staging Environment', 
      status: 'Success', 
      template: 'Deploy Application',
      created: '2024-11-13 10:30:00',
      duration: '4m 12s',
      progress: 100,
      user: 'developer',
    },
  ])
  
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)

  const StatusIndicator = ({ status }) => {
    const statusConfig = {
      'Success': { icon: CheckCircleIcon, color: '#3e8635', label: 'Success' },
      'Failed': { icon: ExclamationCircleIcon, color: '#c9190b', label: 'Failed' },
      'Running': { icon: SyncAltIcon, color: '#0066cc', label: 'Running' },
      'Pending': { icon: ClockIcon, color: '#f0ab00', label: 'Pending' },
    }
    
    const config = statusConfig[status] || statusConfig['Pending']
    const Icon = config.icon

    return (
      <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
        <FlexItem>
          <Icon style={{ color: config.color }} />
        </FlexItem>
        <FlexItem>{config.label}</FlexItem>
      </Flex>
    )
  }

  const tableColumns = useMemo(() => [
    {
      header: 'Job Name',
      cell: (item) => (
        <Button
          variant="link"
          isInline
          onClick={() => console.log('View job:', item.name)}
          style={{ padding: 0, fontSize: 'inherit' }}
        >
          {item.name}
        </Button>
      ),
      sort: 'name',
      card: 'name',
      list: 'name',
    },
    {
      header: 'Status',
      cell: (item) => <StatusIndicator status={item.status} />,
      sort: 'status',
    },
    {
      header: 'Template',
      cell: (item) => <Label color="blue">{item.template}</Label>,
      sort: 'template',
    },
    {
      header: 'Progress',
      cell: (item) => {
        let variant = ProgressVariant.success
        if (item.status === 'Failed') variant = ProgressVariant.danger
        else if (item.status === 'Running') variant = ProgressVariant.info
        else if (item.status === 'Pending') variant = ProgressVariant.warning
        
        return (
          <Progress 
            value={item.progress} 
            variant={variant}
            size="sm"
          />
        )
      },
    },
    {
      header: 'User',
      cell: (item) => item.user,
      sort: 'user',
    },
    {
      header: 'Duration',
      cell: (item) => item.duration,
      sort: 'duration',
    },
    {
      header: 'Created',
      cell: (item) => item.created,
      sort: 'created',
      defaultSort: true,
      defaultSortDirection: 'desc',
    },
  ], [])

  const toolbarActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 0, // PageActionSelection.None
      variant: 'primary',
      label: 'Launch job',
      onClick: () => console.log('Launch new job'),
      icon: PlayIcon,
    },
  ], [])

  const rowActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'View details',
      onClick: (item) => console.log('View details:', item.name),
    },
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'Relaunch',
      onClick: (item) => {
        const newJob = {
          ...item,
          id: Date.now(),
          status: 'Running',
          created: new Date().toLocaleString(),
          duration: '0m 00s',
          progress: 0,
        }
        setItems((prev) => [newJob, ...prev])
        console.log('Relaunched:', item.name)
      },
    },
    {
      type: 4, // PageActionType.Separator
    },
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'Cancel job',
      onClick: (item) => {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id && i.status === 'Running'
              ? { ...i, status: 'Failed', progress: i.progress }
              : i
          )
        )
        console.log('Cancelled:', item.name)
      },
    },
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'Delete',
      onClick: (item) => {
        setItems((prev) => prev.filter((i) => i.id !== item.id))
        console.log('Deleted:', item.name)
      },
      isDanger: true,
    },
  ], [])

  const bulkActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 2, // PageActionSelection.Multiple
      label: 'Cancel selected',
      onClick: (selectedItems) => {
        const itemIds = selectedItems.map(i => i.id)
        setItems((prev) =>
          prev.map((i) =>
            itemIds.includes(i.id) && i.status === 'Running'
              ? { ...i, status: 'Failed' }
              : i
          )
        )
        console.log('Cancelled selected jobs')
      },
    },
    {
      type: 4, // PageActionType.Separator
    },
    {
      type: 0, // PageActionType.Button
      selection: 2, // PageActionSelection.Multiple
      label: 'Delete selected',
      onClick: (selectedItems) => {
        const itemIds = selectedItems.map(i => i.id)
        setItems((prev) => prev.filter((i) => !itemIds.includes(i.id)))
        console.log('Deleted selected jobs')
      },
      isDanger: true,
    },
  ], [])

  const toolbarFilters = useMemo(() => [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Success', value: 'Success' },
        { label: 'Failed', value: 'Failed' },
        { label: 'Running', value: 'Running' },
        { label: 'Pending', value: 'Pending' },
      ],
      placeholder: 'Filter by status',
    },
    {
      key: 'user',
      label: 'User',
      type: 'select',
      options: [
        { label: 'admin', value: 'admin' },
        { label: 'operator', value: 'operator' },
        { label: 'developer', value: 'developer' },
        { label: 'automation', value: 'automation' },
        { label: 'security', value: 'security' },
      ],
      placeholder: 'Filter by user',
    },
    {
      key: 'name',
      label: 'Name',
      type: 'string',
      placeholder: 'Filter by job name',
    },
  ], [])

  return (
    <PageLayout>
      <PageHeader
        title="Automation Jobs"
        description="View and manage automation job executions"
        data-testid="demo-page-header"
        headerActions={
          <Button variant="primary" onClick={() => console.log('Launch job')}>
            <PlusCircleIcon /> Launch job
          </Button>
        }
      />
      <PageTable
        data-testid="demo-page-table"
        keyFn={(item) => item.id}
        tableColumns={tableColumns}
        toolbarFilters={toolbarFilters}
        toolbarActions={toolbarActions}
        rowActions={rowActions}
        bulkActions={bulkActions}
        itemCount={items.length}
        pageItems={items}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        emptyStateTitle="No automation jobs"
        errorStateTitle="Error loading automation jobs"
        showSelect
        isSelectMultiple
      />
    </PageLayout>
  )
}

export default TableDemo
