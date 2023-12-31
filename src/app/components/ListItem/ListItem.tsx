import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Modal } from 'antd'
import { useContext, useState } from 'react'
import styled from 'styled-components'

import { TodoContext, TodoContextType, TodoProps } from '@/contexts/TodoContext'
import { db } from '../../../../firebase-config'

const LiStyled = styled.li`
  align-items: center;
  border-block-end: 1px solid rgba(5, 5, 5, 0.06);
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;

  &:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &.default {
    background: #D1E7DD;
    border: 1px solid #A3CFBB;
    color: #0A3622;
  }

  &.warning {
    background: #FFF3CD;
    border: 1px solid #FFE69C;
    color: #664D03;
  }

  &.danger {
    background: #F8D7DA;
    border: 1px solid #F1AEB5;
    color: #58151C;
  }

  &.done {
    background: #E2E3E5;
    border-top: 1px solid #C4C8CB;
    border-bottom: 0;
    color: #2B2F32;
  }

  &.default, &.warning, &.danger {
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
  }

  &.default:first-child, &.warning:first-child, &.danger:first-child, &.done:first-child {
    border-top: 0;
  }
`

const LabelStyled = styled.label`
  align-items: center;
  display: inline-flex;
  width: 100%;
`

const TodoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  width: 100%;
`

const SpanStyled = styled.span`
  padding-inline-end: 8px;
  padding-inline-start: 8px;

  &.done {
    color: rgba(0, 0, 0, 0.25);
  }
`

const InputStyled = styled.input`
  cursor: pointer;

  &.disabled-input {
    cursor: not-allowed;
  }
`

const IconsBlock = styled.div`
  display: flex;
  width: 35px;
  justify-content: space-between;
  flex-direction: row-reverse;
`

function ListItem ({ todo, index, className }: { todo: TodoProps, index: number, className: string }): JSX.Element {
  const { todos, setTodos, loadTodoToInput } = useContext(TodoContext) as TodoContextType

  const [isModalOpen, setIsModalOpen] = useState(false)

  const doneTodo = async (id: string): Promise<void> => {
    const todo = doc(db, 'todos', id)
    await updateDoc(todo, { done: true })
    setTodos(todos.map((todo: TodoProps) => (todo.id === id) ? { ...todo, done: true } : todo))
  }

  const deleteTodo = async (id: string): Promise<void> => {
    const itemDoc = doc(db, 'todos', id)
    await deleteDoc(itemDoc)

    setTodos(todos.filter((todo: TodoProps) => todo.id !== id))
    setIsModalOpen(false)
  }

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  return (
    <LiStyled className={className} key={index}>
      <Modal title='Remove todo' open={isModalOpen} onOk={() => { void deleteTodo(todo.id) }} onCancel={handleCancel}>
        <p>Do you want to remove todo?</p>
      </Modal>

      <InputStyled
        type='checkbox'
        checked={todo.done}
        disabled={todo.done}
        onChange={() => { void doneTodo(todo.id) }}
        className={todo.done ? 'disabled-input' : undefined}
      />
      <LabelStyled>
        <TodoBlock className='todo-block'>
          <SpanStyled className={todo.done ? 'done' : undefined}>
            {todo.todo}
          </SpanStyled>
          <SpanStyled>
            {(typeof todo.dueDate !== 'string' && JSON.stringify(todo.dueDate) !== '{}') && todo.dueDate?.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </SpanStyled>
        </TodoBlock>
      </LabelStyled>

      <IconsBlock>
        <CloseOutlined onClick={showModal} />
        {!todo.done && (<EditOutlined onClick={() => loadTodoToInput(todo.id)} />)}
      </IconsBlock>
    </LiStyled>
  )
}

export default ListItem
