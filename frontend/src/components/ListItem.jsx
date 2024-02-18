import React from 'react'

function ListItem({label}) {
  return (
    <li className="hover:text-cyan-700 hover:scale-125 transition duration-200   text-lg">{label}</li>
  )
}

export default ListItem