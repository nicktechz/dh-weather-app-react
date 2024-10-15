import { Link } from 'react-router-dom';
import './errors.css';
function NotFoundPage() {
  return (
    <div className="error404-bg">
      <div>
        <h1>We&apos;re lost in the sky!</h1>
        <Link to="/">Go home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
