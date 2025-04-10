// components/CarCard.js
import React from 'react'

const CarCard = ({ car, wishlist, setWishlist, toggleCompare, compareList }) => {
  const isWishlisted = wishlist.some(item => item.id === car.id)
  const isCompared = compareList?.some(item => item.id === car.id)

  const toggleWishlist = () => {
    let updatedWishlist
    if (isWishlisted) {
      updatedWishlist = wishlist.filter(item => item.id !== car.id)
    } else {
      updatedWishlist = [...wishlist, car]
    }
    setWishlist(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 max-w-sm mx-auto h-full flex flex-col justify-between">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-60 object-contain mb-4 rounded-lg bg-white p-2"
      />
      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-1">{car.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{car.brand}</p>
        <p>💰 ₹{car.price.toLocaleString()}</p>
        <p>⛽ {car.fuel}</p>
        <p>🪑 {car.seats} seats</p>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className={`mt-4 px-4 py-2 rounded w-full font-semibold transition-all ${
          isWishlisted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        {isWishlisted ? '❤️ Remove' : '➕ Add to Wishlist'}
      </button>

      {/* Compare Button */}
      <button
        onClick={() => toggleCompare(car)}
        className={`mt-2 px-4 py-2 rounded w-full font-semibold transition-all ${
          isCompared ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-black hover:bg-gray-400'
        }`}
      >
        {isCompared ? '✔️ Added to Compare' : '📊 Add to Compare'}
      </button>
    </div>
  )
}

export default CarCard
