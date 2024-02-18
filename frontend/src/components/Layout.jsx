import React from 'react'
import { useSelector } from 'react-redux'

function Layout({children}) {
    const theme= useSelector((state)=>state.theme.theme);

  return (
    <div className={`${theme}`}>
        {children}
    </div>
  )
}

export default Layout