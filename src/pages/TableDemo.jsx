import { useState } from 'react'
import { PageLayout, PageHeader, PageTable } from '@ansible/ansible-ui-framework'

function TableDemo() {
  const [items] = useState([
    { id: 1, name: 'Automation Job 1', status: 'Success', created: '2024-11-03' },
    { id: 2, name: 'Automation Job 2', status: 'Running', created: '2024-11-03' },
    { id: 3, name: 'Automation Job 3', status: 'Failed', created: '2024-11-02' },
    { id: 4, name: 'Automation Job 4', status: 'Success', created: '2024-11-02' },
    { id: 5, name: 'Automation Job 5', status: 'Pending', created: '2024-11-01' },
  ])

  const tableColumns = [
    {
      header: 'Name',
      cell: (item) => item.name,
      sort: 'name',
    },
    {
      header: 'Status',
      cell: (item) => item.status,
      sort: 'status',
    },
    {
      header: 'Created',
      cell: (item) => item.created,
      sort: 'created',
    },
  ]

  return (
    <PageLayout>
      <PageHeader
        title="Ansible UI Framework Demo"
        description="A demonstration of Ansible UI Framework components with PatternFly"
        data-testid="demo-page-header"
      />
      <PageTable
        data-testid="demo-page-table"
        tableColumns={tableColumns}
        itemCount={items.length}
        pageItems={items}
        toolbarFilters={[]}
        emptyStateTitle="No automation jobs"
        errorStateTitle="Error loading automation jobs"
      />
    </PageLayout>
  )
}

export default TableDemo
