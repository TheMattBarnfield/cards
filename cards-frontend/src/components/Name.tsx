import React, {useState, FormEvent} from 'react'

const Name: React.FC<{io: SocketIOClient.Socket}> = ({io}) => {
  const [name, setName] = useState("")

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    io.emit('set name', name)
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input value={name} onChange={e => setName(e.target.value)}></input>
        <button type="submit">Change name</button>
      </div>
    </form>
  );
}

export default Name;
