import { onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import ListItem from '../ListItem/ListItem'

import { auth } from '../../../../firebase-config'
import { TodoContext } from '@/contexts/TodoContext'

const UlStyled = styled.ul`
  border-radius: 6px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border: 1px solid rgb(217, 217, 217);
  border-top: 0px;
  list-style: none;
  margin-top: 0;
`

interface TodoProps {
  id: string
  done: boolean
  todo: string
  index: number
  handleCheckbox: Function
}

export default function UnorderedList (): JSX.Element {
  const { todos, getTodos }: { todos?: any, getTodos?: any } = useContext(TodoContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const uid = user.uid
        getTodos(uid)
      }
    })
  }, [])

  return (
    <UlStyled>
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
