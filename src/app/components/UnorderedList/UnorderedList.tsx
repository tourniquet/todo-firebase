import { onAuthStateChanged } from 'firebase/auth'
import ListItem from '../ListItem/ListItem'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { auth } from '../../../../firebase-config'
import { TodoContext, TodoContextType, TodoProps } from '@/contexts/TodoContext'

const UlStyled = styled.ul`
  border-radius: 6px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
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
          key={i}
          todo={todo}
          index={i}
        />
      ))}
    </UlStyled>
  )
}
