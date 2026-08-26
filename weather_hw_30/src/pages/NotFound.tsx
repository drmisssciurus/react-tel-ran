import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="message-card not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <img src="https://c.tenor.com/ShDlvYkSEjcAAAAC/tenor.gif" alt="" />
      <button type="button" onClick={() => navigate('/')}>
        Go Home
      </button>
    </section>
  );
};

export default NotFound;
