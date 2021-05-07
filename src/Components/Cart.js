export default class Cart {
  constructor({ renderer }, containerSelector, parentSelector) {
    this._renderer = renderer;
    this._parent = document.querySelector(parentSelector);
    this._container = document.querySelector(containerSelector);
  }

  cartResult(data){
    const subtotal = data.cart.reduce((sum, current) => sum + current.price, 0);
    const taxes = data.taxes;
    const shipping = data.shipping;
    const total = taxes + shipping + subtotal;
    this._parent.querySelector('.cart__subtotal').textContent = `${data.cart[0].currency} ${subtotal}`;     
    this._parent.querySelector('.cart__shipping').textContent = shipping > 0 ? `${data.cart[0].currency} ${shipping}` : "Free" ;
    this._parent.querySelector('.cart__taxes').textContent = `${data.cart[0].currency} ${taxes}`; 
    this._parent.querySelector('.cart__total').textContent = `${data.cart[0].currency} ${total}`;
  }

  rendererItems(rendererItems) {
    rendererItems.forEach(item =>
      this._renderer(item))
  }

  addItem(element) {
    this._container.append(element);
  }

}
