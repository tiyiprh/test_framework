import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  PageLayout,
  PageHeader,
  PageBody,
} from '@ansible/ansible-ui-framework'
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Checkbox,
  Radio,
  ActionGroup,
  Button,
  Grid,
  GridItem,
  Select,
  SelectList,
  SelectOption,
  MenuToggle,
  Title,
  Popover,
  FormGroupLabelHelp,
} from '@patternfly/react-core'

const initialFormState = {
  name: '',
  description: '',
  organization: '',
  enabled: false,
  type: 'manual',
  environment: '',
}

function FormDemo() {
  const navigate = useNavigate()
  const location = useLocation()
  const editingResource = location.state?.resource
  const isEdit = Boolean(location.state?.isEdit && editingResource)

  const [formData, setFormData] = useState(initialFormState)
  const [environmentOpen, setEnvironmentOpen] = useState(false)
  const [organizationOpen, setOrganizationOpen] = useState(false)

  useEffect(() => {
    if (editingResource) {
      setFormData({
        name: editingResource.name ?? '',
        description: editingResource.description && editingResource.description !== '—' ? editingResource.description : '',
        organization: editingResource.organization && editingResource.organization !== '—' ? editingResource.organization : '',
        enabled: Boolean(editingResource.enabled),
        type: editingResource.type === 'automated' ? 'automated' : 'manual',
        environment: editingResource.environment && editingResource.environment !== '—' ? editingResource.environment : '',
      })
    }
  }, [editingResource])

  const organizations = [
    { value: 'Default', label: 'Default' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Operations', label: 'Operations' },
  ]

  const environments = [
    { value: 'Development', label: 'Development' },
    { value: 'Staging', label: 'Staging' },
    { value: 'Production', label: 'Production' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const resource = {
      name: formData.name,
      id: isEdit ? editingResource.id : `job-${Date.now()}`,
      status: isEdit ? (editingResource.status ?? 'Success') : 'Success',
      created: isEdit ? (editingResource.created ?? now) : now,
      modified: now,
      executionTime: isEdit ? (editingResource.executionTime ?? '—') : '—',
      owner: isEdit ? (editingResource.owner ?? '—') : '—',
      organization: formData.organization || '—',
      description: formData.description || '—',
      type: formData.type,
      environment: formData.environment || '—',
      enabled: formData.enabled,
      tags: isEdit && Array.isArray(editingResource.tags) ? editingResource.tags : [],
    }
    navigate('/details-demo', { state: { resource } })
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const breadcrumbs = [
    { label: 'Table Demo', to: '/table-demo' },
    { label: isEdit ? `Edit ${editingResource?.name ?? 'item'}` : 'Form components demo' },
  ]

  return (
    <PageLayout>
      <PageHeader
        title={isEdit ? `Edit ${editingResource?.name ?? 'item'}` : 'Form components demo'}
        breadcrumbs={breadcrumbs}
      />
      <PageBody>
        <Form onSubmit={handleSubmit}>
          <Grid hasGutter md={4}>
            <GridItem md={4}>
              <FormGroup label="Name" isRequired fieldId="name">
                <TextInput
                  isRequired
                  id="name"
                  value={formData.name}
                  onChange={(_event, value) => handleInputChange('name', value)}
                  placeholder="Enter name"
                />
              </FormGroup>
            </GridItem>

            <GridItem md={12}>
              <FormGroup label="Description" fieldId="description">
                <TextArea
                  id="description"
                  value={formData.description}
                  onChange={(_event, value) =>
                    handleInputChange('description', value)
                  }
                  rows={1}
                  placeholder="Enter description"
                  resizeOrientation="vertical"
                />
              </FormGroup>
            </GridItem>

            <GridItem md={4}>
              <FormGroup label="Organization" fieldId="organization">
                <Select
                  id="organization"
                  isOpen={organizationOpen}
                  onOpenChange={setOrganizationOpen}
                  selected={formData.organization}
                  onSelect={(_event, value) => {
                    handleInputChange('organization', value)
                    setOrganizationOpen(false)
                  }}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setOrganizationOpen(!organizationOpen)}
                      isExpanded={organizationOpen}
                      style={{ width: '100%' }}
                    >
                      {formData.organization
                        ? organizations.find((o) => o.value === formData.organization)?.label ?? formData.organization
                        : 'Select an organization'}
                    </MenuToggle>
                  )}
                >
                  <SelectList>
                    {organizations.map((opt) => (
                      <SelectOption key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectOption>
                    ))}
                  </SelectList>
                </Select>
              </FormGroup>
            </GridItem>

            <GridItem md={4}>
              <FormGroup label="Execution environment" fieldId="environment">
                <Select
                  id="environment"
                  isOpen={environmentOpen}
                  onOpenChange={setEnvironmentOpen}
                  selected={formData.environment}
                  onSelect={(_event, value) => {
                    handleInputChange('environment', value)
                    setEnvironmentOpen(false)
                  }}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setEnvironmentOpen(!environmentOpen)}
                      isExpanded={environmentOpen}
                      style={{ width: '100%' }}
                    >
                      {formData.environment
                        ? environments.find((e) => e.value === formData.environment)?.label ?? formData.environment
                        : 'Select an execution environment'}
                    </MenuToggle>
                  )}
                >
                  <SelectList>
                    {environments.map((opt) => (
                      <SelectOption key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectOption>
                    ))}
                  </SelectList>
                </Select>
              </FormGroup>
            </GridItem>

            <GridItem md={4}>
              <FormGroup label="Type" isRequired fieldId="type">
                <Radio
                  isChecked={formData.type === 'manual'}
                  name="type"
                  onChange={() => handleInputChange('type', 'manual')}
                  label="Manual"
                  id="manual"
                />
                <Radio
                  isChecked={formData.type === 'automated'}
                  name="type"
                  onChange={() => handleInputChange('type', 'automated')}
                  label="Automated"
                  id="automated"
                />
              </FormGroup>
            </GridItem>

            <GridItem md={12}>
              <Title headingLevel="h2" size="lg" style={{ marginTop: '24px', marginBottom: '16px' }}>
                Options
              </Title>
              <FormGroup fieldId="enabled">
                <Checkbox
                  label={
                    <>
                      Enable this configuration
                      <span
                        style={{ display: 'inline-flex', marginLeft: '4px', verticalAlign: 'middle' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Popover
                          bodyContent="When enabled, this configuration will be applied when the job runs."
                          triggerAction="click"
                          showClose={false}
                        >
                          <FormGroupLabelHelp aria-label="More info for enable configuration" />
                        </Popover>
                      </span>
                    </>
                  }
                  id="enabled"
                  isChecked={formData.enabled}
                  onChange={(_event, checked) =>
                    handleInputChange('enabled', checked)
                  }
                />
              </FormGroup>
            </GridItem>
          </Grid>

          <ActionGroup style={{ marginTop: '24px' }}>
            <Button variant="primary" type="submit">
              {isEdit ? 'Save' : 'Create item'}
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setFormData(initialFormState)
                if (isEdit && editingResource) {
                  navigate('/details-demo', { state: { resource: editingResource } })
                } else {
                  navigate('/table-demo')
                }
              }}
            >
              Cancel
            </Button>
          </ActionGroup>
        </Form>
      </PageBody>
    </PageLayout>
  )
}

export default FormDemo
