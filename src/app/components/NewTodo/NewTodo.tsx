import { addDoc, Timestamp, serverTimestamp, FieldValue, updateDoc, doc } from 'firebase/firestore'
import { Button, DatePicker, Input, Space } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import { Dayjs } from 'dayjs'
import { useContext, useState } from 'react'
import styled from 'styled-components'

import { TodoContext, TodoContextType } from '../../../contexts/TodoContext'
import { db } from '../../../../firebase-config'

const ButtonStyled = styled(Button)`
  &.no-todos {
    border-bottom-right-radius: 6px;
  }
`
const InputStyled = styled(Input)`
  &.no-todos {
    border-bottom-left-radius: 6px;
  }
`

const SpaceCompact = styled(Space.Compact)`
  margin-bottom: 20px;
  width: 100%;
`

const CloseCircleFilledStyled = styled(CloseCircleFilled)`
  color: rgba(0, 0, 0, 0.25);
`

export default function NewTodo (): JSX.Element {
  const [date, setDate] = useState<Timestamp | FieldValue | undefined>(serverTimestamp)
  const { todoId, status, setStatus, todo, setTodo, user, todos, todosCollectionRef, getTodos } = useContext(TodoContext) as TodoContextType

  const createNewTodo = async (): Promise<void> => {
    await addDoc(todosCollectionRef, {
      todo,
      createdAt: serverTimestamp(),
      dueDate: date,
      uid: user.uid,
      done: false
    })

    getTodos(user?.uid)
    setTodo('')
  }

  const updateTodo = async (id: string): Promise<void> => {
    const todoRef = doc(db, 'todos', id)
    await updateDoc(todoRef, { todo, dueDate: date })

    setStatus('create')
    setTodo('')
    getTodos(user.uid)
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
    <SpaceCompact>
      <InputStyled
        className={todos.length === 0 ? 'no-todos' : undefined}
        onChange={e => setTodo(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') void createNewTodo() }}
        placeholder='some text here...'
        value={todo}
        suffix={<CloseCircleFilledStyled onClick={clearInput} />}
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
        type='primary'
        disabled={todo.length === 0}
      >
        {status === 'create' ? 'Submit' : 'Update'}
      </ButtonStyled>
    </SpaceCompact>
  )
}
