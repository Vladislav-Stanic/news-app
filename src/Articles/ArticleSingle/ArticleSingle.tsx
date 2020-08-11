import React, { ReactElement } from "react";

import Card from "react-bootstrap/Card";
import "./ArticleSingle.scss";
import { ArticleInterface } from "../article-interface";
import { ArticleTypeEnum } from "../ArticleTypeEnum";

const articleCard = (props: {
  item: ArticleInterface;
  type: ArticleTypeEnum;
  onArticleMoreEvent: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: ArticleInterface
  ) => void;
  onArticleBackEvent: () => void;
}): ReactElement => {
  const handleEventMore = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    props.onArticleMoreEvent(event, props.item);
  };
  const handleEventBack = (): void => {
    props.onArticleBackEvent();
    console.log("go back!!!");
  };

  return (
    <Card>
      <Card.Title>{props.item.title}</Card.Title>
      <Card.Img
        variant="top"
        src={props.item.urlToImage || "https://via.placeholder.com/300x200"}
        alt={props.item.title}
        title={props.item.title}
      />
      {props.type == ArticleTypeEnum.SingleCard ? (
        <React.Fragment>
          <Card.Body>
            <Card.Text>{props.item.description}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-right">
            <Card.Link href="#" onClick={handleEventMore}>
              More &raquo;
            </Card.Link>
          </Card.Footer>
        </React.Fragment>
      ) : null}
      {props.type == ArticleTypeEnum.SingleDetails ? (
        <React.Fragment>
          <Card.Body>
            <Card.Text>
              {props.item.content || props.item.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-left">
            <Card.Link href="#" onClick={handleEventBack}>
              &laquo; Back
            </Card.Link>
          </Card.Footer>
        </React.Fragment>
      ) : null}
    </Card>
  );
};

export default articleCard;
