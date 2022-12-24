import { Button, Modal } from 'antd'
import { FC, useState } from 'react'

const Signup:FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="signup-page">
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: '#edeff1',
          borderRadius: '1.5rem',
          padding: '0.3rem 2rem',
          height: 'auto',
          fontWeight: 700,
          color: '#000',
        }}
      >
        Sign Up

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

export default Signup
