import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  //console.log(id);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    //console.log(json.data.movie);
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movie);
  return (
    <div>
      <h1>{loading ? "Loading..." : movie.title}</h1>
      <img alt={movie.title} src={movie.large_cover_image} />
      <ul>
        {loading
          ? null
          : movie.genres.map((genre) => <li key={genre}>{genre}</li>)}
      </ul>
      <p>{movie.description_full}</p>
    </div>
  );
}

export default Detail;
