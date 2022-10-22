import React, { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Carousel } from "@giphy/react-components";

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function Gifs() {
  const [keyword, setKeyword] = useState("");
  const fetchGifs = (offset, number) => {
    console.log("fun called");
    return giphyFetch.search(keyword, 10);
  };

  return (
    <>
      <p>
        <img src="./logo.gif" width="200" alt="Powered by GIPHY" />
      </p>
      <p>
        input keyword
        <input
          value={keyword}
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </p>
      <h4>search result</h4>
      <Carousel
        key={keyword}
        fetchGifs={() => fetchGifs(5)}
        gifHeight={200}
        gutter={6}
      />
    </>
  );
}

export default Gifs;
