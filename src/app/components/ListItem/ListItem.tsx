import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useContext } from 'react'
import styled from 'styled-components'

import { TodoContext } from '@/contexts/TodoContext'
import { db } from '../../../../firebase-config'

const LiStyled = styled.li`
  align-items: center;
  border-block-end: 1px solid rgba(5, 5, 5, 0.06);
  display: flex;
  justify-content: space-between;
  padding-inline: 24px;
  padding: 12px 0;
`

const LabelStyled = styled.label`
  align-items: center;
  display: inline-flex;
`

const SpanStyled = styled.span`
  padding-inline-end: 8px;
  padding-inline-start: 8px;
`

const InputStyled = styled.input`
  cursor: pointer;

  &.disabled-input {
    cursor: not-allowed;
  }
`

interface TodoProps {
  id: string
  done: boolean
  todo: string
}

function ListItem ({ todo, index }: { todo: TodoProps, index: number }): JSX.Element {
  const { todos, setTodos }: { todos?: any, setTodos?: any } = useContext(TodoContext)

  const doneTodo = async (id: string): Promise<void> => {
    const todo = doc(db, 'todos', id)
    await updateDoc(todo, { done: true })
    setTodos(todos.map((todo: { id: string }) => (todo.id === id) ? { ...todo, done: true } : todo))
  }

  const deleteTodo = async (id: string): Promise<void> => {
    const itemDoc = doc(db, 'todos', id)
    await deleteDoc(itemDoc)

    setTodos(todos.filter((todo: { id: string }) => todo.id !== id))
  }

  return (
    <LiStyled key={index}>
      <LabelStyled>
        <InputStyled
          type='checkbox'
          checked={todo.done}
          disabled={todo.done}
          onChange={() => { void doneTodo(todo.id) }}
          className={todo.done ? 'disabled-input' : undefined}
        />
        <SpanStyled>
          {todo.todo}
        </SpanStyled>
      </LabelStyled>

      {!todo.done && (<EditOutlined />)}
      <CloseOutlined onClick={() => { void deleteTodo(todo.id) }} />
    </LiStyled>
  )
}

export default ListItem
