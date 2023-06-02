/* eslint-disable max-len */
// Siga as orientações do README!
const menus = {
  food: { coxinha: 3.9, sanduiche: 9.9 },
  drinks: { agua: 3.9, cerveja: 6.9 },
};

const createMenu = (obj) => {
  const menu = {
    fetchMenu: () => obj,
    consumption: [],
    order: (string) => {
      if (obj.food[string] || obj.drinks[string]) {
        return menu.consumption.push(string);
      }
      return 'Item indisponível';
    },
    pay: () => {
      let total = 0;
      for (let index = 0; index < menu.consumption.length; index += 1) {
        const pedidos = menu.consumption[index];
        if (obj.food[pedidos]) {
          total += obj.food[pedidos];
        } else if (obj.drinks[pedidos]) {
          total += obj.drinks[pedidos];
        }
      }
      return total * 1.1;
    },
  };
  return menu;
};

module.exports = createMenu;
