import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import { Button } from "react-bootstrap";

function ComicDetails() {
  const { id } = useParams();
  const [detailComic, setDetailComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetailComicDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/public/comics/${id}`,
          {
            params: {
              apikey: import.meta.env.VITE_API_KEY,
              ts: import.meta.env.VITE_TIMESTAMP,
              hash: import.meta.env.VITE_HASH,
            },
          }
        );

        setDetailComic(response.data.data.results[0]);
        setLoading(false);
      } catch (error) {
        navigate(`*`);
        setLoading(false);
      }
    };

    fetchDetailComicDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <GridLoader height={50} color="#e23636" />
      </div>
    );
  }

  if (!detailComic) {
    return <p>oops, no comic found</p>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const { title, creators, thumbnail } = detailComic;
  const names = creators.items.map((item) => item.name);
  const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;

  return (
    <div className="container my-5" id="superhero-details">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <img src={imageUrl} alt={title} className="img-fluid rounded mb-4" />
          <h2 className="mb-3">{title}</h2>
          <p>{names[0] || "No description available"}</p>

          <Button
            id="form-button"
            onClick={handleBack}
            className="mt-4"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ComicDetails;
