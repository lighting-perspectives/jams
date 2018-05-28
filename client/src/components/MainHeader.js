import React from 'react'
import {Link} from 'react-router-dom'
import { Image, Menu } from 'semantic-ui-react'
import logo from '../logo.svg'
import './MainHeader.css'

const MainHeader = () => {
  return (
    <Menu fixed='top' inverted>
      <Menu.Item as='a' header>
        <Image
          size='mini'
          className='App-logo'
          src={logo}
          style={{ marginRight: '1.5em' }}
        />
        JAMS
      </Menu.Item>
      <Menu.Item as={Link} to='/'>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to='/dashboard'>
        Dashboard
      </Menu.Item>
      <Menu.Item as={Link} to='/session'>
        Session
      </Menu.Item>
      <Menu.Item as={Link} to='/admin'>
        Admin
      </Menu.Item>
    </Menu>
  )
}

export default MainHeader
