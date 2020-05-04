'use strict';

module.exports = function(Caixa) {
  Caixa.transactions = function(id) {
    return Caixa.find({
      include: {
        relation: 'transactions',
        scope: { // further filter the owner object
          include: { // include orders for the owner
            relation: 'category',// only select order with id 5
          }
        }
      },
      where: {
        id: id
      }
    })
  };
  
  Caixa.remoteMethod(
    'transactions', {
        http: {
            path: '/transactions',
            verb: 'get'
        },
        accepts: {
          arg: 'id',
          type: 'number'
        },
        returns: {
            arg: 'caixa',
            type: 'object'
        }
    }
  );
};
