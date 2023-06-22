import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { Avatar, Button } from 'antd'
import styled from 'styled-components'

import { auth } from '../../../../firebase-config'
import { TodoContext } from '../../../contexts/TodoContext'

const AvatarStyled = styled(Avatar)`
  float: right;
  margin-right: 465px;
`
const ButtonStyled = styled(Button)`
  margin-left: 465px;
`

export default function Authentication (): JSX.Element {
  const { user, setTodos } = useContext(TodoContext)

  const googleProvider = new GoogleAuthProvider()
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
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
      {!user && (
        <>
          <ButtonStyled onClick={googleLogin}>Login</ButtonStyled>
          <AvatarStyled size='large' />
        </>
      )}

      {user && (
        <>
          <ButtonStyled type='primary' onClick={logOut}>Log out</ButtonStyled>
          <AvatarStyled size='large' src={user.photoURL} />
        </>
      )}
    </>
  )
}
