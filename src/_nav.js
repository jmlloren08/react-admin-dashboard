import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilNotes } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'ADMIN PANEL',
  },
  {
    component: CNavItem,
    name: 'User Management',
    to: '/forms/input-group',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default _nav
