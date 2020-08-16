import React, { ReactElement } from "react";

import Card from "react-bootstrap/Card";
import "./ArticleSingle.scss";
import { ArticleTypeEnum } from "../ArticleTypeEnum";
import { ArticleInterface } from "../ArticleInterface";
import { Link } from "react-router-dom";

const articleSingle = (props: {
  item: ArticleInterface;
  type: ArticleTypeEnum;
  onArticleMoreEvent: (article: ArticleInterface) => void;
  onArticleBackEvent: () => void;
}): ReactElement => {
  return (
    <Card>
      <Card.Title>{props.item.title}</Card.Title>
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
              to={`/articleSingle`}
              className="nav-link"
              onClick={() => props.onArticleMoreEvent(props.item)}
            >
              {" "}
              More &raquo;
            </Link>
          </Card.Footer>
        </React.Fragment>
      ) : null}
      {props.type === ArticleTypeEnum.SingleDetails ? (
        <React.Fragment>
          <Card.Body>
            <Card.Text>
              {props.item.content || props.item.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-left">
            <Link
              to={`/`}
              className="nav-link"
              onClick={props.onArticleBackEvent}
            >
              {" "}
              &laquo; Back
            </Link>
          </Card.Footer>
        </React.Fragment>
      ) : null}
    </Card>
  );
};

export default articleSingle;
