import React, {useState, FormEvent} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';

const Name: React.FC<{io: SocketIOClient.Socket}> = ({io}) => {
  const [name, setName] = useState("")

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    io.emit('set name', name)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col>
          <Form.Control 
            type="text" 
            placeholder="Your name" 
            value={name} 
            onChange={e => setName(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Set name
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default Name;
