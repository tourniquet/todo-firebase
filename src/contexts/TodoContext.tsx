'use client'

import { collection, getDocs, query, where, orderBy, CollectionReference, Timestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { User } from 'firebase/auth'
import React, { createContext, useState } from 'react'

import { auth, db } from '../../firebase-config'

export const TodoContext = createContext({})

interface TodoCollection {
  done: boolean
  todo: string
  dueDate: Timestamp | undefined
  createdAt: Timestamp | undefined
  uid: string
}

export interface TodoProps extends TodoCollection {
  id: string
}

export interface TodoContextType {
  todoId: string
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  user: User
  todos: TodoProps[]
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>
  getTodos: (uid: string) => void
  loadTodoToInput: (id: string) => void
  todosCollectionRef: CollectionReference<TodoCollection>
}

export function TodoProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [todoId, setTodoId] = useState('')
  const [status, setStatus] = useState('create')
  const [todo, setTodo] = useState('')
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

  function loadTodoToInput (id: string): void {
    setTodoId(id)
    setStatus('edit')

    const todo = todos.filter((todo) => todo.id === id)
    setTodo(todo[0].todo)
  }

  console.log(loading) // TODO: find a "better" solution for an unused error

  return (
    <TodoContext.Provider value={{
      todoId,
      setTodoId,
      status,
      setStatus,
      todo,
      user,
      todos,
      todosCollectionRef,
      setTodo,
      setTodos,
      getTodos,
      loadTodoToInput
    }}
    >
      {children}
    </TodoContext.Provider>
  )
}
