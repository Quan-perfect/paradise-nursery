import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/13/17/snake-plant-5940177_1280.jpg", cost: "$15", price: 15 },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/08/11/chlorophytum-3530413_1280.jpg", cost: "$12", price: 12 },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2018/02/21/15/29/peace-lily-3171099_1280.jpg", cost: "$18", price: 18 },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/07/07/19/04/fern-5381881_1280.jpg", cost: "$14", price: 14 },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/06/09/02/28/plant-5276103_1280.jpg", cost: "$20", price: 20 },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/09/15/45/aloe-vera-3304402_1280.jpg", cost: "$10", price: 10 }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/04/18/15/33/lavender-2238713_1280.jpg", cost: "$22", price: 22 },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/05/27/06/25/jasmine-2347913_1280.jpg", cost: "$25", price: 25 },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/09/10/11/35/rosemary-1659223_1280.jpg", cost: "$15", price: 15 },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/08/14/19/29/mint-1594632_1280.jpg", cost: "$8", price: 8 },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/06/04/13/46/lemon-balm-4251737_1280.jpg", cost: "$12", price: 12 },
        { name: "Geranium", image: "https://cdn.pixabay.com/photo/2017/06/05/18/59/geranium-2374947_1280.jpg", cost: "$16", price: 16 }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/04/11/21/06/zz-plant-6171569_1280.jpg", cost: "$25", price: 25 },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/19/08/houseplant-3818320_1280.jpg", cost: "$10", price: 10 },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/05/17/14/01/aspidistra-5182180_1280.jpg", cost: "$30", price: 30 },
        { name: "Succulent Mix", image: "https://cdn.pixabay.com/photo/2016/11/21/15/49/cactus-1846175_1280.jpg", cost: "$14", price: 14 },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2020/04/24/07/07/jade-plant-5085695_1280.jpg", cost: "$18", price: 18 },
        { name: "Cactus", image: "https://cdn.pixabay.com/photo/2016/04/01/10/44/cactus-1299557_1280.jpg", cost: "$9", price: 9 }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        <h1 onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Paradise Nursery</h1>
        <div>
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>Cart 🛒 ({totalCartCount})</button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2>{category.category}</h2>
              <div className="plant-list">
                {category.plants.map((plant, pIndex) => (
                  <div className="plant-card" key={pIndex}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
