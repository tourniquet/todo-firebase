'use client'

import { collection, getDocs } from 'firebase/firestore'
import { createContext, useState } from 'react'

import { db } from '../../firebase-config'

export const TodoContext = createContext(null)

export function TodoProvider ({ children }): JSX.Element {
  const [todos, setTodos] = useState([])
  const todosCollectionRef = collection(db, 'todos')

  const getTodos = async () => {
    const data = await getDocs(todosCollectionRef)
    setTodos(data.docs.map((todo) => ({ ...todo.data(), id: todo.id })))
  }

  return (
    <TodoContext.Provider value={{ todos, todosCollectionRef, setTodos, getTodos }}>
      {children}
    </TodoContext.Provider>
  )
}
