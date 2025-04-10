// components/CompareView.js
import React from 'react'

const CompareView = ({ cars, onClose, onRemoveCar }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-2xl w-[98%] max-w-[95%] h-[90%] overflow-auto animate-scaleIn transition-all">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">🔍 Car Comparison</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-xl font-semibold"
          >
            ✖ Close
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map(car => (
            <div
              key={car.id}
              className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg text-center bg-white dark:bg-gray-800 shadow-md transition-transform transform hover:scale-105"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{car.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{car.brand}</p>
              <p className="text-md text-gray-700 dark:text-gray-200">💰 Price: ₹{car.price.toLocaleString()}</p>
              <p className="text-md text-gray-700 dark:text-gray-200">⛽ Fuel: {car.fuelType}</p>
              <p className="text-md text-gray-700 dark:text-gray-200">🪑 Seats: {car.seatingCapacity}</p>

              <button
                onClick={() => onRemoveCar(car.id)}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md"
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompareView
