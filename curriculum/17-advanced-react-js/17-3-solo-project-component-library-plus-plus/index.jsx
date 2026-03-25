import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./components/Menu/index";
import Star from "./components/Star";
import Button from "./components/Button/Button";

function App() {
  return (
    <>
      <h1>Your components go here</h1>
      <h2 className="section-header">Buttons</h2>
      <section className="buttons-container">
        <Button>default</Button>
        <Button size="sm">default small</Button>
        <Button size="lg">default large</Button>
        <Button variant="success">default success</Button>
        <Button size="sm" variant="success">
          small success
        </Button>
        <Button size="lg" variant="success">
          large success
        </Button>
        <Button variant="warning">default warning</Button>
        <Button size="sm" variant="warning">
          small warning
        </Button>
        <Button size="lg" variant="warning">
          large warning
        </Button>
        <Button variant="danger">default danger</Button>
        <Button size="sm" variant="danger">
          small danger
        </Button>
        <Button size="lg" variant="danger">
          large danger
        </Button>
      </section>
      <hr />
      <h2 className="section-header">Menu</h2>
      <section className="menu-container"></section>
      <hr />
      <h2 className="section-header">Badges</h2>
      <section className="badge-container"></section>
      <hr />
      <h2 className="section-header">Banners</h2>
      <section className="banner-container"></section>
      <hr />
      <h2 className="section-header">Cards</h2>
      <section className="cards-container"></section>
      <hr />
      <h2 className="section-header">Testimonials</h2>
      <section className="testimonials-container"></section>
      <hr />
      <h2 className="section-header">Tooltips</h2>
      <section className="tooltips-container"></section>
      <hr />
      <h2 className="section-header">Toasts</h2>
      <section className="toasts-container"></section>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
