'use client'

import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, db } from '../../firebase-config'

export const TodoContext = createContext({})

export function TodoProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  interface TodosProps {
    id: string
    setTodos: Dispatch<SetStateAction<TodosProps[]>>
  }

  const [todos, setTodos] = useState<TodosProps[]>([])
  const [user, loading] = useAuthState(auth)
  const todosCollectionRef = collection(db, 'todos')

  const getTodos = async (uid: string): Promise<void> => {
    const q = query(
      todosCollectionRef,
      where('uid', '==', uid),
      orderBy('createdAt')
      // ,orderBy('done')
    )
    const data = await getDocs(q)

    setTodos(data.docs.map((todos) => {
      return { ...todos.data(), id: todos.id }
    }))

    console.log(loading) // TODO: find a "better" solution for an unused error
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
