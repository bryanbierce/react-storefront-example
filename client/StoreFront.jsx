import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './StoreFront/ProductCard';
import actions from './redux/actions';
import './styles/components/storeFront';
const { bool, func, number, object, string } = React.PropTypes;

class StoreFront extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { getNextProducts, pageMax, sortType } = this.props;
    getNextProducts(0, sortType, pageMax);
  }

  render() {
    return (
      <div id="storeFront">
        {
          this.props.products.map((item) => <ProductCard {...item}/>)
        }
      </div>
    );
  }
}
StoreFront.propTypes = {
  addToProductsViewing: func,
  ads: object,
  adNext: string,
  getNextProducts:func,
  isLoading:bool,
  products: object,
  pageMax: number,
  sortType: string
};


const mapDispatchToProps = (dispatch) => ({
  addToProductsViewing: (disp) => dispatch(actions.addToProductsViewing(disp)),
  getNextProducts: (page, pageMax, sortType) => (
    dispatch(actions.getNextProducts(page, pageMax, sortType))
  )
});

const mapStateToProps = (state) => ({
  ads: state.get('adds'),
  adNext: state.get('adNext'),
  isLoading: state.get('isLoading'),
  products: state.get('productsViewing'),
  pageMax: state.get('pageMax'),
  sortType: state.get('sortType')
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);
