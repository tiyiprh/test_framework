import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PageActionType,
  PageActionSelection,
} from '@ansible/ansible-ui-framework'
import {
  Button,
  Dropdown,
  DropdownList,
  DropdownItem,
  Flex,
  FlexItem,
  MenuToggle,
} from '@patternfly/react-core'
import PencilAltIcon from '@patternfly/react-icons/dist/esm/icons/pencil-alt-icon'
import TrashIcon from '@patternfly/react-icons/dist/esm/icons/trash-icon'
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon'

/** Shared handler for delete (row and details) */
export function onDeleteJob(item) {
  console.log('Delete', item)
}

/** Row actions for PageTable: Edit navigates to form, Delete in kebab (danger). Pass navigate from the page. */
export function getJobRowActions(navigate) {
  return [
    {
      type: PageActionType.Button,
      selection: PageActionSelection.Single,
      label: 'Edit',
      icon: PencilAltIcon,
      onClick: (item) => navigate('/form-demo', { state: { resource: item, isEdit: true } }),
      isPinned: true,
    },
    {
      type: PageActionType.Button,
      selection: PageActionSelection.Single,
      label: 'Delete',
      icon: TrashIcon,
      isDanger: true,
      onClick: onDeleteJob,
    },
  ]
}

/**
 * Renders the same actions as the table row in the details page header:
 * primary Edit button (navigates to edit form), then kebab with Delete (danger).
 */
export function JobDetailsHeaderActions({ resource }) {
  const navigate = useNavigate()
  const [kebabOpen, setKebabOpen] = useState(false)

  if (!resource) return null

  return (
    <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
      <FlexItem>
        <Button
          variant="primary"
          icon={<PencilAltIcon />}
          onClick={() => navigate('/form-demo', { state: { resource, isEdit: true } })}
        >
          Edit
        </Button>
      </FlexItem>
      <FlexItem>
        <Dropdown
          isOpen={kebabOpen}
          onOpenChange={setKebabOpen}
          onSelect={() => setKebabOpen(false)}
          popperProps={{ placement: 'bottom-end' }}
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
            <DropdownItem
              key="delete"
              icon={<TrashIcon />}
              isDanger
              onClick={() => {
                onDeleteJob(resource)
                setKebabOpen(false)
              }}
            >
              Delete
            </DropdownItem>
          </DropdownList>
        </Dropdown>
      </FlexItem>
    </Flex>
  )
}
