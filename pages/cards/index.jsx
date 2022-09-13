import Card from "@component/Card/Card";
import React from "react";

const data = {
  id: "62f1ab1759e443902da98e85",
  title: "Der Nikolaus im Haus",
  poster: "https://image.tmdb.org/t/p/original/mzs7tOeA1Pnig6hg1QnwjjQWAe6.jpg",
  rating: 5.5,
  media_type: "movie",
  adult: false,
};

const Index = () => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Card {...data} />
      <Card {...data} />
      <Card {...data} isWatched />
      <Card {...data} isWatched />
      <Card {...data} isSuggesting />
    </div>
  );
};

export default Index;
