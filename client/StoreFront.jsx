import React from 'react';
import { connect } from 'react-redux';
import SortBar from './StoreFront/SortBar';
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
    getNextProducts(0, sortType);

    // pre generate ads list
    prepareAds(pageMax);

    // on scroll check scroll position
    // add more products if 200px from the end
    window.onscroll = () => {
      const threshold = document.body.scrollHeight - 200;
      const scrolled = window.innerHeight + window.scrollY;

      if (scrolled >= threshold) {
        addToProductsViewingFromNext();
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { scrollRetry, sortType } = nextProps;

    // Check if retry flag is on, try to add new products again
    if (scrollRetry) {
      this.props.addToProductsViewingFromNext();
    }

    // Check if the sortType has changed. Start fetching new product list
    if (this.props.sortType !== sortType) {
      nextProps.getNextProducts(0, sortType);
    }
  }

  formatProduct(item) {
    const formatted = {};


    const now = Date.now();
    const then = Date.parse(item.date);
    const daysDistance = Math.round((now - then) / 86400000);
    let relativeDate;

    if (daysDistance === 1) {
      relativeDate = `${daysDistance} day ago`;
    } else if (daysDistance < 7) {
      relativeDate = `${daysDistance} days ago`;
    } else if (daysDistance === 7) {
      relativeDate = 'a week ago';
    } else {
      relativeDate = item.date.split(' ').slice(0, 4).join(' ');
    }

    formatted.id = item.id;
    formatted.face = item.face;
    formatted.size = item.size;
    formatted.price = `$${(item.price / 100).toFixed(2)}`;
    formatted.date = relativeDate;
    return formatted;
  }

  getDisplayItems() {
    return this.props.products.reduce((display, item, i) => {
      // if 21st consecutive product, insert ad first
      if (i && !(i % 20)) {
        const j = i / 20;
        const img = this.props.adList.get(j);
        display.push(<Ad key={ j }img={ img } />);
      }

      const itemInfo = this.formatProduct(item);
      display.push(<ProductCard key={ itemInfo.id } { ...itemInfo } />);

      return display;
    }, []);
  }

  getFooter() {
    let footer;

    // if loading display animation, otherwise place 'end' message
    if (this.props.isLoading) {
      footer = (
        <div id="loadingWindow">
          <div id="loading" />
        </div>
      );
    } else {
      footer = <p id="endFooter">~ End of Catalogue ~</p>;
    }
    return footer;
  }

  handleSortClick(e) {
    const sortType = e.target.value;

    // update sortType
    this.props.changeSort(sortType);
    // turn off scroll retry flag
    this.props.endScrollRetry();
    // remove products in queue
    this.props.clearProductsNext();
    // remove current products
    this.props.clearProductsViewing();
    // ensure isLoading is true
    this.props.beginLoading();
    // restart product fetching
    this.props.getNextProducts(0, sortType);
  }

  render() {
    return (
      <div id="storeFront">
        <SortBar
          handleSortClick={ this.handleSortClick }
          sortOptions={ this.props.sortOptions }
          sortType={ this.props.sortType }
        />
        {
          this.getDisplayItems()
        }
        {
          this.getFooter()
        }
      </div>
    );
  }
}
StoreFront.propTypes = {
  addToProductsViewingFromNext: func,
  adList: object,
  beginLoading: func,
  changeSort: func,
  clearProductsNext: func,
  clearProductsViewing: func,
  dispatch: func,
  endScrollRetry: func,
  getNextProducts: func,
  isLoading: bool,
  nextCount: number,
  products: object,
  pageMax: number,
  prepareAds: func,
  scrollRetry: bool,
  setAdLast: func,
  sortOptions: object,
  sortType: string
};


const mapDispatchToProps = (dispatch) => ({
  addToProductsViewingFromNext: (retry) => dispatch(actions.addToProductsViewingFromNext(retry)),
  beginLoading: () => dispatch(actions.beginLoading()),
  changeSort: (sortType) => dispatch(actions.changeSort(sortType)),
  clearProductsNext: () => dispatch(actions.clearProductsNext()),
  clearProductsViewing: () => dispatch(actions.clearProductsViewing()),
  endScrollRetry: () => dispatch(actions.endScrollRetry()),
  getNextProducts: (page, sortType) => (
    dispatch(actions.getNextProducts(page, sortType))
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
  sortOptions: state.get('sortOptions'),
  sortType: state.get('sortType')
});


export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);
