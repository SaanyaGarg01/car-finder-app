// components/Wishlist.js
import React from 'react'

const Wishlist = ({ wishlist, setWishlist }) => {
  const removeFromWishlist = id => {
    const updated = wishlist.filter(car => car.id !== id)
    setWishlist(updated)
    localStorage.setItem('wishlist', JSON.stringify(updated))
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded w-full md:w-64">
      <h3 className="text-lg font-bold mb-3">❤️ Wishlist</h3>
      {wishlist.length === 0 ? (
        <p>No cars in wishlist.</p>
      ) : (
        wishlist.map(car => (
          <div key={car.id} className="mb-3 border-b pb-2">
            <h4 className="font-semibold">{car.name}</h4>
            <button
              onClick={() => removeFromWishlist(car.id)}
              className="text-red-500 text-sm"
            >
              ❌ Remove
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default Wishlist
