import React from 'react'
const Button = ({children , LinkTo}) => {
  return (
    <button onClick={LinkTo ?LinkTo:null} className="bg-amber-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-amber-300 transition ">{children}</button>
  )
}

export default Button