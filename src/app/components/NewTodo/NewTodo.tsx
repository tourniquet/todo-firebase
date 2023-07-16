import { Button, DatePicker, Input, Space } from 'antd'
import { useContext, useState } from 'react'
import { addDoc, Timestamp, serverTimestamp } from 'firebase/firestore'
import styled from 'styled-components'

import { TodoContext } from '../../../contexts/TodoContext'

const ButtonStyled = styled(Button)`
  border-bottom-right-radius: 0;
`
const InputStyled = styled(Input)`
  border-bottom-left-radius: 0;
`

export default function NewTodo (): JSX.Element {
  const [todo, setTodo] = useState('')
  const [date, setDate] = useState('')
  const { user, todosCollectionRef, getTodos } = useContext(TodoContext)

  const createNewTodo = async () => {
    await addDoc(todosCollectionRef, {
      todo,
      createdAt: serverTimestamp(),
      dueDate: date,
      uid: user.uid
    })
    getTodos(user.uid)
    setTodo('')
  }

  function getDate (date: {}): void {
    const dueDate = date ? Timestamp.fromDate(date.$d) : serverTimestamp()
    setDate(dueDate)
  }

  return (
    <>
      <Space.Compact style={{ width: '100%' }}>
        <InputStyled
          onChange={e => setTodo(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') createNewTodo() }}
          placeholder='some text here...'
          value={todo}
        />

        <DatePicker onChange={getDate} />

        <ButtonStyled
          onClick={createNewTodo}
          type='primary'
        >
          Submit
        </ButtonStyled>
      </Space.Compact>
    </>
  )
}
