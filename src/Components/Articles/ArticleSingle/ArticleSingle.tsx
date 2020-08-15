import React, { ReactElement } from "react";

import Card from "react-bootstrap/Card";
import "./ArticleSingle.scss";
import { ArticleTypeEnum } from "../ArticleTypeEnum";
import { ArticleInterface } from "../ArticleInterface";

const articleCard = (props: {
  item: ArticleInterface;
  type: ArticleTypeEnum;
  onArticleMoreEvent: (aticle: ArticleInterface) => void;
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
            <Card.Link
              href="#"
              onClick={() => props.onArticleMoreEvent(props.item)}
            >
              More &raquo;
            </Card.Link>
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
            <Card.Link href="#" onClick={props.onArticleBackEvent}>
              &laquo; Back
            </Card.Link>
          </Card.Footer>
        </React.Fragment>
      ) : null}
    </Card>
  );
};

export default articleCard;
