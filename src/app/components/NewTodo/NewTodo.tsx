import { addDoc, Timestamp, serverTimestamp, FieldValue, updateDoc, doc } from 'firebase/firestore'
import { Button, DatePicker, Input, Space } from 'antd'
import { Dayjs } from 'dayjs'
import { useContext, useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import styled from 'styled-components'

import { TodoContext } from '../../../contexts/TodoContext'
import { db } from '../../../../firebase-config'

const ButtonStyled = styled(Button)`
  border-bottom-right-radius: 0;

  &.no-todos {
    border-bottom-right-radius: 6px;
  }
`
const InputStyled = styled(Input)`
  border-bottom-left-radius: 0;

  &.no-todos {
    border-bottom-left-radius: 6px;
  }
`

export default function NewTodo (): JSX.Element {
  const [date, setDate] = useState<Timestamp | FieldValue | undefined>(serverTimestamp)
  const { todoId, status, setStatus, todo, setTodo, user, todos, todosCollectionRef, getTodos }: { todoId?: any, status?: any, setStatus?: any, todo?: any, setTodo?: any, user?: { uid: string }, todos?: any, todosCollectionRef?: any, getTodos?: any } = useContext(TodoContext) // TODO: Find right type, not ANY

  const createNewTodo = async (): Promise<void> => {
    await addDoc(todosCollectionRef, {
      todo,
      createdAt: serverTimestamp(),
      dueDate: date,
      uid: user?.uid,
      done: false
    })

    await getTodos(user?.uid)
    setTodo('')
  }

  const updateTodo = async (id: string): Promise<void> => {
    const todoRef = doc(db, 'todos', id)
    await updateDoc(todoRef, { todo, dueDate: date })

    setStatus('create')
    setTodo('')
    await getTodos(user?.uid)
  }

  function getDate (value: Dayjs | null): void {
    if (value?.isValid() !== undefined) {
      const dueDate = JSON.stringify(value) !== '{}' ? Timestamp.fromMillis(value.valueOf()) : serverTimestamp()
      setDate(dueDate)
    }
  }

  function clearInput (): void {
    setTodo('')
    setStatus('create')
  }

  return (
    <Space.Compact style={{ width: '100%' }}>
      <InputStyled
        className={todos.length === 0 ? 'no-todos' : undefined}
        onChange={e => setTodo(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') void createNewTodo() }}
        placeholder='some text here...'
        value={todo}
        suffix={<CloseCircleFilled onClick={clearInput} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
      />

      <DatePicker onChange={getDate} />

      <ButtonStyled
        className={todos.length === 0 ? 'no-todos' : undefined}
        onClick={() => {
          if (status === 'create') {
            void createNewTodo()
          } else {
            void updateTodo(todoId)
          }
        }}
        // onClick={(): Promise<void> => (status === 'create') ? createNewTodo() : updateTodo(todoId)}
        type='primary'
        disabled={todo.length === 0}
      >
        {status === 'create' ? 'Submit' : 'Update'}
      </ButtonStyled>
    </Space.Compact>
  )
}
