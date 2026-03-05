import {
  Status,
  IconStatus,
} from '@patternfly/react-component-groups/dist/esm/Status'
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon'
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon'
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon'
import InProgressIcon from '@patternfly/react-icons/dist/esm/icons/in-progress-icon'

/**
 * Maps job status strings (case-insensitive) to Status component props.
 * Uses the PatternFly Status component from component-groups.
 * @see https://www.patternfly.org/component-groups/status-and-state-indicators/status#basic-status
 */
const STATUS_CONFIG = {
  success: {
    status: IconStatus.success,
    icon: CheckCircleIcon,
  },
  failed: {
    status: IconStatus.danger,
    icon: ExclamationCircleIcon,
  },
  running: {
    status: IconStatus.info,
    icon: InProgressIcon,
  },
  pending: {
    status: IconStatus.warning,
    icon: ExclamationTriangleIcon,
  },
}

function getStatusConfig(statusStr) {
  const key = (statusStr || '').toLowerCase()
  return (
    STATUS_CONFIG[key] ?? {
      status: IconStatus.warning,
      icon: ExclamationTriangleIcon,
    }
  )
}

/**
 * Renders a job status using the PatternFly Status component.
 * @param {string} status - Status value (Success, Failed, Running, Pending, etc.)
 * @param {object} props - Additional props passed to Status (e.g. iconOnly, description)
 */
export function JobStatus({ status, ...props }) {
  const config = getStatusConfig(status)
  const Icon = config.icon
  const label =
    typeof status === 'string'
      ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
      : status

  return (
    <Status
      status={config.status}
      label={label}
      icon={<Icon />}
      iconTitle={label}
      {...props}
    />
  )
}
