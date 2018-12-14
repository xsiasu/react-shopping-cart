import React, { Component } from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Masonry from 'react-masonry-component';
const masonryOptions = {
  transitionDuration: 0
};
const imagesLoadedOptions = { background: '.my-bg-image-el' }
// class Gallery extends React.Component {


  
//   render() {
//       const childElements = this.props.elements.map(function(element){
//          return (
//               <li className="image-element-class">
//                   <img src={element.src} />
//               </li>
//           );
//       });
  
//       return (
//           <Masonry
//               className={'my-gallery-class'} // default ''
//               elementType={'ul'} // default 'div'
//               options={masonryOptions} // default {}
//               disableImagesLoaded={false} // default false
//               updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
//               imagesLoadedOptions={imagesLoadedOptions} // default {}
//           >
//               {childElements}
//           </Masonry>
//       );
//   }
// }

// export default Gallery;

class Products extends Component {
  constructor() {
    super();
  }
  render() {
    let productsData;
    let term = this.props.searchTerm;
    let x;

    function searchingFor(term) {
      return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }
    productsData = this.props.productsList
      .filter(searchingFor(term))
      .map(product => {
        return (
          
            <Product
              key={product.id}
              price={product.price}
              name={product.name}
              image={product.image}
              id={product.id}
              addToCart={this.props.addToCart}
              productQuantity={this.props.productQuantity}
              updateQuantity={this.props.updateQuantity}
              openModal={this.props.openModal}
            />
          
        );
      });




    // Empty and Loading States
    let view;
    if (productsData.length <= 0 && !term) {
      view = <LoadingProducts />;
    } else if (productsData.length <= 0 && term) {
      view = <NoResults />;
    } else {
      view = (

         <Masonry
             className={'my-gallery-class'} // default ''
             disableImagesLoaded={false} // default false
             updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
             imagesLoadedOptions={imagesLoadedOptions} // default {}
         >
        <CSSTransitionGroup
          // transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="div"
          className="products"
        >
          {productsData}
          </CSSTransitionGroup>
          </Masonry>
        
      );
    }
    return <div className="products-wrapper">{view}</div>;
  }
}

export default Products;