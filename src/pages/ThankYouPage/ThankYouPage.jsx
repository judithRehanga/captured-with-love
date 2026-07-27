import "./ThankYouPage.css";
import { Link } from "react-router-dom";

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <div className="thank-you-card">
        <div className="heart">♡</div>

        <h1>Thank You!</h1>

        <p>
          Your memories have been safely added to our wedding album.
        </p>

        <p>
          Thank you for celebrating this special day with us.
        </p>

        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </main>
  );
}