export default class CartItem {

  constructor(userCartData, cartSelector) {
    this._cartSelector = cartSelector;
    this._id = userCartData.itemId;
    this._image = userCartData.image;
    this._about = userCartData.about;
    this._quantity = userCartData.quantity;
    this._name = userCartData.itemName;
    this._price = userCartData.price;
    this._currency = userCartData.currency;
  }

  _getTemplate() {
    const cartItemElement = document.querySelector(this._cartSelector)
      .content.querySelector('.cart-item').cloneNode(true);
    return cartItemElement;
  }

  generateCartItem() {
    this._element = this._getTemplate();
    this._element.querySelector('.cart-item__image').src = this._image;
    this._element.querySelector('.cart-item__name').textContent = this._name;
    this._element.querySelector('.cart-item__description').textContent = this._about;
    this._element.querySelector('.cart-item__quantity').textContent = this._quantity;
    this._element.querySelector('.cart-item__price').textContent = this._price;
    this._element.querySelector('.cart-item__currency').textContent = this._currency;
    this._element.setAttribute('id', `_${this._id}`);
    //      this._setEventListeners();
    return this._element;
  }

  // _setEventListeners() {
  //  }
  
}
