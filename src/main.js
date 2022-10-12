import "./app.postcss";
import App from "./App.svelte";
// import Header from "./Header.svelte";

const app = new App({
  target: document.getElementById("app"),
});

// export const headers = new Header({
//   target:document.getElementById("headers"),
// });

export default app;
// export default headers;
