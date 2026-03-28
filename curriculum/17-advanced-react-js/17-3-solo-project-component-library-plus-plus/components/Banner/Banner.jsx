import clsx from "clsx";

import "./Banner.token.css";
import "./Banner.css";

export default function Banner({ children, className, variant, ...rest }) {
  return <h1>This is a banner</h1>;
}

// message or no message. Should message be added as child or a prop?
// multiline; singleline

// four variants: success, warning, error, neutral. Each gets it's own styling and icons