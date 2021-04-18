import { useState } from "react";
import "./styles.css";
import Match from "./pages/Match/Match";
import MatchList from "./pages/MatchList/MatchList";

export default function App(props) {
  const [page, setPage] = useState("Match");

  const changePage = (newPage) => {
    setPage(newPage);
  };

  const renderPage = () => {
    if (page === "Match") {
      return <Match change={changePage} />;
    } else if (page === "MatchList") {
      return <MatchList change={changePage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}
