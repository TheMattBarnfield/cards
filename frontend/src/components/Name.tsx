import React, {useState, FormEvent} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Name: React.FC<{io: SocketIOClient.Socket}> = ({io}) => {
  const [name, setName] = useState("")

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    io.emit('set name', name)
  }

  return (
    <Form onSubmit={onSubmit}>
      <div className="d-flex">
        <Form.Control 
          type="text" 
          placeholder="Your name" 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
        <Button 
          variant="primary" 
          type="submit"
          className="text-nowrap ml-2"
        >
          Set name
        </Button>
      </div>
    </Form>
  );
}

export default Name;
