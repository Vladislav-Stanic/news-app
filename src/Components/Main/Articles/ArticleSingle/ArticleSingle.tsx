import React, { ReactElement } from "react";

import Card from "react-bootstrap/Card";
import "./ArticleSingle.scss";
import { ArticleTypeEnum } from "../ArticleTypeEnum";
import { ArticleInterface } from "../ArticleInterface";
import { Link } from "react-router-dom";
import { CountriesEnum } from "../../../../Service/CountriesEnum";
import Button from "react-bootstrap/esm/Button";

const articleSingle = (props: {
  item: ArticleInterface;
  type: ArticleTypeEnum;
  countryCode: CountriesEnum;
  onArticleMoreEvent: (article: ArticleInterface) => void;
  onArticleBackEvent?: () => void;
}): ReactElement => {
  const handleEventback = () => {
    if (props.onArticleBackEvent != null) {
      props.onArticleBackEvent();
    }
  };
  return (
    <Card
      className={
        props.type === ArticleTypeEnum.SingleDetails
          ? "single-article"
          : "article-card"
      }
    >
      <Card.Title>
        {props.type === ArticleTypeEnum.SingleCard ? (
          <h5>
            <Link
              to={`/${props.countryCode}/articleSingle`}
              className="nav-link title"
              onClick={() => props.onArticleMoreEvent(props.item)}
            >
              {" "}
              {props.item.title}
            </Link>
          </h5>
        ) : (
          <h3>{props.item.title}</h3>
        )}
      </Card.Title>
      <Card.Img
        variant="top"
        src={props.item.urlToImage || "https://via.placeholder.com/300x200"}
        alt={props.item.title}
        title={props.item.title}
      />
      {props.type === ArticleTypeEnum.SingleCard ? (
        <React.Fragment>
          <Card.Body>
            <Card.Text>{props.item.description}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-right">
            <Link
              to={`/${props.countryCode}/articleSingle`}
              className="nav-link"
              onClick={() => props.onArticleMoreEvent(props.item)}
            >
              {" "}
              More &raquo;
            </Link>
          </Card.Footer>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Card.Body>
            <Card.Text>
              {props.item.content || props.item.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-left">
            <Button
              variant="link"
              className="nav-link"
              onClick={() => handleEventback()}
            >
              &laquo; Back
            </Button>
          </Card.Footer>
        </React.Fragment>
      )}
    </Card>
  );
};

export default articleSingle;
