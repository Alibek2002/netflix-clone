import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Movie } from '../typing'
import { baseUrl } from '../constants/movie'
import PlayButton from '../assets/icons/play.svg'
import InfoButton from '../assets/icons/information-button.svg'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl font-bold text-shadow-lg md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md  md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <PlayButton className="h-3 w-3 md:h-6  md:w-6" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          <InfoButton className="h-3 w-3 md:h-6 md:w-6" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default Banner
