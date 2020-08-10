import React, { Component, ReactElement } from "react";
import "./App.scss";
import { ArticleInterface } from "./article-interface";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

type MyProps = unknown;
type MyState = { articles: [] };

class App extends React.Component<MyProps, MyState> {
  constructor(props: []) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount(): void {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=581d9e0087ef418a86224e1420fefc90"
    )
      .then(function (response) {
        return response.json();
      })
      .then((myJson) => {
        console.log("myJson ==== ", myJson);

        this.setState({
          articles: myJson.articles,
        });
      });
  }

  render(): ReactElement {
    return (
      <div className="App">
        <Container>
          <CardDeck>
            {this.state.articles.map(
              (item: ArticleInterface, index: number) => {
                return (
                  <Card key={index}>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Img
                      variant="top"
                      src={item.urlToImage}
                      alt={item.title}
                      title={item.title}
                    />
                    <Card.Body>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-right">
                      <Card.Link href={item.url}>More &raquo;</Card.Link>
                    </Card.Footer>
                  </Card>
                );
              }
            )}
          </CardDeck>
        </Container>
      </div>
    );
  }
}

export default App;
