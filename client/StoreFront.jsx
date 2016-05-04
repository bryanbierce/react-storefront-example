import React from 'react';
import ProductCard from './StoreFront/ProductCard';
import axios from 'axios';
import './styles/components/storeFront';

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      raw: '',
      response: []
    };
  }
  componentDidMount() {
    axios.get('/api/products?limit=20&skip=0&sort=id')
    .then((res) => {
      const raw = res.data;
      const responseArray = res.data.split('\n');
      responseArray.pop();
      const response = responseArray.map((item) => JSON.parse(item));
      this.setState({ response, raw });
    })
    .catch((res) => console.log(res));
  }

  render() {
    return (
      <div id="storeFront">
        {
          this.state.response.map((item) => <ProductCard {...item}/>)
        }
        <pre>
          { this.state.raw }
        </pre>
      </div>
    );
  }
}

export default Store;
