import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import CloseIcon from '../assets/icons/close.svg'
import { useEffect, useState } from 'react'
import { Genre, Movie } from '../typing'
import { Element } from '../typing'
import ReactPlayer from 'react-player/lazy'
import PlayButton from '../assets/icons/play.svg'
import PlusButton from '../assets/icons/plus-white.svg'
import LikeIcon from '../assets/icons/love.svg'
import VolumeOffIcon from '../assets/icons/silent.svg'
import VolumeOnIcon from '../assets/icons/volume.svg'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (!movie) return console.log('No Movie')

    const fetchMovie = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/${
            movie?.media_type === 'tv' ? 'tv' : 'movie'
          }/${movie?.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&append_to_response=videos`
        ).then((response) => response.json())

        if (data?.videos) {
          const index = data.videos.results.findIndex(
            (element: Element) => element.type === 'Trailer'
          )
          setTrailer(data.videos?.results[index]?.key)
        }

        if (data?.genres) {
          setGenres(data.genres)
        }
      } catch (error) {
        return console.log(error)
      }
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }
  console.log(trailer)
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          className="modalButton absolute  right-5 top-5 !z-40 h-9 w-9 bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <CloseIcon className="h-[20px] w-[20px]" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer || 'Zj1fnZ6IS7k'}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <PlayButton className="h-7 w-7 text-black" /> Play
              </button>
              <button className="modalButton">
                <PlusButton className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <LikeIcon className="h-7 w-7" />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)} className="modalButton">
              {muted ? (
                <VolumeOffIcon className="h-7 w-7" />
              ) : (
                <VolumeOnIcon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg ">
            <div className="flex items-center space-x-2 text-sm ">
              <p className="fotn-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light ">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="opacity flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-10 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>
                <div>
                  <span className="text-[gray]">Original Language: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total Votes : </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
