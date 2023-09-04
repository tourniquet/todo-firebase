import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { Avatar, Button } from 'antd'
import styled from 'styled-components'

import { auth } from '../../../../firebase-config'
import { TodoContext } from '../../../contexts/TodoContext'

const AvatarStyled = styled(Avatar)`
  @media (min-width: 970px) {
    float: right;
    margin-right: 465px;
  }
`
const ButtonStyled = styled(Button)`
  @media (min-width: 970px) {
    margin-left: 465px;
  }
`

export default function Authentication (): JSX.Element {
  const { user, setTodos }: { user?: { photoURL: string }, setTodos?: any } = useContext(TodoContext) // TODO: Find right types, not ANY

  const googleProvider = new GoogleAuthProvider()
  const googleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log(result) // TODO: find a "better" solution for an unused error
    } catch (error) {
      console.log(error)
    }
  }

  function logOut (): void {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Sign-out successful')
        setTodos([])
      })
      .catch((error) => {
        // An error happened.
        console.log('An error happened', error)
      })
  }

  return (
    <>
      {user !== null
        ? (
          <>
            <ButtonStyled type='primary' onClick={logOut}>Log out</ButtonStyled>
            <AvatarStyled size='large' src={user?.photoURL} />
          </>
          )
        : (
          <>
            <ButtonStyled onClick={() => { void googleLogin() }}>Login</ButtonStyled>
            <AvatarStyled size='large' />
          </>
          )}
    </>
  )
}
