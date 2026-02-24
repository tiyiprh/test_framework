import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  PageLayout,
  PageHeader,
  PageDetail,
  PageDetails,
  PageTabs,
  PageTab,
} from '@ansible/ansible-ui-framework'
import {
  Label,
  Flex,
  FlexItem,
} from '@patternfly/react-core'
import AngleLeftIcon from '@patternfly/react-icons/dist/esm/icons/angle-left-icon'
import { JobDetailsHeaderActions } from './jobRowActions'

function BackToTableTab() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/table-demo')
  }, [navigate])
  return null
}

const defaultResource = {
  name: 'Production Deployment Job',
  id: 'job-12345',
  status: 'Success',
  created: '2024-11-03 10:30:00',
  modified: '2024-11-03 11:45:00',
  executionTime: '15 minutes',
  owner: 'admin',
  organization: 'Engineering',
  tags: ['production', 'deployment', 'critical'],
  description: '—',
  type: 'manual',
  environment: '—',
  enabled: false,
}

function DetailsDemo() {
  const location = useLocation()
  const resourceData = location.state?.resource ?? defaultResource
  const tags = Array.isArray(resourceData.tags) ? resourceData.tags : defaultResource.tags

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return 'green'
      case 'Failed':
        return 'red'
      case 'Running':
        return 'blue'
      default:
        return 'grey'
    }
  }

  const breadcrumbs = [
    { label: 'Table Demo', to: '/table-demo' },
    { label: resourceData.name },
  ]

  return (
    <PageLayout>
      <PageHeader
        title={resourceData.name}
        breadcrumbs={breadcrumbs}
        headerActions={<JobDetailsHeaderActions resource={resourceData} />}
      />

      <PageTabs initialTabIndex={1}>
        <PageTab
          label={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <AngleLeftIcon />
              Back to Table Demo
            </span>
          }
        >
          <BackToTableTab />
        </PageTab>
        <PageTab label="Details">
          <PageDetails
            numberOfColumns="multiple"
            labelOrientation="vertical"
          >
            <PageDetail label="Resource ID">{resourceData.id}</PageDetail>
            <PageDetail label="Status">
              <Label color={getStatusColor(resourceData.status)}>
                {resourceData.status}
              </Label>
            </PageDetail>
            <PageDetail label="Name">{resourceData.name}</PageDetail>
            {resourceData.description != null && (
              <PageDetail label="Description">{resourceData.description}</PageDetail>
            )}
            <PageDetail label="Type">{resourceData.type ?? '—'}</PageDetail>
            <PageDetail label="Organization">{resourceData.organization ?? '—'}</PageDetail>
            <PageDetail label="Execution environment">{resourceData.environment ?? '—'}</PageDetail>
            <PageDetail label="Owner">{resourceData.owner ?? '—'}</PageDetail>
            <PageDetail label="Created date">{resourceData.created ?? '—'}</PageDetail>
            <PageDetail label="Last modified">{resourceData.modified ?? '—'}</PageDetail>
            <PageDetail label="Execution time">{resourceData.executionTime ?? '—'}</PageDetail>
            {resourceData.enabled != null && (
              <PageDetail label="Configuration enabled">{resourceData.enabled ? 'Yes' : 'No'}</PageDetail>
            )}
            <PageDetail label="Tags">
              <Flex spaceItems={{ default: 'spaceItemsSm' }}>
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <FlexItem key={tag}>
                      <Label color="blue">{tag}</Label>
                    </FlexItem>
                  ))
                ) : (
                  '—'
                )}
              </Flex>
            </PageDetail>
          </PageDetails>
        </PageTab>
      </PageTabs>
    </PageLayout>
  )
}

export default DetailsDemo
