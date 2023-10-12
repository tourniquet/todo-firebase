'use client'

import { collection, getDocs, query, where, orderBy, CollectionReference } from 'firebase/firestore'
import React, { createContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../firebase-config'

export const TodoContext = createContext({})

interface TodoCollection {
  done: boolean
  todo: string
  index: number
}

interface TodoProps extends TodoCollection {
  id: string
}

export function TodoProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [todos, setTodos] = useState<TodoProps[]>([])
  const [user, loading] = useAuthState(auth)
  const todosCollectionRef = collection(db, 'todos') as CollectionReference<TodoCollection>

  const getTodos = async (uid: string): Promise<void> => {
    const q = query(
      todosCollectionRef,
      where('uid', '==', uid),
      orderBy('createdAt')
      // ,orderBy('done')
    )
    const data = await getDocs(q)
    setTodos(data.docs.map((todos) => ({ ...todos.data(), id: todos.id })))
  }

  console.log(loading) // TODO: find a "better" solution for an unused error

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
