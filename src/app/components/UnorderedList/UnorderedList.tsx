import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Checkbox, List } from 'antd'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { auth, db } from '../../../../firebase-config'
import { TodoContext } from '@/contexts/TodoContext'

const ListStyled = styled(List)`
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-top: 0;

  @media (max-width: 767px) {
    display: block;
  }
`

export default function UnorderedList (): JSX.Element {
  const { todos, getTodos, setTodos }: { todos?: any, getTodos?: any, setTodos?: any } = useContext(TodoContext)

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const uid = user.uid
        getTodos(uid)
      }
    })
  }, [])

  return (
    <ListStyled
      bordered
      dataSource={todos}
      renderItem={(todo: { id: string, done: boolean, todo: string }) => (
        <List.Item
          actions={[
            <a key='list-loadmore-edit'>{!todo.done && (<EditOutlined />)}</a>,
            <a key='list-loadmore-more' onClick={() => { void deleteTodo(todo.id) }}><CloseOutlined /></a>
          ]}
        >
          {todo.done && (<Checkbox defaultChecked disabled>{todo.todo}</Checkbox>)}
          {!todo.done && (<Checkbox onChange={() => { void doneTodo(todo.id) }}>{todo.todo}</Checkbox>)}
        </List.Item>
      )}
    />
  )
}
