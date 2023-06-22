import styled from 'styled-components'

import Authentication from '../Authentication/Authentication'

const NavBarStyled = styled.div`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  height: 64px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function NavBar (): JSX.Element {
  return (
    <NavBarStyled>
      <Authentication />
    </NavBarStyled>
  )
}
