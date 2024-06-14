import React, { Children, ReactEventHandler, ReactNode } from 'react';


type Props = {
  children: ReactNode,
  onClick: ReactEventHandler<HTMLButtonElement>,
}

export default function Button({ children, onClick }: Props) {
  return (
    <div>
      <button
        onClick={onClick}
        className=' w-16 h-8 mx-4 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 '
      >{children}</button>
    </div>
  )
}