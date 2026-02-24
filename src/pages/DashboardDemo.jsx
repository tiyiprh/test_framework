import { useState } from 'react'
import {
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Gallery,
  Grid,
  GridItem,
  Title,
  Progress,
  ProgressSize,
  List,
  ListItem,
  Label,
  Badge,
  Button,
  Flex,
  FlexItem,
  Alert,
  AlertGroup,
  Divider,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Tabs,
  Tab,
  TabTitleText,
  Bullseye,
  Tooltip,
} from '@patternfly/react-core'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InProgressIcon,
  CubeIcon,
  ServerIcon,
  UsersIcon,
  ClockIcon,
} from '@patternfly/react-icons'
import { PageLayout, PageHeader } from '@ansible/ansible-ui-framework'

function DashboardDemo() {
  const [activeTabKey, setActiveTabKey] = useState(0)

  const stats = [
    {
      title: 'Total Jobs',
      value: '1,247',
      icon: CubeIcon,
      color: 'blue',
      trend: '+12%',
    },
    {
      title: 'Active Hosts',
      value: '342',
      icon: ServerIcon,
      color: 'green',
      trend: '+5%',
    },
    {
      title: 'Users',
      value: '89',
      icon: UsersIcon,
      color: 'purple',
      trend: '+3',
    },
    {
      title: 'Avg Duration',
      value: '4.2m',
      icon: ClockIcon,
      color: 'cyan',
      trend: '-8%',
    },
  ]

  const recentJobs = [
    {
      id: 1,
      name: 'Deploy Production App',
      status: 'success',
      time: '2 mins ago',
      duration: '3m 45s',
    },
    {
      id: 2,
      name: 'Update Security Patches',
      status: 'running',
      time: 'Running',
      duration: '1m 20s',
    },
    {
      id: 3,
      name: 'Backup Database',
      status: 'failed',
      time: '15 mins ago',
      duration: '45s',
    },
    {
      id: 4,
      name: 'Configure Load Balancer',
      status: 'success',
      time: '1 hour ago',
      duration: '2m 15s',
    },
  ]

  const alerts = [
    {
      variant: 'warning',
      title: 'High CPU usage on web-server-01',
      description: 'CPU utilization has exceeded 85% for the past 10 minutes',
    },
    {
      variant: 'info',
      title: 'Scheduled maintenance tomorrow',
      description: 'Database maintenance window: 2:00 AM - 4:00 AM EST',
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon color="green" />
      case 'failed':
        return <ExclamationCircleIcon color="red" />
      case 'running':
        return <InProgressIcon color="blue" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'green'
      case 'failed':
        return 'red'
      case 'running':
        return 'blue'
      default:
        return 'grey'
    }
  }

  return (
    <PageLayout>
      <PageHeader title="Automation Dashboard" />

      {/* Alert Section */}
      <AlertGroup style={{ marginBottom: '24px' }}>
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            variant={alert.variant}
            title={alert.title}
            isInline
          >
            {alert.description}
          </Alert>
        ))}
      </AlertGroup>

      {/* Stats Cards */}
      <Gallery hasGutter minWidths={{ default: '250px' }} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} isRounded isCompact>
              <CardBody>
                <Flex
                  justifyContent={{ default: 'justifyContentSpaceBetween' }}
                  alignItems={{ default: 'alignItemsCenter' }}
                >
                  <FlexItem>
                    <div style={{ marginBottom: '8px' }}>
                      <small>{stat.title}</small>
                    </div>
                    <Title headingLevel="h2" size="2xl">
                      {stat.value}
                    </Title>
                    <Label color={stat.color} isCompact style={{ marginTop: '8px' }}>
                      {stat.trend}
                    </Label>
                  </FlexItem>
                  <FlexItem>
                    <Bullseye>
                      <Icon size="xl" color={`var(--pf-v5-global--${stat.color}-color-100)`} />
                    </Bullseye>
                  </FlexItem>
                </Flex>
              </CardBody>
            </Card>
          )
        })}
      </Gallery>

      <Grid hasGutter>
        <GridItem span={8}>
          {/* Recent Jobs Card */}
          <Card isRounded style={{ marginBottom: '24px' }}>
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h3" size="lg">
                  Recent Jobs
                </Title>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <List isPlain>
                {recentJobs.map((job) => (
                  <ListItem key={job.id}>
                    <Flex
                      justifyContent={{ default: 'justifyContentSpaceBetween' }}
                      alignItems={{ default: 'alignItemsCenter' }}
                      style={{ padding: '12px 0' }}
                    >
                      <FlexItem>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
                          <FlexItem>{getStatusIcon(job.status)}</FlexItem>
                          <FlexItem>
                            <div>
                              <p style={{ margin: 0 }}>{job.name}</p>
                              <small style={{ color: '#6a6e73' }}>
                                {job.time} • Duration: {job.duration}
                              </small>
                            </div>
                          </FlexItem>
                        </Flex>
                      </FlexItem>
                      <FlexItem>
                        <Label color={getStatusColor(job.status)}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Label>
                      </FlexItem>
                    </Flex>
                    <Divider />
                  </ListItem>
                ))}
              </List>
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Button variant="link">View all jobs</Button>
              </div>
            </CardBody>
          </Card>

          {/* Performance Metrics Tabs */}
          <Card isRounded>
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h3" size="lg">
                  Performance Metrics
                </Title>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Tabs
                activeKey={activeTabKey}
                onSelect={(event, tabIndex) => setActiveTabKey(tabIndex)}
              >
                <Tab eventKey={0} title={<TabTitleText>System Resources</TabTitleText>}>
                  <div style={{ padding: '16px 0' }}>
                    <h4 style={{ marginBottom: '16px' }}>CPU Usage</h4>
                    <Progress value={68} title="CPU" size={ProgressSize.lg} />

                    <h4 style={{ marginTop: '16px', marginBottom: '16px' }}>Memory Usage</h4>
                    <Progress value={45} title="Memory" size={ProgressSize.lg} />

                    <h4 style={{ marginTop: '16px', marginBottom: '16px' }}>Disk Usage</h4>
                    <Progress value={82} title="Disk" size={ProgressSize.lg} variant="warning" />
                  </div>
                </Tab>
                <Tab eventKey={1} title={<TabTitleText>Network</TabTitleText>}>
                  <div style={{ padding: '16px 0' }}>
                    <DescriptionList isHorizontal>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Throughput</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Label color="green">125 MB/s</Label>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Active Connections</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Badge>1,247</Badge>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Latency</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Label color="green">12ms avg</Label>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </div>
                </Tab>
                <Tab eventKey={2} title={<TabTitleText>Database</TabTitleText>}>
                  <div style={{ padding: '16px 0' }}>
                    <DescriptionList isHorizontal>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Query Performance</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Label color="green">Optimal</Label>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Connection Pool</DescriptionListTerm>
                        <DescriptionListDescription>45 / 100</DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Cache Hit Ratio</DescriptionListTerm>
                        <DescriptionListDescription>94.5%</DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem span={4}>
          {/* Quick Actions */}
          <Card isRounded style={{ marginBottom: '24px' }}>
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h3" size="lg">
                  Quick Actions
                </Title>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
                <FlexItem>
                  <Button variant="primary" isBlock>
                    Run New Job
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button variant="secondary" isBlock>
                    Create Template
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button variant="secondary" isBlock>
                    Manage Inventories
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button variant="link" isBlock>
                    View All Actions
                  </Button>
                </FlexItem>
              </Flex>
            </CardBody>
          </Card>

          {/* Active Tags */}
          <Card isRounded style={{ marginBottom: '24px' }}>
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h3" size="lg">
                  Active Tags
                </Title>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div style={{ marginBottom: '12px' }}>
                <strong>Environments:</strong>
                <div style={{ marginTop: '8px' }}>
                  <Label color="blue" style={{ marginRight: '8px' }}>Production</Label>
                  <Label color="blue" style={{ marginRight: '8px' }}>Staging</Label>
                  <Label color="blue">Development</Label>
                </div>
              </div>
              <div>
                <strong>Regions:</strong>
                <div style={{ marginTop: '8px' }}>
                  <Label color="purple" style={{ marginRight: '8px' }}>US-East</Label>
                  <Label color="purple" style={{ marginRight: '8px' }}>US-West</Label>
                  <Label color="purple">EU-Central</Label>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* System Health */}
          <Card isRounded>
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h3" size="lg">
                  System Health
                </Title>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <List>
                <ListItem>
                  <Flex alignItems={{ default: 'alignItemsCenter' }}>
                    <FlexItem spacer={{ default: 'spacerSm' }}>
                      <CheckCircleIcon color="green" />
                    </FlexItem>
                    <FlexItem>API Gateway</FlexItem>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems={{ default: 'alignItemsCenter' }}>
                    <FlexItem spacer={{ default: 'spacerSm' }}>
                      <CheckCircleIcon color="green" />
                    </FlexItem>
                    <FlexItem>Database</FlexItem>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems={{ default: 'alignItemsCenter' }}>
                    <FlexItem spacer={{ default: 'spacerSm' }}>
                      <ExclamationCircleIcon color="orange" />
                    </FlexItem>
                    <FlexItem>
                      <Tooltip content="High latency detected">
                        <span>Message Queue</span>
                      </Tooltip>
                    </FlexItem>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems={{ default: 'alignItemsCenter' }}>
                    <FlexItem spacer={{ default: 'spacerSm' }}>
                      <CheckCircleIcon color="green" />
                    </FlexItem>
                    <FlexItem>Cache Server</FlexItem>
                  </Flex>
                </ListItem>
              </List>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageLayout>
  )
}

export default DashboardDemo
