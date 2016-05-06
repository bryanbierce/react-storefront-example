import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './StoreFront/ProductCard';
import Ad from './StoreFront/Ad';
import actions from './redux/actions';
import methodBinder from './utils/methodBinder';
import './styles/components/storeFront';
const { bool, func, number, object, string } = React.PropTypes;

class StoreFront extends React.Component {
  constructor(props) {
    super(props);

    // util binds methods to the 'this'
    methodBinder.call(this);
  }

  componentDidMount() {
    const {
      addToProductsViewingFromNext,
      getNextProducts,
      pageMax,
      prepareAds,
      sortType
    } = this.props;

    // start fetching products
    getNextProducts(0, sortType, pageMax);

    // pre generate ads list
    prepareAds(pageMax);

    // on scroll check scroll position and add more if 200px from the end
    window.onscroll = () => {
      const threshold = document.body.scrollHeight - 200;
      const scrolled = window.innerHeight + window.scrollY;

      if (scrolled >= threshold) {
        addToProductsViewingFromNext();
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    // Check if retry flag is on, try to add new products again
    if (nextProps.scrollRetry) {
      this.props.addToProductsViewingFromNext();
    }
  }

  getDisplayItems() {
    return this.props.products.reduce((display, item, i) => {
      if (i && !(i % 20)) {
        const j = i / 20;
        const img = this.props.adList.get(j);
        // console.log(img);
        display.push(<Ad key={ j }img={ img } />);
      }
      display.push(<ProductCard key={ item.id } { ...item } />);
      return display;
    }, []);
  }


  render() {
    return (
      <div id="storeFront">
        {
          this.getDisplayItems()
        }
      </div>
    );
  }
}
StoreFront.propTypes = {
  addToProductsViewingFromNext: func,
  adList: object,
  getNextProducts: func,
  isLoading: bool,
  nextCount: number,
  products: object,
  pageMax: number,
  prepareAds: func,
  scrollRetry: bool,
  setAdLast: func,
  sortType: string
};


const mapDispatchToProps = (dispatch) => ({
  addToProductsViewingFromNext: (retry) => dispatch(actions.addToProductsViewingFromNext(retry)),
  getNextProducts: (page, pageMax, sortType) => (
    dispatch(actions.getNextProducts(page, pageMax, sortType))
  ),
  prepareAds: (pageMax) => dispatch(actions.prepareAds(pageMax)),
  setAdLast: (adLast) => dispatch(actions.setAdLast(adLast))
});

const mapStateToProps = (state) => ({
  adList: state.get('adList'),
  isLoading: state.get('isLoading'),
  nextCount: state.get('productNextCount'),
  products: state.get('productsViewing'),
  pageMax: state.get('pageMax'),
  scrollRetry: state.get('scrollRetry'),
  sortType: state.get('sortType')
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);
