import { PageLayout, PageHeader } from '@ansible/ansible-ui-framework'
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Checkbox,
  Radio,
  ActionGroup,
  Button,
  Card,
  CardBody,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core'
import { useState } from 'react'

function FormDemo() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    enabled: false,
    type: 'manual',
    environment: '',
  })

  const environments = ['', 'Development', 'Staging', 'Production']

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Form submitted! Check console for data.')
  }

  return (
    <PageLayout>
      <PageHeader
        title="Form Components Demo"
        description="Examples of form inputs and patterns using PatternFly components"
      />
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup label="Name" isRequired fieldId="name">
              <TextInput
                isRequired
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(event, value) =>
                  setFormData({ ...formData, name: value })
                }
              />
            </FormGroup>

            <FormGroup label="Description" fieldId="description">
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={(event, value) =>
                  setFormData({ ...formData, description: value })
                }
                rows={4}
              />
            </FormGroup>

            <FormGroup label="Type" isRequired fieldId="type">
              <Radio
                isChecked={formData.type === 'manual'}
                name="type"
                onChange={() => setFormData({ ...formData, type: 'manual' })}
                label="Manual"
                id="manual"
              />
              <Radio
                isChecked={formData.type === 'automated'}
                name="type"
                onChange={() =>
                  setFormData({ ...formData, type: 'automated' })
                }
                label="Automated"
                id="automated"
              />
            </FormGroup>

            <FormGroup label="Environment" fieldId="environment">
              <FormSelect
                id="environment"
                value={formData.environment}
                onChange={(event, value) =>
                  setFormData({ ...formData, environment: value })
                }
              >
                {environments.map((env, index) => (
                  <FormSelectOption
                    key={index}
                    value={env}
                    label={env || 'Select an environment...'}
                  />
                ))}
              </FormSelect>
            </FormGroup>

            <FormGroup fieldId="enabled">
              <Checkbox
                label="Enable this configuration"
                id="enabled"
                name="enabled"
                isChecked={formData.enabled}
                onChange={(event, checked) =>
                  setFormData({ ...formData, enabled: checked })
                }
              />
            </FormGroup>

            <ActionGroup>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="link"
                onClick={() =>
                  setFormData({
                    name: '',
                    description: '',
                    enabled: false,
                    type: 'manual',
                    environment: '',
                  })
                }
              >
                Reset
              </Button>
            </ActionGroup>
          </Form>
        </CardBody>
      </Card>
    </PageLayout>
  )
}

export default FormDemo
