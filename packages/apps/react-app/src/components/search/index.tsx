import React from 'react'

type Props = {}

function Search({ }: Props) {
  return (
    <div className='flex items-center'>
      <input
        className='w-96 h-8 px-4 border rounded-full border-slate-200 bg-slate-50 text-sm'
        placeholder='黄金再度刷新历史新高'
      />
      <button
        className=' w-16 h-8 mx-4 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 '
      >提问</button>
    </div>
  )
}

export default Search