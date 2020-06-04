import React, { useEffect, useState } from 'react';
import './App.css';
import socketio from 'socket.io-client'
import { parseCard, Card } from './models/card';
import Name from './components/Name';
import TurnOrder from './components/TurnOrder';
import CardDisplay from './components/CardDisplay/CardDisplay';
import User, {parseUser} from './models/user'
import { isArray, every } from 'lodash';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBar from 'react-bootstrap/NavBar'


const io = socketio('http://localhost:8000')

const App: React.FC<{}> = () => {
  const [turnOrder, setTurnOrder] = useState<User[]>([]);
  const [lastDrawnCard, setLastDrawnCard] = useState<Card>();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    io.on('set id', (response: any) => {
      if (typeof response === 'string') {
        setUserId(response)
      } else {
        throw new Error(`Invalid user id: ${response}`)
      }
    });

    io.on('card drawn', (response: any) => {
      const card = parseCard(response)
      setLastDrawnCard(card)
    });

    io.on('turn order', (response: any) => {
      if(isArray(response) && every(response.map(parseUser))) {
        setTurnOrder(response)
      } else {
        throw new Error(`Invalid turn order: ${response}`)
      }
    });
  }, []);

  return (
    <div>
      <NavBar bg="primary" variant="dark" className="mb-2">
        <NavBar.Brand>Cards</NavBar.Brand>
      </NavBar>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={8}>
            {lastDrawnCard && <CardDisplay card={lastDrawnCard} />}
            <Button variant="primary" onClick={drawCard}>Draw a card</Button>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className="mb-2"><Name io={io} /></div>
            <TurnOrder userId={userId} turnOrder={turnOrder} />
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
