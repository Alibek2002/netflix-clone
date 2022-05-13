import { Movie } from '../typing'
import NextButton from '../assets/icons/next.svg'
import PrevButton from '../assets/icons/prev.svg'
import Thumbnail from './Thumbnail'
import { useRef, useState } from 'react'

interface Props {
  title: string
  movies: Movie[]
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (dir: string) => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo =
        dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }
  return (
    <div className="group h-40 space-y-0.5  md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="relative md:-ml-2">
        <button onClick={() => handleClick('left')}>
          <PrevButton
            className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-[40px] w-[40px] opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
              !isMoved && 'hidden'
            })`}
          />
        </button>
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => {
            return <Thumbnail key={movie.id} movie={movie} />
          })}
        </div>
        <button onClick={() => handleClick('right')}>
          <NextButton className="absolute top-0 bottom-0 right-2 z-40 m-auto h-[40px] w-[40px] opacity-0 transition hover:scale-125 group-hover:opacity-100" />
        </button>
      </div>
    </div>
  )
}

export default Row
