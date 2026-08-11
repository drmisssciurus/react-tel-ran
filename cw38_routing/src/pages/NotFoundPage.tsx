import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <p>Page not found</p>
      <img
        src="https://media.tenor.com/ShDlvYkSEjcAAAAe/cat-funny.png"
        alt=""
      />
      <Link to="/">Go to home</Link>
    </div>
  );
};

export default NotFoundPage;
