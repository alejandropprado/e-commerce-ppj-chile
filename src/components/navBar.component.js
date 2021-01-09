import React from 'react'
import {
  Navbar,
  Nav,
} from 'react-bootstrap'
import {
  Link,
  useLocation,
} from 'react-router-dom'

import CartButton from '../Cart/components/cartButton.component'

export default function NavBarComponent() {
  const location = useLocation()

  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand='lg' style={{
      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.75)',
    }}>
      <Navbar.Brand as={Link} to={'/'}>
        e-React
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='nav-bar' />
      <Navbar.Collapse id='nav-bar'>
        <Nav className='mr-auto justify-content-center'>
          <Nav.Link
            as={Link}
            to={'/'}
            active={location.pathname === '/'}
          >
            Productos
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={'/products/Figure'}
            active={location.pathname === '/products/Figure'}
          >
            Figuras
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={'/products/Card'}
            active={location.pathname === '/products/Card'}
          >
            Cartas
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={'/products/Yarn'}
            active={location.pathname === '/products/Yarn'}
          >
            Hilados
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className='justify-content-end'>
        <CartButton />
      </Navbar.Collapse>
    </Navbar>
  )
}
