'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const CompareDrawer = ({ compareList, setShowCompareView, setCompareList }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCompareNow = () => {
    setShowCompareView(true)
  }

  const handleClear = () => {
    setCompareList([])
    localStorage.removeItem('compareList')
  }

  if (!isMounted) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white p-4 flex justify-between items-center z-50 shadow-lg">
      <div>
        <strong>{compareList.length}</strong> car{compareList.length !== 1 && 's'} selected for comparison.
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCompareNow}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Compare Now
        </button>

        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Clear All
        </button>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(CompareDrawer), {
  ssr: false, // 💡 disables server-side rendering for this component
})
