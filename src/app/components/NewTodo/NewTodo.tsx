import { addDoc, Timestamp, serverTimestamp, FieldValue } from 'firebase/firestore'
import { Button, DatePicker, Input, Space } from 'antd'
import { Dayjs } from 'dayjs'
import { useContext, useState } from 'react'
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
  const [date, setDate] = useState<Timestamp | FieldValue | undefined>()
  const { user, todosCollectionRef, getTodos }: { user?: { uid: string }, todosCollectionRef?: any, getTodos?: any } = useContext(TodoContext) // TODO: Find right type, not ANY

  const createNewTodo = async (): Promise<void> => {
    await addDoc(todosCollectionRef, {
      todo,
      createdAt: serverTimestamp(),
      dueDate: date,
      uid: user?.uid
    })
    await getTodos(user?.uid)
    setTodo('')
  }

  function getDate (value: Dayjs | null, dateString: string): void {
    if (value?.millisecond() != null) {
      const dueDate = JSON.stringify(value) !== '{}' ? Timestamp.fromMillis(value.millisecond()) : serverTimestamp() // TODO: Wrong date
      setDate(dueDate)
    }
  }

  return (
    <>
      <Space.Compact style={{ width: '100%' }}>
        <InputStyled
          onChange={e => setTodo(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') void createNewTodo() }}
          placeholder='some text here...'
          value={todo}
        />

        <DatePicker onChange={getDate} />

        <ButtonStyled
          onClick={() => { void createNewTodo() }}
          type='primary'
        >
          Submit
        </ButtonStyled>
      </Space.Compact>
    </>
  )
}
