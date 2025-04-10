// components/Filters.js
import React, { useState } from 'react'

const Filters = ({ cars, setFilteredCars, setCurrentPage }) => {
  const brands = [...new Set(cars.map(car => car.brand))]
  const fuels = [...new Set(cars.map(car => car.fuel))]
  const seats = [...new Set(cars.map(car => car.seats))]

  const [brand, setBrand] = useState('')
  const [fuel, setFuel] = useState('')
  const [seat, setSeat] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const applyFilters = () => {
    let filtered = [...cars]

    if (brand) filtered = filtered.filter(car => car.brand === brand)
    if (fuel) filtered = filtered.filter(car => car.fuel === fuel)
    if (seat) filtered = filtered.filter(car => car.seats === Number(seat))
    if (minPrice) filtered = filtered.filter(car => car.price >= Number(minPrice))
    if (maxPrice) filtered = filtered.filter(car => car.price <= Number(maxPrice))

    setFilteredCars(filtered)
    setCurrentPage(1)
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded w-full md:w-64">
      <h3 className="font-bold mb-3 text-lg">🔍 Filters</h3>

      <select
        className="w-full mb-2 p-2 rounded"
        value={brand}
        onChange={e => setBrand(e.target.value)}
      >
        <option value="">Select Brand</option>
        {brands.map((b, index) => (
          <option key={`brand-${index}`} value={b}>{b}</option>
        ))}
      </select>

      <select
        className="w-full mb-2 p-2 rounded"
        value={fuel}
        onChange={e => setFuel(e.target.value)}
      >
        <option value="">Select Fuel</option>
        {fuels.map((f, index) => (
          <option key={`fuel-${index}`} value={f}>{f}</option>
        ))}
      </select>

      <select
        className="w-full mb-2 p-2 rounded"
        value={seat}
        onChange={e => setSeat(e.target.value)}
      >
        <option value="">Seating</option>
        {seats.map((s, index) => (
          <option key={`seat-${index}`} value={s}>{s}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
        className="w-full mb-2 p-2 rounded"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
        className="w-full mb-2 p-2 rounded"
      />

      <button
        onClick={applyFilters}
        className="bg-blue-500 text-white w-full p-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  )
}

export default Filters
