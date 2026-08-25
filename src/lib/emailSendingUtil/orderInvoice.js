export const orderInvoiceTemplate = ({ orderId, items, totalPrice }) => {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>🧾 Order Invoice</h2>
      <p>Order ID: <strong>${orderId}</strong></p>

      <table width="100%" border="1" cellspacing="0" cellpadding="8">
        <thead>
          <tr>
            <th align="left">Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
            <tr>
              <td>${item.title}</td>
              <td align="center">${item.quantity}</td>
              <td align="right">৳${item.price}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <h3 style="margin-top: 20px;">Total: ৳${totalPrice}</h3>

      <p>Thank you for shopping with Hero Kidz ❤️</p>
    </div>
  `;
};