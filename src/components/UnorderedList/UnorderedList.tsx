import { useContext, useEffect } from 'react'
import { List } from 'antd'

import { TodoContext } from '@/contexts/TodoContext'
import { deleteDoc, doc } from 'firebase/firestore'

import { db } from '../../../firebase-config'

export default function UnorderedList (): JSX.Element {
  const { todos, getTodos, setTodos } = useContext(TodoContext)

  const deleteTodo = async (id) => {
    const itemDoc = doc(db, 'todos', id)
    await deleteDoc(itemDoc)

    setTodos(todos.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <List
      bordered
      dataSource={todos}
      renderItem={(todo, index) => (
        <List.Item
          actions={[
            <a key='list-loadmore-edit'>edit</a>,
            <a key='list-loadmore-more' onClick={() => deleteTodo(todo.id)}>remove</a>
          ]}
        >
          {todo.todo}
        </List.Item>
      )}
    />
  )
}
