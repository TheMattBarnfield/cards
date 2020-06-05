import React, {useState, FormEvent} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ChatMessage } from '../models/chatMessage'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

interface Props {
  sendMessage: (message: string) => void
  chatHistory: ChatMessage[]
}

const Chat: React.FC<Props> = ({sendMessage, chatHistory}) => {
  const [message, setMessage] = useState("")

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(message)
    setMessage("")
  }

  return (
    <Card>
      <Card.Header>Chat</Card.Header>
      <Card.Body style={{height: "20em", overflowY: "scroll", display: 'flex', flexDirection: 'column-reverse'}}>
      {chatHistory.map(({sender, message, fromServer}) => fromServer
        ? <Alert variant='info'>{message}</Alert>
        : <span><strong>{sender}:</strong> {message}</span>
      )}
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={onSubmit}>
          <div className="d-flex">
            <Form.Control 
              type="text" 
              placeholder="Send a message..." 
              value={message} 
              onChange={e => setMessage(e.target.value)}
            />
            <Button 
              variant="primary" 
              type="submit"
              className="text-nowrap ml-2"
            >
              Send
            </Button>
          </div>
        </Form>
      </Card.Footer>
    </Card>
  );
}

export default Chat;
