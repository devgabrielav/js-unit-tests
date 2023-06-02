const createMenu = require('../src/restaurant');

describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {
    //Verifica se a função createMenu() retorna um objeto que possui a chave fetchMenu.
    expect(typeof createMenu()).toBe('object');
    expect(createMenu()).toHaveProperty('fetchMenu');
    //Verificando se o valor da chave fetchMenu do objeto retornado pela função createMenu() é uma função.
    expect(typeof createMenu()['fetchMenu']).toBe('function');
    //Verifica se o objeto retornado pela função createMenu({ food: {}, drinks: {} }).fetchMenu() retorna um objeto cujas chaves são somente food e drinks.
    expect(
      Object.keys(createMenu({ food: {}, drinks: {} }).fetchMenu()).length
    ).toBe(2);
    expect(createMenu({ food: {}, drinks: {} }).fetchMenu()).toHaveProperty(
      'food'
    );
    expect(createMenu({ food: {}, drinks: {} }).fetchMenu()).toHaveProperty(
      'drinks'
    );
    //Verifica se o menu passado pra função createMenu() é idêntico ao menu recuperado pela função createMenu({ food: {}, drinks: {} }).fetchMenu().
    const menu = {
      food: { coxinha: 3.9, sanduiche: 9.9 },
      drinks: { agua: 3.9, cerveja: 6.9 },
    };
    const menuC = createMenu(menu);
    const fetch = menuC.fetchMenu();
    expect(fetch).toEqual(menu);
    //Verifica se a propriedade consumption do objeto retornado pela função createMenu({ food: {}, drinks: {} }), após a criação do menu, retorna um array vazio.
    expect(createMenu().consumption).toEqual([]);
    //Nosso objeto vai receber mais uma chave, que é order e essa chave tem como valor uma função.
    expect(typeof createMenu()['order']).toBe('function');
    //Caso o valor (que nesse caso é uma string) passada por parâmetro para order não conste no objeto passado como parâmetro para createMenu (nem em food ou drinks), o retorno da chave order deve ser:
    //exibir a mensagem "Item indisponível";
    expect(createMenu(menu).order('bolo')).toEqual('Item indisponível');
    //Caso o valor exista no objeto passado como parâmetro para createMenu o item deve ser adicionado ao array consumption.
    menuC.order('sanduiche');
    expect(menuC.consumption).toEqual(['sanduiche']);
    //Verifica se, ao adicionar três pedidos em sequência, dentre bebidas e comidas, o array consumption contém os itens pedidos.
    const menuD = createMenu(menu);
    menuD.order('coxinha');
    menuD.order('agua');
    menuD.order('cerveja');
    expect(menuD.consumption).toEqual(['coxinha', 'agua', 'cerveja']);
    //Verifica se a função order aceita que pedidos repetidos sejam acrescidos a consumption.
    const menuE = createMenu(menu);
    menuE.order('cerveja');
    menuE.order('cerveja');
    expect(menuE.consumption).toEqual(['cerveja', 'cerveja']);
    //Escreva um teste que verifica que, ao chamar a função pay() que será uma propriedade do objeto retornado pela função createMenu, deve retornar a soma dos preços de tudo que foi pedido, conforme registrado em consumption. A propriedade pay tem como valor uma função.
    const menuG = createMenu(menu);
    menuG.order('coxinha');
    menuG.order('agua');
    menuG.order('cerveja');
    expect(menuG.pay()).toBeCloseTo(16.17);
    expect(typeof createMenu()['pay']).toBe('function');
  });
});
