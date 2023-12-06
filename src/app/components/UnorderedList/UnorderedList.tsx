import { onAuthStateChanged } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'
import ListItem from '../ListItem/ListItem'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { auth } from '../../../../firebase-config'
import { TodoContext, TodoContextType, TodoProps } from '@/contexts/TodoContext'

const UlStyled = styled.ul`
  border-radius: 6px;
  border: 1px solid rgb(217, 217, 217);
  border-top: 0px;
  list-style: none;
  margin-top: 0;
  padding: 0;

  &.no-todos {
    display: none;
  }
`

export default function UnorderedList (): JSX.Element {
  const { todos, getTodos } = useContext(TodoContext) as TodoContextType

  const calculateTime = (due: number = 0, status: boolean): string => {
    if (status) return 'done'

    const timeNow = Timestamp.now().seconds
    const hours = (due - timeNow) / 3600
    const days = Math.ceil(hours / 24)

    if (days < 2) {
      return 'danger'
    } else if (days >= 2 && days <= 8) {
      return 'warning'
    }

    return 'default'
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
    <UlStyled className={todos.length === 0 ? 'no-todos' : undefined}>
      {todos.length > 0 && todos.map((todo: TodoProps, i: number) => (
        <ListItem
          className={calculateTime(todo.dueDate?.seconds, todo.done)}
          key={i}
          todo={todo}
          index={i}
        />
      ))}
    </UlStyled>
  )
}
