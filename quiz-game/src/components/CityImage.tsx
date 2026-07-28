import type { CityPhoto } from '../types';

type SityImageProps = {
  photo?: CityPhoto;
  error?: string;
  isLoading: boolean;
};

const CityImage = ({ photo, error, isLoading }: SityImageProps) => {
  return (
    <div className="city-image-wrap">
      {isLoading && (
        <div className="image-loading">
          <div className="spinner" />
          loading city photo...
        </div>
      )}
      {!isLoading && error && (
        <div className="image-error">
          <p>photo is not loaded</p>
          <p>{error}</p>
        </div>
      )}
      {!isLoading && !error && !photo && (
        <div className="image-loading">no photo yet</div>
      )}
      {!isLoading && photo && (
        <figure>
          <img src={photo.url} alt={photo.alt} />
          <figcaption>
            <span>Photo by {photo.autorName}</span>
            <a href={photo.photoUrl} target="_blank" rel="noreferrer">
              via Unsplash
            </a>
          </figcaption>
        </figure>
      )}
    </div>
  );
};

export default CityImage;
