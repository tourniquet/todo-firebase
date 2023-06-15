import { Button, Input, Space } from 'antd'
import { useContext, useState } from 'react'
import { addDoc } from 'firebase/firestore'

import { TodoContext } from '../../contexts/TodoContext'

export default function NewTodo (): JSX.Element {
  const [todo, setTodo] = useState('')
  const { todosCollectionRef, getTodos } = useContext(TodoContext)

  const createNewTodo = async () => {
    await addDoc(todosCollectionRef, { todo })
    getTodos()
    setTodo('')
  }

  return (
    <>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          onChange={e => setTodo(e.target.value)}
          value={todo}
        />
        <Button
          onClick={createNewTodo}
          type='primary'
        >
          Submit
        </Button>
      </Space.Compact>
    </>
  )
}
