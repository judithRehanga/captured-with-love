import "./Hero.css";
import { useEffect } from "react";

function Hero({ event }) {
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="hero">
      <div className="hero-heart">♡</div>

      <h1 className="hero-logo">Captured with Love</h1>

      {/* <h2 className="hero-title">{event.title}</h2> */}

      <p className="hero-description">{event.description}</p>

      <div
        className="scroll-indicator"
        onClick={() =>
          document.getElementById("upload-section")?.scrollIntoView({
            behavior: "smooth",
          })
        }
      >
        <span className="scroll-arrow">↓</span>

        <p>Scroll to Begin</p>
      </div>
    </section>
  );
}

export default Hero;
