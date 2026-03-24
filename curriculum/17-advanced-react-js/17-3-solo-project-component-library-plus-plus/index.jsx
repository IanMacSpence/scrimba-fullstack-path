import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./components/Menu/index";
import Star from "./components/Star";
import Button from "./components/Button/Button";

function App() {
  return (
    <>
      <h1>Your components go here</h1>
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
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
