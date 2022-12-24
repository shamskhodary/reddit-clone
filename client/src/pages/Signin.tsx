import { Button, Modal } from 'antd'
import { FC, useState } from 'react'

const Signin:FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="signin-page">
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: '#F54708',
          borderRadius: '1.5rem',
          padding: '0.3rem 2rem',
          height: 'auto',
          fontWeight: 700,
        }}
      >
        Log In

      </Button>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  )
}

export default Signin
