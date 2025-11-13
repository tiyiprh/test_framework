import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, PageHeader, PageTable } from '@ansible/ansible-ui-framework'
import {
  Button,
  Label,
  Flex,
  FlexItem,
} from '@patternfly/react-core'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusCircleIcon,
} from '@patternfly/react-icons'

function SampleTable() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)

  useEffect(() => {
    // Sample data for the table
    const sampleData = [
      {
        id: 1,
        name: 'Web Server 01',
        status: 'running',
        type: 'Production',
        host: 'webserver-01.example.com',
        cpu: '45%',
        memory: '2.3 GB',
        uptime: '45 days',
      },
      {
        id: 2,
        name: 'Database Server',
        status: 'running',
        type: 'Production',
        host: 'db-primary.example.com',
        cpu: '78%',
        memory: '15.8 GB',
        uptime: '120 days',
      },
      {
        id: 3,
        name: 'App Server 01',
        status: 'stopped',
        type: 'Development',
        host: 'app-dev-01.example.com',
        cpu: '0%',
        memory: '0 GB',
        uptime: '0 days',
      },
      {
        id: 4,
        name: 'Cache Server',
        status: 'running',
        type: 'Production',
        host: 'cache-01.example.com',
        cpu: '23%',
        memory: '4.1 GB',
        uptime: '89 days',
      },
      {
        id: 5,
        name: 'Web Server 02',
        status: 'running',
        type: 'Production',
        host: 'webserver-02.example.com',
        cpu: '52%',
        memory: '2.7 GB',
        uptime: '45 days',
      },
      {
        id: 6,
        name: 'Test Server',
        status: 'running',
        type: 'Staging',
        host: 'test-01.example.com',
        cpu: '12%',
        memory: '1.2 GB',
        uptime: '15 days',
      },
    ]
    setItems(sampleData)
  }, [])

  const StatusIndicator = ({ status }) => {
    if (status === 'running') {
      return (
        <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <CheckCircleIcon style={{ color: '#3e8635' }} />
          </FlexItem>
          <FlexItem>Running</FlexItem>
        </Flex>
      )
    } else {
      return (
        <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <ExclamationCircleIcon style={{ color: '#c9190b' }} />
          </FlexItem>
          <FlexItem>Stopped</FlexItem>
        </Flex>
      )
    }
  }

  const tableColumns = useMemo(() => [
    {
      header: 'Name',
      cell: (item) => (
        <Button
          variant="link"
          isInline
          onClick={() => console.log('Clicked:', item.name)}
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
      header: 'Type',
      cell: (item) => {
        const color = item.type === 'Production' ? 'red' : item.type === 'Staging' ? 'orange' : 'blue'
        return <Label color={color}>{item.type}</Label>
      },
      sort: 'type',
    },
    {
      header: 'Host',
      cell: (item) => item.host,
      sort: 'host',
    },
    {
      header: 'CPU',
      cell: (item) => item.cpu,
      sort: 'cpu',
    },
    {
      header: 'Memory',
      cell: (item) => item.memory,
      sort: 'memory',
    },
    {
      header: 'Uptime',
      cell: (item) => item.uptime,
      sort: 'uptime',
    },
  ], [])

  const toolbarActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 0, // PageActionSelection.None
      variant: 'primary',
      label: 'Add server',
      onClick: () => console.log('Add server clicked'),
    },
  ], [])

  const rowActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'Start',
      onClick: (item) => {
        console.log('Start:', item.name)
        // Update item status
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: 'running' } : i
          )
        )
      },
    },
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'Stop',
      onClick: (item) => {
        console.log('Stop:', item.name)
        // Update item status
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: 'stopped', cpu: '0%', memory: '0 GB' } : i
          )
        )
      },
    },
    {
      type: 4, // PageActionType.Separator
    },
    {
      type: 0, // PageActionType.Button
      selection: 1, // PageActionSelection.Single
      label: 'Delete',
      onClick: (item) => {
        console.log('Delete:', item.name)
        setItems((prev) => prev.filter((i) => i.id !== item.id))
      },
      isDanger: true,
    },
  ], [])

  const bulkActions = useMemo(() => [
    {
      type: 0, // PageActionType.Button
      selection: 2, // PageActionSelection.Multiple
      variant: 'primary',
      label: 'Start selected',
      onClick: (items) => {
        console.log('Start selected:', items)
        const itemIds = items.map(i => i.id)
        setItems((prev) =>
          prev.map((i) =>
            itemIds.includes(i.id) ? { ...i, status: 'running' } : i
          )
        )
      },
    },
    {
      type: 0, // PageActionType.Button
      selection: 2, // PageActionSelection.Multiple
      label: 'Stop selected',
      onClick: (items) => {
        console.log('Stop selected:', items)
        const itemIds = items.map(i => i.id)
        setItems((prev) =>
          prev.map((i) =>
            itemIds.includes(i.id) ? { ...i, status: 'stopped', cpu: '0%', memory: '0 GB' } : i
          )
        )
      },
    },
    {
      type: 4, // PageActionType.Separator
    },
    {
      type: 0, // PageActionType.Button
      selection: 2, // PageActionSelection.Multiple
      label: 'Delete selected',
      onClick: (items) => {
        console.log('Delete selected:', items)
        const itemIds = items.map(i => i.id)
        setItems((prev) => prev.filter((i) => !itemIds.includes(i.id)))
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
        { label: 'Running', value: 'running' },
        { label: 'Stopped', value: 'stopped' },
      ],
      placeholder: 'Filter by status',
    },
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Production', value: 'Production' },
        { label: 'Staging', value: 'Staging' },
        { label: 'Development', value: 'Development' },
      ],
      placeholder: 'Filter by type',
    },
  ], [])

  return (
    <PageLayout>
      <PageHeader
        title="Sample Table"
        description="Example table showing server inventory with actions and filters"
        headerActions={
          <Button variant="primary" onClick={() => console.log('Add server')}>
            <PlusCircleIcon /> Add server
          </Button>
        }
      />
      <PageTable
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
        errorStateTitle="Error loading servers"
        emptyStateTitle="No servers found"
        showSelect
        isSelectMultiple
      />
    </PageLayout>
  )
}

export default SampleTable

