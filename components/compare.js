// pages/compare.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ComparePage = () => {
  const router = useRouter()
  const [compareList, setCompareList] = useState([])

  useEffect(() => {
    const storedCompare = JSON.parse(localStorage.getItem('compareList') || '[]')
    setCompareList(storedCompare)
  }, [])

  const removeFromCompare = (id) => {
    const updatedList = compareList.filter(car => car.id !== id)
    setCompareList(updatedList)
    localStorage.setItem('compareList', JSON.stringify(updatedList))
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">📊 Car Comparison</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {compareList.map(car => (
          <div key={car.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <img src={car.image} alt={car.name} className="w-full h-72 object-cover rounded mb-4" />
            <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
            <p className="text-gray-500 dark:text-gray-300 mb-2">{car.brand}</p>
            <p>💰 ₹{car.price.toLocaleString()}</p>
            <p>⛽ {car.fuel}</p>
            <p>🪑 {car.seats} seats</p>
            <button
              onClick={() => removeFromCompare(car.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComparePage
