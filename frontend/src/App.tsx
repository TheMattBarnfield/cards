import React, { useEffect, useState } from 'react';
import './App.css';
import socketio from 'socket.io-client'
import { parseCard, Card as CardModel } from './models/card';
import Name from './components/Name';
import Chat from './components/Chat';
import TurnOrder from './components/TurnOrder';
import CardDisplay from './components/CardDisplay/CardDisplay';
import User from './models/user'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBar from 'react-bootstrap/Navbar'
import { ChatMessage } from './models/chatMessage';
import Card from 'react-bootstrap/Card'

const CHAT_HISTORY_MAX_LENGTH = 15;

const io = socketio('/')

const App: React.FC<{}> = () => {
  const [turnOrder, setTurnOrder] = useState<User[]>([]);
  const [lastDrawnCard, setLastDrawnCard] = useState<CardModel>();
  const [userId, setUserId] = useState<string>('');
  const [currentTurnId, setCurrentTurnId] = useState<string>();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    io.on('set id', setUserId);
    io.on('card drawn', (response: any) => {
      const card = parseCard(response)
      setLastDrawnCard(card)
    });
    io.on('turn order', setTurnOrder)
    io.on('current turn', setCurrentTurnId)
    io.on('chat message', (message: ChatMessage) => setChatHistory(ch => 
      [message, ...ch].slice(0, CHAT_HISTORY_MAX_LENGTH)
    ))
  }, []);

  const getNameForId = (id: string) => {
    const user = turnOrder.find(user => user.id === id)
    return user && user.name
  }

  const usersTurn = currentTurnId === userId
  const currentTurnName = currentTurnId && getNameForId(currentTurnId)

  return (
    <div>
      <NavBar bg="primary" variant="dark" className="mb-5">
        <NavBar.Brand>Cards</NavBar.Brand>
      </NavBar>
      <Container>
        <Row>
          <Col xs={12} lg={4} className="d-flex flex-column align-items-center mb-4">
            <CardDisplay card={lastDrawnCard} />
            <Button 
              disabled={!usersTurn}
              variant="primary"
              onClick={drawCard}
            >Draw a card</Button>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card className='mb-3'>
              <Card.Header>Turn Order</Card.Header>
              <Card.Body>
                <Card.Title>{usersTurn ? 'Your' : `${currentTurnName}'s`} turn</Card.Title>
                <TurnOrder 
                  userId={userId}
                  turnOrder={turnOrder}
                  currentTurnId={currentTurnId}
                />
              </Card.Body>
              <Card.Footer>
                <Name io={io} />
              </Card.Footer>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={{span: "4", order: 'first' as any}}>
            <Chat 
              chatHistory={chatHistory}
              sendMessage={message => io.emit('send message', message)}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const drawCard = () => {
  io.emit('draw card')
}

export default App;
