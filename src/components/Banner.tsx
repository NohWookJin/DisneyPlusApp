import { useEffect, useState } from 'react'
import instance from '../api/axios'
import requests from '../api/request'
import "./Banner.css";
import styled from 'styled-components';

const Banner = () => {
    const [movie, setMovie] = useState<any>([]);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    useEffect(() => {
        refreshData();
    }, [])

    const refreshData = async () => {
        const response = await instance.get(requests.fetchTrending);
        const movieId = response.data.results[  // results[랜덤].id
            Math.floor(Math.random() * response.data.results.length)
        ].id

        const {data: movieDetail} = await instance.get(`movie/${movieId}`, {
            params: {append_to_response: "videos"}
        })
        setMovie(movieDetail);

        console.log(movie)
    }

    const truncate = (str: string, n: number) => {
        return str?.length > n ? str.substring(0, n) + "..." : str;
    }

    if(isClicked){
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie.videos.results[0].key}`}
                        width="640"
                        height="360"
                        allow="autoplay; fullscreen"
                    ></Iframe>
                </HomeContainer>
                <ContainerCloseBtn onClick={() => setIsClicked(false)}>돌아가기</ContainerCloseBtn>
            </Container>
)
    } else {
        return (
            <header
                    className='banner'
                    style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                        backgroundPosition: "top center",
                        backgroundSize: 'cover'
                    }}
                >
                 <div className='banner__contents'>
                        <h1 className='banner__title'>
                            {movie.title || movie.name || movie.original_name}
                        </h1>
    
                        <div className='banner__buttons'>
                            {movie.videos?.results[0]?.key &&
                                <button
                                    className='banner__button play'
                                    onClick={() => setIsClicked(true)}
                                >
                                    Play
                                </button>
                            }
                        </div>
                        <p className='banner__description'>
                            {truncate(movie.overview, 100)}
                        </p>
                    </div>
                    <div className='banner--fadeBottom' />
            </header>
        )
    }
}

export default Banner;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: relative;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 80%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "",
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const ContainerCloseBtn = styled.button`
    all: unset;
    position: absolute;    
    color: white;
    bottom: 22%;
    font-weight: 600;
    opacity: 0.6;
    &:hover {
        font-weight: 800;
        opacity: 1;
        font-size: 1.3rem;
        transition: all 0.3s;
    }
`;