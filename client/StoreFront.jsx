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
    const { addToProductsViewingFromNext, getNextProducts, pageMax, sortType } = this.props;

    // start fetching products
    getNextProducts(0, sortType, pageMax);

    // on scroll check scroll position and add more if 200px from the end
    window.onscroll = (event) => {
      const threshold = document.body.scrollHeight - 200;
      const scrolled = window.innerHeight + window.scrollY;

      if (scrolled >= threshold) {
        addToProductsViewingFromNext();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receive');
    if (nextProps.scrollRetry) {
      console.log('visible retry flag');
      this.props.addToProductsViewingFromNext();
    }
  }

  render() {
    return (
      <div id="storeFront">
        {
          this.props.products.map((item) => (
            <ProductCard key={ item.id } { ...item } />
          ))
        }
      </div>
    );
  }
}
StoreFront.propTypes = {
  addToProductsViewingFromNext: func,
  ads: object,
  adNext: string,
  getNextProducts: func,
  isLoading: bool,
  nextCount: number,
  products: object,
  pageMax: number,
  scrollRetry: bool,
  sortType: string
};


const mapDispatchToProps = (dispatch) => ({
  addToProductsViewingFromNext: (retry) => dispatch(actions.addToProductsViewingFromNext(retry)),
  getNextProducts: (page, pageMax, sortType) => (
    dispatch(actions.getNextProducts(page, pageMax, sortType))
  )
});

const mapStateToProps = (state) => ({
  ads: state.get('adds'),
  adNext: state.get('adNext'),
  isLoading: state.get('isLoading'),
  nextCount: state.get('productNextCount'),
  products: state.get('productsViewing'),
  pageMax: state.get('pageMax'),
  scrollRetry: state.get('scrollRetry'),
  sortType: state.get('sortType')
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);
