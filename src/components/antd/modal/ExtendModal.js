import { Modal } from 'antd'
export function successModal(content) {
  Modal.success({
    content,
  })
}

export function errorModal(title, content) {
  Modal.error({
    title,
    content,
  })
}

export function warningModal(title, content) {
  Modal.warning({
    title,
    content,
  })
}
