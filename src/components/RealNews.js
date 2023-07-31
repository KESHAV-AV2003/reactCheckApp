import React, { useState, useEffect } from 'react';
import Newsitems from './Newsitems';
import 'animate.css';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(0);
    const fetchUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=4156b860ba4a42eea6c366fcff59eb1c&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(fetchUrl);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Re-run this effect when the page changes

  const fetchMoreData = async () => {
    const fetchUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=4156b860ba4a42eea6c366fcff59eb1c&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(fetchUrl);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h2 className="animate__animated animate__backInDown text-center" style={{margin: '35px 0px', marginTop: '90px'}}>Top HeadLines on {capitalizeFirstLetter(props.category)}</h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
      >
        <div className="container">
          <div className="row animate__animated animate__backInDown">
            {articles.map((element) => (
              <div className="col-md-4 my-5" key={element.url}>
                <Newsitems
                  title={element.title ? element.title.slice(0, 45) : ""}
                  desription={element.description ? element.description.slice(0, 80) : ""}
                  urlToImage={element.urlToImage}
                  content={element.content}
                  newsUrl={element.url}
                  publishedAt={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string
};

export default News;
