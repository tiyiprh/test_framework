import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PageLayout,
  PageHeader,
  PageTable,
  useInMemoryView,
  ToolbarFilterType,
} from '@ansible/ansible-ui-framework'
import {
  Button,
  SearchInput,
  ToolbarItem,
  Dropdown,
  DropdownList,
  DropdownItem,
  MenuToggle,
} from '@patternfly/react-core'
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon'
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon'
import { getJobRowActions } from './jobRowActions'

const statusOptions = [
  { value: 'Success', label: 'Success' },
  { value: 'Running', label: 'Running' },
  { value: 'Failed', label: 'Failed' },
  { value: 'Pending', label: 'Pending' },
]

function TableDemo() {
  const navigate = useNavigate()
  const [items] = useState([
    { id: 1, name: 'Automation Job 1', status: 'Success', created: '2024-11-03' },
    { id: 2, name: 'Automation Job 2', status: 'Running', created: '2024-11-03' },
    { id: 3, name: 'Automation Job 3', status: 'Failed', created: '2024-11-02' },
    { id: 4, name: 'Automation Job 4', status: 'Success', created: '2024-11-02' },
    { id: 5, name: 'Automation Job 5', status: 'Pending', created: '2024-11-01' },
  ])

  const [searchValue, setSearchValue] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchValue) return items
    const lowerSearch = searchValue.toLowerCase()
    return items.filter((item) =>
      item.name.toLowerCase().includes(lowerSearch)
    )
  }, [searchValue, items])

  const tableColumns = [
    { header: 'Name', cell: (item) => item.name, sort: 'name' },
    { header: 'Status', cell: (item) => item.status, sort: 'status' },
    { header: 'Created date', cell: (item) => item.created, sort: 'created' },
  ]

  const toolbarFilters = [
    {
      key: 'status',
      label: 'Status',
      type: ToolbarFilterType.SingleSelect,
      query: 'status',
      placeholder: 'Filter by status',
      options: statusOptions,
    },
  ]

  const view = useInMemoryView({
    items: filteredItems,
    keyFn: (item) => item.id,
    tableColumns,
    toolbarFilters,
  })

  const [kebabOpen, setKebabOpen] = useState(false)

  const toolbarContent = (
    <>
      <ToolbarItem>
        <SearchInput
          placeholder="Search by name"
          value={searchValue}
          onChange={(_event, value) => setSearchValue(value)}
          onClear={() => setSearchValue('')}
          style={{ minWidth: '200px' }}
        />
      </ToolbarItem>
      <ToolbarItem>
        <Button variant="primary" icon={<PlusCircleIcon />} onClick={() => navigate('/form-demo')}>
          Create job
        </Button>
      </ToolbarItem>
      <ToolbarItem>
        <Dropdown
          isOpen={kebabOpen}
          onOpenChange={setKebabOpen}
          onSelect={() => setKebabOpen(false)}
          toggle={(toggleRef) => (
            <MenuToggle
              ref={toggleRef}
              variant="plain"
              aria-label="Actions"
              isExpanded={kebabOpen}
              onClick={() => setKebabOpen((prev) => !prev)}
              icon={<EllipsisVIcon />}
            />
          )}
        >
          <DropdownList>
            <DropdownItem onClick={() => {}}>Export</DropdownItem>
            <DropdownItem onClick={() => {}}>Refresh</DropdownItem>
          </DropdownList>
        </Dropdown>
      </ToolbarItem>
    </>
  )

  const toolbarActions = []

  return (
    <PageLayout>
      <PageHeader
        title="Table Demo"
        data-testid="demo-page-header"
      />
      <PageTable
        {...view}
        tableColumns={tableColumns}
        toolbarFilters={toolbarFilters}
        toolbarContent={toolbarContent}
        toolbarActions={toolbarActions}
        rowActions={getJobRowActions(navigate)}
        emptyStateTitle="No automation jobs"
        emptyStateDescription="Get started by creating an automation job."
        emptyStateButtonText="Create job"
        emptyStateButtonClick={() => navigate('/form-demo')}
        errorStateTitle="Error loading automation jobs"
      />
    </PageLayout>
  )
}

export default TableDemo
