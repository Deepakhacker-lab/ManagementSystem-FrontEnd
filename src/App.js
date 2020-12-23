import Feed from "./pages/feed/feed";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPage from "./pages/userPage/userPage";
import "./App.css";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <UserPage />
        <Feed />
    </Fragment>
  );
}

export default App;
