import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  PageLayout,
  PageWizard,
  PageFormTextInput,
  PageFormSelect,
  PageFormCheckbox,
} from '@ansible/ansible-ui-framework'
import {
  Card,
  CardBody,
  CardTitle,
  Alert,
  List,
  ListItem,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Label,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Title,
  FormGroup,
  Divider,
  Checkbox,
} from '@patternfly/react-core'
import {
  ExternalLinkAltIcon,
} from '@patternfly/react-icons'

function ProviderWizard() {
  const navigate = useNavigate()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedTeams, setSelectedTeams] = useState([])

  const providerTypes = [
    {
      id: 'azure-ad',
      label: 'Azure Active Directory',
      description: 'Enterprise identity and access management for Azure',
    },
    {
      id: 'google',
      label: 'Google Workspace',
      description: 'Google OAuth 2.0 authentication for your organization',
    },
    {
      id: 'github',
      label: 'GitHub',
      description: 'Authenticate with GitHub accounts',
    },
    {
      id: 'saml',
      label: 'SAML 2.0',
      description: 'Generic SAML 2.0 identity provider integration',
    },
  ]

  const availableUsers = [
    'admin',
    'user1',
    'user2',
    'alice@company.com',
    'bob@company.com',
  ]

  const availableTeams = ['developers', 'qa', 'operations', 'management']

  const getProviderTypeName = (type) => {
    const names = {
      'azure-ad': 'Azure AD',
      'google': 'Google Workspace',
      'github': 'GitHub',
      'saml': 'SAML 2.0',
    }
    return names[type] || type
  }

  const getRegistrationInstructions = (providerType) => {
    const instructions = {
      'azure-ad': {
        title: 'Register Application in Azure Portal',
        steps: [
          {
            title: 'Create App Registration',
            description: 'Navigate to Azure Portal and create a new app registration',
            details: [
              'Go to Azure Active Directory > App registrations',
              'Click "New registration"',
              'Name: Ansible Automation Platform',
              'Supported account types: Single tenant',
              'Redirect URI: Web - http://localhost:8080/oauth/callback',
            ],
          },
          {
            title: 'Create Client Secret',
            description: 'Generate a client secret for authentication',
            details: [
              'Go to Certificates & secrets',
              'Click "New client secret"',
              'Add a description and set expiration',
              'Copy the secret value immediately',
            ],
          },
          {
            title: 'Configure API Permissions',
            description: 'Set up required Microsoft Graph permissions',
            details: [
              'Go to API permissions',
              'Add Microsoft Graph delegated permissions',
              'Required: User.Read, openid, profile, email',
              'Grant admin consent for the organization',
            ],
          },
        ],
        documentation: 'https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app',
      },
      'google': {
        title: 'Create OAuth 2.0 Credentials in Google Cloud',
        steps: [
          {
            title: 'Configure OAuth Consent Screen',
            description: 'Set up the consent screen shown to users',
            details: [
              'Go to Google Cloud Console > APIs & Services > OAuth consent screen',
              'Select Internal or External user type',
              'Fill in app name, user support email, developer email',
              'Add scopes: openid, profile, email',
            ],
          },
          {
            title: 'Create OAuth Client ID',
            description: 'Generate OAuth 2.0 credentials',
            details: [
              'Go to Credentials > Create Credentials > OAuth client ID',
              'Application type: Web application',
              'Name: Ansible Automation Platform',
              'Authorized redirect URIs: http://localhost:8080/oauth/callback',
              'Copy Client ID and Client Secret',
            ],
          },
        ],
        documentation: 'https://developers.google.com/identity/protocols/oauth2',
      },
      'github': {
        title: 'Create OAuth App in GitHub',
        steps: [
          {
            title: 'Register New OAuth Application',
            description: 'Create an OAuth app in your GitHub organization or account',
            details: [
              'Go to Settings > Developer settings > OAuth Apps',
              'Click "New OAuth App"',
              'Application name: Ansible Automation Platform',
              'Homepage URL: http://localhost:8080',
              'Authorization callback URL: http://localhost:8080/oauth/callback',
              'Generate a new client secret',
            ],
          },
        ],
        documentation: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app',
      },
      'saml': {
        title: 'Configure SAML 2.0 Identity Provider',
        steps: [
          {
            title: 'Gather IdP Information',
            description: 'Collect required information from your SAML provider',
            details: [
              'SAML SSO URL (or IdP Login URL)',
              'Identity Provider Entity ID',
              'X.509 Certificate',
            ],
          },
          {
            title: 'Configure Service Provider',
            description: 'Provide these values to your SAML IdP:',
            details: [
              'SP Entity ID: urn:ansible:automation-platform',
              'Assertion Consumer Service URL: http://localhost:8080/auth/saml/callback',
              'Name ID format: EmailAddress',
            ],
          },
          {
            title: 'Attribute Mapping',
            description: 'Configure SAML attribute mappings',
            details: [
              'email → Email address',
              'firstName → First name',
              'lastName → Last name',
              'groups → Group membership (optional)',
            ],
          },
        ],
        documentation: 'https://en.wikipedia.org/wiki/SAML_2.0',
      },
    }
    return instructions[providerType] || {}
  }

  const steps = [
    {
      id: 'provider-type',
      label: 'Select Provider Type',
      inputs: (
        <PageFormSelect
          name="providerType"
          label="Authentication Provider"
          placeholderText="Choose an identity provider"
          options={providerTypes.map((type) => ({
            label: type.label,
            description: type.description,
            value: type.id,
          }))}
          isRequired
          labelHelp="Select the external identity provider your organization uses for authentication"
        />
      ),
    },
      {
        id: 'external-setup',
        label: 'External Setup',
        inputs: (
          <>
            <PageFormCheckbox
              name="externalSetupComplete"
              label="I have completed the external setup in my provider's console"
            />
            <Divider style={{ margin: '1.5rem 0' }} />
            <div style={{ width: '100%' }}>
              <Title headingLevel="h2" size="xl" style={{ marginBottom: '1rem' }}>
                External Application Registration
              </Title>
              <Alert
                variant="info"
                isInline
                title="Complete these steps in your provider's console before continuing"
                style={{ marginBottom: '1.5rem' }}
              >
                <p>After selecting your provider type, detailed registration instructions will appear here.</p>
              </Alert>
              
              <Grid hasGutter>
                <GridItem span={12}>
                  <Card>
                    <CardTitle>
                      <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
                        <FlexItem>
                          <Label color="blue">General Steps</Label>
                        </FlexItem>
                        <FlexItem>Register Your Application</FlexItem>
                      </Flex>
                    </CardTitle>
                    <CardBody>
                      <List>
                        <ListItem>Navigate to your identity provider's developer console</ListItem>
                        <ListItem>Create a new OAuth application or SAML configuration</ListItem>
                        <ListItem>Configure redirect URIs and permissions</ListItem>
                        <ListItem>Copy the Client ID, Client Secret, and other credentials</ListItem>
                        <ListItem>Enter those credentials in the next step</ListItem>
                      </List>
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>
            </div>
          </>
        ),
      },
    {
      id: 'oauth-config',
      label: 'OAuth Configuration',
      inputs: (
        <>
          <PageFormTextInput
            name="providerName"
            label="Provider Name"
            placeholder="My Authentication Provider"
            isRequired
            helperText="A friendly name to identify this provider"
          />
          <PageFormTextInput
            name="clientId"
            label="Client ID"
            placeholder="Enter the Client ID from your provider"
            isRequired
            helperText="Application/Client ID from your OAuth provider"
          />
          <PageFormTextInput
            name="clientSecret"
            label="Client Secret"
            type="password"
            placeholder="Enter the Client Secret"
            isRequired
            helperText="Keep this secret secure - it will be encrypted"
            autoComplete="new-password"
          />
          <PageFormTextInput
            name="tenantId"
            label="Tenant ID (Azure AD only)"
            placeholder="Enter your Azure AD Tenant ID"
            helperText="Directory (tenant) ID - required for Azure AD, leave blank for other providers"
          />
          <PageFormTextInput
            name="redirectUri"
            label="Redirect URI"
            defaultValue="http://localhost:8080/oauth/callback"
            helperText="This URI must be configured in your OAuth provider"
          />
          <PageFormTextInput
            name="scopes"
            label="OAuth Scopes"
            placeholder="openid profile email"
            helperText="Space-separated list of OAuth scopes (optional)"
          />
        </>
      ),
    },
    {
      id: 'permissions',
      label: 'Permission Assignment',
      inputs: (
        <>
          {availableUsers.map((user) => (
            <PageFormCheckbox
              key={user}
              name={`user_${user}`}
              label={user}
              onChange={(checked) => {
                if (checked) {
                  setSelectedUsers((prev) => [...prev, user])
                } else {
                  setSelectedUsers((prev) => prev.filter(item => item !== user))
                }
              }}
            />
          ))}
          <Divider style={{ margin: '1rem 0' }} />
          {availableTeams.map((team) => (
            <PageFormCheckbox
              key={team}
              name={`team_${team}`}
              label={team}
              onChange={(checked) => {
                if (checked) {
                  setSelectedTeams((prev) => [...prev, team])
                } else {
                  setSelectedTeams((prev) => prev.filter(item => item !== team))
                }
              }}
            />
          ))}
        </>
      ),
    },
    {
      id: 'review',
      label: 'Review & Create',
      inputs: (
        <>
          <PageFormCheckbox
            name="reviewConfirmed"
            label="I have reviewed the configuration and am ready to create this provider"
          />
          <Divider style={{ margin: '1.5rem 0' }} />
          <div style={{ width: '100%' }}>
            <Title headingLevel="h2" size="xl" style={{ marginBottom: '1rem' }}>
              Review and Create
            </Title>
            <Alert
              variant="success"
              isInline
              title="Review your configuration before creating the provider"
              style={{ marginBottom: '2rem' }}
            >
              <p>Your provider configuration will be reviewed here before submission.</p>
            </Alert>

            <Card style={{ marginBottom: '1rem' }}>
              <CardTitle>Configuration Summary</CardTitle>
              <CardBody>
                <p>When you click "Create Provider", your authentication provider will be created with:</p>
                <List style={{ marginTop: '1rem' }}>
                  <ListItem>The selected provider type from Step 1</ListItem>
                  <ListItem>OAuth credentials configured in Step 3</ListItem>
                  <ListItem>User and team permissions assigned in Step 4</ListItem>
                </List>
              </CardBody>
            </Card>

            <Card style={{ marginBottom: '1rem' }}>
              <CardTitle>Selected Permissions</CardTitle>
              <CardBody>
                <Grid hasGutter>
                  <GridItem span={6}>
                    <Title headingLevel="h4" size="md" style={{ marginBottom: '0.5rem' }}>
                      Assigned Users
                    </Title>
                    {selectedUsers.length > 0 ? (
                      <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
                        {selectedUsers.map((user, i) => (
                          <FlexItem key={i}>
                            <Label color="blue">{user}</Label>
                          </FlexItem>
                        ))}
                      </Flex>
                    ) : (
                      <p>No users assigned</p>
                    )}
                  </GridItem>
                  <GridItem span={6}>
                    <Title headingLevel="h4" size="md" style={{ marginBottom: '0.5rem' }}>
                      Assigned Teams
                    </Title>
                    {selectedTeams.length > 0 ? (
                      <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
                        {selectedTeams.map((team, i) => (
                          <FlexItem key={i}>
                            <Label color="green">{team}</Label>
                          </FlexItem>
                        ))}
                      </Flex>
                    ) : (
                      <p>No teams assigned</p>
                    )}
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>

            <Alert
              variant="warning"
              isInline
              title="Security Reminder"
            >
              <List>
                <ListItem>
                  Client secrets are encrypted at rest and in transit
                </ListItem>
                <ListItem>
                  Only authorized users and teams can authenticate with this provider
                </ListItem>
                <ListItem>All authentication attempts are logged in the audit log</ListItem>
                <ListItem>
                  You can disable this provider at any time from the provider details page
                </ListItem>
              </List>
            </Alert>
          </div>
        </>
      ),
    },
  ]

  const onSubmit = async (wizardData) => {
    const newProvider = {
      id: Date.now(),
      type: wizardData.providerType,
      name: wizardData.providerName || `${getProviderTypeName(wizardData.providerType)} Provider`,
      status: 'active',
      createdAt: new Date().toISOString(),
      config: {
        clientId: wizardData.clientId,
        clientSecret: wizardData.clientSecret,
        tenantId: wizardData.tenantId,
        redirectUri: wizardData.redirectUri || 'http://localhost:8080/oauth/callback',
        scopes: wizardData.scopes,
      },
      permissions: {
        users: selectedUsers,
        teams: selectedTeams,
      },
      stats: {
        totalLogins: 0,
        activeUsers: 0,
        successRate: 0,
      },
    }

    // Store in localStorage for demo purposes
    const providers = JSON.parse(localStorage.getItem('authProviders') || '[]')
    providers.push(newProvider)
    localStorage.setItem('authProviders', JSON.stringify(providers))

    // Add audit log entry
    const auditLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    auditLogs.unshift({
      id: Date.now() + 1,
      timestamp: new Date().toISOString(),
      user: 'System',
      action: `Provider Created: ${newProvider.name}`,
      providerName: newProvider.name,
      status: 'Success',
      details: `New ${getProviderTypeName(wizardData.providerType)} provider '${newProvider.name}' was created.`,
    })
    localStorage.setItem('auditLogs', JSON.stringify(auditLogs))

    navigate('/providers')
  }

  return (
    <PageLayout>
      <PageWizard
        steps={steps}
        onSubmit={onSubmit}
        onCancel={() => navigate('/providers')}
        title="Create Authentication Provider"
        singleColumn
      />
    </PageLayout>
  )
}

export default ProviderWizard
