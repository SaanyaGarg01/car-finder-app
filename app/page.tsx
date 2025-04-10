'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import rawCarsData from '../data/cars.json'
import CarCard from '../components/CarCard'
import Filters from '../components/Filters'
import SortDropdown from '../components/SortDropdown'
import Pagination from '../components/Pagination'
import Wishlist from '../components/Wishlist'
import Loader from '../components/Loader'

const CompareDrawer = dynamic(() => import('../components/CompareDrawer'), { ssr: false })
const CompareView = dynamic(() => import('../components/CompareView'), { ssr: false })
const carsData = rawCarsData as Car[]
interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  fuel: string;
  seats: number;
  image: string;
}

export default function Home() {
  // ✅ Typed States
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [search, setSearch] = useState<string>('')
  const [wishlist, setWishlist] = useState<Car[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [sortOrder, setSortOrder] = useState<string>('default')
  const [compareList, setCompareList] = useState<Car[]>([])
  const [showCompareView, setShowCompareView] = useState<boolean>(false)

  const carsPerPage = 10
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ✅ Load Data
  useEffect(() => {
    setCars(carsData)
    setFilteredCars(carsData)

    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlist(storedWishlist)

    const storedCompare = JSON.parse(localStorage.getItem('compareList') || '[]')
    setCompareList(storedCompare)
  }, [])

  useEffect(() => {
    filterAndSortCars()
  }, [search, sortOrder])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (audioRef.current) audioRef.current.play()
  }

  // ✅ Filter + Sort
  const filterAndSortCars = () => {
    let filtered = [...cars]
    if (search) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (sortOrder === 'asc') filtered.sort((a, b) => a.price - b.price)
    else if (sortOrder === 'desc') filtered.sort((a, b) => b.price - a.price)

    setFilteredCars(filtered)
    setCurrentPage(1)
  }

  // ✅ Toggle Compare Logic
  const toggleCompare = (car: Car) => {
    const exists = compareList.find(c => c.id === car.id)
    let updatedList: Car[]

    if (exists) {
      updatedList = compareList.filter(c => c.id !== car.id)
    } else {
      if (compareList.length >= 3) {
        alert("🚫 You can only compare up to 3 cars at once.")
        return
      }
      updatedList = [...compareList, car]
    }

    setCompareList(updatedList)
    localStorage.setItem('compareList', JSON.stringify(updatedList))
  }

  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar)

  return (
    <main
      className={`min-h-screen transition-all duration-700 ease-in-out bg-cover bg-center text-gray-900 animate-fadeIn`}
      style={{
        backgroundImage: darkMode
          ? "url('/images/b.jpg')"
          : "linear-gradient(to right, #f5f7fa, rgb(120, 149, 196))",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <audio ref={audioRef} src="/sounds/switch.mp3" preload="auto" />

      {/* Navbar */}
      <div className={`w-full px-6 py-6 shadow-md flex justify-between items-center ${darkMode ? 'bg-black bg-opacity-80' : 'bg-orange-100'}`}>
        <div className="flex items-center gap-4">
          <img src="favicon.ico" alt="Car Finder Logo" className="h-16 w-16 object-contain" />
          <h1 className={`text-6xl font-bold tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
            Car Finder - Find Your Dream Car
          </h1>
        </div>

       

        <button
          onClick={toggleDarkMode}
          className="transition-all duration-300 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white px-10 py-7 rounded-lg shadow-lg font-semibold hover:animate-pulseHover"
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Main Content */}
      <div className={`container mx-auto px-4 py-6 rounded-xl shadow-xl mt-6 backdrop-blur-md ${
        darkMode ? 'bg-black bg-opacity-70 text-white' : 'bg-white bg-opacity-70 text-black'
      }`}>
        {/* Search */}
        <div className="mt-2">
          <input
            type="text"
            placeholder="🔍 Search cars..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'
            }`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Filters */}
          <div className="bg-white text-black p-4 rounded-xl shadow-md w-full md:w-1/4">
            <Filters
              cars={cars}
              setFilteredCars={setFilteredCars}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* Car Listings + Sort */}
          <div className="flex-1">
            <div className="bg-white text-black p-2 rounded-md inline-block shadow-sm">
              <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 animate-fadeIn">
              {currentCars.map(car => (
                <div key={car.id} className="transition-transform duration-500 transform hover:scale-105 hover:shadow-xl rounded-xl animate-scaleIn">
                  <CarCard
                    car={car}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    toggleCompare={toggleCompare}
                    compareList={compareList}
                  />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCars.length / carsPerPage)}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* Wishlist */}
          <div className="bg-white text-black p-4 rounded-xl shadow-md w-full md:w-1/4">
            <Wishlist wishlist={wishlist} setWishlist={setWishlist} />
          </div>
        </div>
      </div>

      {/* Compare Drawer */}
      <CompareDrawer
        compareList={compareList}
        setShowCompareView={setShowCompareView}
        setCompareList={setCompareList}
      />

      {/* Compare View */}
      {showCompareView && (
        <CompareView
          cars={compareList}
          onClose={() => setShowCompareView(false)}
          onRemoveCar={(id: number) => {
            const updatedList = compareList.filter(car => car.id !== id)
            setCompareList(updatedList)
            localStorage.setItem('compareList', JSON.stringify(updatedList))
          }}
        />
      )}

      
      {/* Footer */}
      <footer className={`text-center py-6 ${darkMode ? 'bg-black text-white' : 'bg-indigo-50 text-gray-800'}`}>
        <p className="text-lg font-semibold">🚗 Car Finder — Find your ride, your style.</p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} Car Finder. All rights reserved.</p>
      </footer>
    </main>
  )
}
