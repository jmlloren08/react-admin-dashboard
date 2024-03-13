import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const Tables = React.lazy(() => import('./views/base/tables/Tables'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))

//Forms
const InputGroup = React.lazy(() => import('./views/dashboard/InputGroup'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))

// Notifications
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/dashboard', name: 'Input Group', element: InputGroup },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
