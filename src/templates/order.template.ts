import { OrderDocument } from '../models/order.model';
import config from '../config';

export function orderUser(order: OrderDocument): string {
  return `
    <html>
      <body>
        <p>Hello ${order.user.name}</p>
        <p>Voici les informations concernant votre commande:</p>
        <ul>
          <li>Numéro de commande: ${order._id}</li>
          <li>Date: ${new Date(order.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}</li>
          <li>Mode de paiement: ${order.paymentMethod}</li>
          <li>Montant de la taxe: ${order.taxPrice} HTG / ${
    order.currency.symbol
  }${(order.taxPrice / order.currency.amount).toFixed(2)}</li>
          <li>Montant de la livraison: ${order.shippingPrice} HTG / ${
    order.currency.symbol
  }${(order.shippingPrice / order.currency.amount).toFixed(2)}</li>
          <li>Montant du rabais: ${order.discountPrice} HTG / ${
    order.currency.symbol
  }${(order.discountPrice / order.currency.amount).toFixed(2)}</li>
          <li>Montant total: ${order.totalPrice} HTG / ${
    order.currency.symbol
  }${(order.totalPrice / order.currency.amount).toFixed(2)}</li>
          <li>Adresse de livraison: ${
            order.shippingAddress && order.shippingAddress.address
              ? order.shippingAddress.address
              : 'N/A'
          }</li>
          <li>
            Articles commandés: <br />
            <ul>
              ${order.products.map((product) => {
                return `
                  <li>
                  ${product.qty} x ${product.name} (${product.size} ; ${product.color}) --------------- ${product.price} HTG
                  </li>
                `;
              })}
            </ul>
          </li>
        </ul>
        <img src=${
          config.logoAddress
        } alt="logo" style="height: 80px; width: 80px;">
        <p>Cordialement, ${config.enterpriseName}</p>
      </body>
    </html>
  `;
}

export function orderForAdmin(order: OrderDocument): string {
  return `
  <html>
  <body>
    <p>Hello ${config.enterpriseName}</p>
    <p>Voici les informations concernant de la commande de ${
      order.user.name
    }:</p>
    <ul>
      <li>Numéro de commande: ${order._id}</li>
      <li>Date: ${new Date(order.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}</li>
      <li>Mode de paiement: ${order.paymentMethod}</li>
      <li>Montant de la taxe: ${order.taxPrice} HTG / ${
    order.currency.symbol
  }${(order.taxPrice / order.currency.amount).toFixed(2)}</li>
      <li>Montant de la livraison: ${order.shippingPrice} HTG / ${
    order.currency.symbol
  }${(order.shippingPrice / order.currency.amount).toFixed(2)}</li>
      <li>Montant du rabais: ${order.discountPrice} HTG / ${
    order.currency.symbol
  }${(order.discountPrice / order.currency.amount).toFixed(2)}</li>
      <li>Montant total: ${order.totalPrice} HTG / ${order.currency.symbol}${(
    order.totalPrice / order.currency.amount
  ).toFixed(2)}</li>
      <li>Adresse de livraison: ${
        order.shippingAddress && order.shippingAddress.address
          ? order.shippingAddress.address
          : 'N/A'
      }</li>
      <li>
        Articles commandés: <br />
        <ul>
          ${order.products.map((product) => {
            return `
              <li>
              ${product.qty} x ${product.name} (${product.size} ; ${product.color}) --------------- ${product.price} HTG
              </li>
            `;
          })}
        </ul>
      </li>
    </ul>
    <img src=${
      config.logoAddress
    } alt="logo" style="height: 80px; width: 80px;">
    <p>Cordialement, ${config.enterpriseName}</p>
  </body>
</html>
  `;
}

export function orderCreatedByAdmin(order: OrderDocument): string {
  return `
  <html>
  <body>
    <p>Hello ${config.enterpriseName}</p>
    <p>Voici les informations concernant de la commande que vous venez de passer:</p>
    <ul>
      <li>Numéro de commande: ${order._id}</li>
      <li>Date: ${new Date(order.createdAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}</li>
      <li>Mode de paiement: ${order.paymentMethod}</li>
      <li>Montant de la taxe: ${order.taxPrice} HTG / ${
    order.currency.symbol
  }${(order.taxPrice / order.currency.amount).toFixed(2)}</li>
      <li>Montant de la livraison: ${order.shippingPrice} HTG / ${
    order.currency.symbol
  }${(order.shippingPrice / order.currency.amount).toFixed(2)}</li>
      <li>Montant du rabais: ${order.discountPrice} HTG / ${
    order.currency.symbol
  }${(order.discountPrice / order.currency.amount).toFixed(2)}</li>
      <li>Montant total: ${order.totalPrice} HTG / ${order.currency.symbol}${(
    order.totalPrice / order.currency.amount
  ).toFixed(2)}</li>
      <li>Adresse de livraison: ${
        order.shippingAddress && order.shippingAddress.address
          ? order.shippingAddress.address
          : 'N/A'
      }</li>
      <li>
        Articles commandés: <br />
        <ul>
          ${order.products.map((product) => {
            return `
              <li>
              ${product.qty} x ${product.name} (${product.size} ; ${product.color}) --------------- ${product.price} HTG
              </li>
            `;
          })}
        </ul>
      </li>
    </ul>
    <img src=${
      config.logoAddress
    } alt="logo" style="height: 80px; width: 80px;">
    <p>Cordialement, ${config.enterpriseName}</p>
  </body>
</html>
  `;
}

export function updateOrderDelivery(order: OrderDocument): string {
  let message: string;

  if (order.shippingAddress && order.shippingAddress.address) {
    message = `<p>Par ce message, nous vous notifions que votre commande a été livré à ${
      order.shippingAddress.address
    }, le ${
      order.deliveryAt &&
      new Date(order.deliveryAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } </p>`;
  } else {
    message = `<p>Par ce message, nous vous notifions que vous avez reçu votre commande le ${
      order.deliveryAt &&
      new Date(order.deliveryAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } </p>`;
  }
  return `
  <html>
  <body>
    <p>Hello ${order.user.name}</p>
    ${message}
    <img src=${config.logoAddress} alt="logo" style="height: 80px; width: 80px;">
    <p>Cordialement, ${config.enterpriseName}</p>
  </body>
</html>
  `;
}

export function updateOrderDeliveryAdmin(order: OrderDocument): string {
  let message: string;

  if (order.shippingAddress && order.shippingAddress.address) {
    message = `<p>Par ce message, nous vous notifions que la commande de ${
      order.user.name
    } a été livré à ${order.shippingAddress.address}, le ${
      order.deliveryAt &&
      new Date(order.deliveryAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } </p>`;
  } else {
    message = `<p>Par ce message, nous vous notifions que ${
      order.user.name
    } a reçu sa commande le ${
      order.deliveryAt &&
      new Date(order.deliveryAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } </p>`;
  }
  return `
  <html>
  <body>
    <p>Hello ${config.enterpriseName}</p>
    ${message}
    <img src=${config.logoAddress} alt="logo" style="height: 80px; width: 80px;">
    <p>Cordialement, ${config.enterpriseName}</p>
  </body>
</html>
  `;
}
