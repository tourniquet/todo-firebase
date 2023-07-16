'use client'

import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { createContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../firebase-config'

export const TodoContext = createContext(null)

export function TodoProvider ({ children }): JSX.Element {
  const [todos, setTodos] = useState([])
  const [user, loading] = useAuthState(auth)
  const todosCollectionRef = collection(db, 'todos')

  const getTodos = async (uid) => {
    const q = query(
      todosCollectionRef,
      where('uid', '==', uid),
      orderBy('createdAt')
    )
    const data = await getDocs(q)

    setTodos(data.docs.map((todos) => {
      return { ...todos.data(), id: todos.id }
    }))
  }

  return (
    <TodoContext.Provider value={{
      user,
      todos,
      todosCollectionRef,
      setTodos,
      getTodos
    }}
    >
      {children}
    </TodoContext.Provider>
  )
}
