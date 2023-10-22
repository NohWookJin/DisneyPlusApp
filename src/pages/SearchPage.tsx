import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../api/axios";
import { IMovie } from "../components/Row";
import styled from "styled-components";
import { useDebounce } from "../hooks/useDebounce";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<IMovie[]>([]);

  const useQuery = (): URLSearchParams => {
    return new URLSearchParams(useLocation().search);
  };

  const queryData = useQuery();
  const searchTerm = queryData.get("q");
  const debouncedTerm = useDebounce(queryData.get("q"), 500);

  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedTerm) {
      fetchSearchMovie(debouncedTerm);
    }
  }, [debouncedTerm]);

  const fetchSearchMovie = async (searchTerm: string): Promise<void> => {
    try {
      const res = await instance.get(
        `/search/multi?include_adult=false&query=${searchTerm}`,
      );
      setSearchResult(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchResult.length > 0) {
    return (
      <SearchSection>
        <SearchDiv>
          {searchResult.map((movie) => {
            if (movie.backdrop_path) {
              return (
                <StyledPoster key={movie.id}>
                  <StyledImg
                    className="row__poster"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  />
                  <span>{movie.title ? movie.title : movie.name}</span>
                </StyledPoster>
              );
            }
            return null;
          })}
        </SearchDiv>
      </SearchSection>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  }
};

export default SearchPage;

const SearchSection = styled.section`
  border: 1px solid white;
  height: 100vh;
  padding: 40px;
  padding-top: 100px;
`;

const SearchDiv = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledPoster = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding-top: 3px;
  }
`;

const StyledImg = styled.img`
  object-fit: cover;
  overflow: hidden;
`;
