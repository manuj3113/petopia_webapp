import React from 'react'
import Sidebar from './includes/Sidebar'

const MainLayout = ({children}) => {
  return (
 <>
    <Sidebar/>
{children}
   
    </>
  )
}

export default MainLayout