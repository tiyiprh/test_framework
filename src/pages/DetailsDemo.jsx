import { PageLayout, PageHeader, PageDetail, PageDetails } from '@ansible/ansible-ui-framework'
import {
  Card,
  CardBody,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Label,
  Flex,
  FlexItem,
} from '@patternfly/react-core'

function DetailsDemo() {
  const resourceData = {
    name: 'Production Deployment Job',
    id: 'job-12345',
    status: 'Success',
    created: '2024-11-03 10:30:00',
    modified: '2024-11-03 11:45:00',
    executionTime: '15 minutes',
    owner: 'admin',
    organization: 'Engineering',
    tags: ['production', 'deployment', 'critical'],
  }

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

  return (
    <PageLayout>
      <PageHeader
        title={resourceData.name}
        description="Resource details view demonstrating information display patterns"
      />

      <PageDetails>
        <PageDetail label="Resource ID">{resourceData.id}</PageDetail>
        <PageDetail label="Status">
          <Label color={getStatusColor(resourceData.status)}>
            {resourceData.status}
          </Label>
        </PageDetail>
        <PageDetail label="Owner">{resourceData.owner}</PageDetail>
        <PageDetail label="Organization">{resourceData.organization}</PageDetail>
        <PageDetail label="Created">{resourceData.created}</PageDetail>
        <PageDetail label="Last Modified">{resourceData.modified}</PageDetail>
        <PageDetail label="Execution Time">{resourceData.executionTime}</PageDetail>
        <PageDetail label="Tags">
          <Flex spaceItems={{ default: 'spaceItemsSm' }}>
            {resourceData.tags.map((tag) => (
              <FlexItem key={tag}>
                <Label color="blue">{tag}</Label>
              </FlexItem>
            ))}
          </Flex>
        </PageDetail>
      </PageDetails>

      <Card style={{ marginTop: '24px' }}>
        <CardBody>
          <h3>Alternative Pattern: Description List</h3>
          <DescriptionList isHorizontal>
            <DescriptionListGroup>
              <DescriptionListTerm>Name</DescriptionListTerm>
              <DescriptionListDescription>
                {resourceData.name}
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Status</DescriptionListTerm>
              <DescriptionListDescription>
                <Label color={getStatusColor(resourceData.status)}>
                  {resourceData.status}
                </Label>
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Owner</DescriptionListTerm>
              <DescriptionListDescription>
                {resourceData.owner}
              </DescriptionListDescription>
            </DescriptionListGroup>
            <DescriptionListGroup>
              <DescriptionListTerm>Organization</DescriptionListTerm>
              <DescriptionListDescription>
                {resourceData.organization}
              </DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </CardBody>
      </Card>
    </PageLayout>
  )
}

export default DetailsDemo
