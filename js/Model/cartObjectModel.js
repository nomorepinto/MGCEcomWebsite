class CartFormatter {
  constructor(cartItems, customerInfo, orderInfo) {
    this.cartItems = cartItems;
    this.customerInfo = customerInfo;
    this.orderInfo = orderInfo;
    
    // Validate on construction
    this.validate();
  }

  // Validates required fields
  validate() {
    if (!this.customerInfo.fullName || !this.customerInfo.facebookLink) {
      throw new Error("Customer name and Facebook link are required");
    }
    if (!this.cartItems || this.cartItems.length === 0) {
      throw new Error("Cart cannot be empty");
    }
    if (!this.orderInfo.paymentReference) {
      throw new Error("Payment reference is required");
    }
  }

  // Converts "₱50.00" or 50.00 to number
  static parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseFloat(priceStr.toString().replace(/[₱,]/g, ""));
  }

  // Compute total from all cart items
  computeTotalPrice() {
    return this.cartItems.reduce((total, item) => {
      const price = CartFormatter.parsePrice(item.price);
      const quantity = parseInt(item.quantity) || 1;
      return total + (price * quantity);
    }, 0);
  }

  // Convert cart items into ProductOrders format
  formatProductOrders(orderID = null) {
    return this.cartItems.map(item => ({
      ...(orderID && { OrderID: orderID }),
      ProductID: item.id,
      Quantity: parseInt(item.quantity) || 1
    }));
  }

  // Format for RPC function call (recommended)
  buildRPCPayload() {
    return {
      customer_name: this.customerInfo.fullName,
      customer_facebook: this.customerInfo.facebookLink,
      total_price: this.computeTotalPrice(),
      logistic_method: this.orderInfo.logisticMethod || null,
      payment_ref: this.orderInfo.paymentReference,
      products: this.cartItems.map(item => ({
        product_id: item.id,
        quantity: parseInt(item.quantity) || 1
      }))
    };
  }

  // Format for separate table inserts (if not using RPC)
  buildSeparateInserts() {
    return {
      customer: {
        Name: this.customerInfo.fullName,
        FacebookLink: this.customerInfo.facebookLink
      },
      order: {
        TotalPrice: this.computeTotalPrice(),
        LogisticMethod: this.orderInfo.logisticMethod || null,
        PaymentReference: this.orderInfo.paymentReference
      },
      productOrders: this.formatProductOrders()
    };
  }
}