'use strict';

module.exports = function(Transaction) {
  Transaction.observe('after save', function(ctx, next) {
    var Caixa = Transaction.app.models.Caixa;
    Caixa.findById(ctx.instance.caixa_id, function(err, caixa){
      if(ctx.instance.type == 'saida') {
        caixa.saldo -= ctx.instance.amount;
      } else {
        caixa.saldo += ctx.instance.amount;
      }
      return caixa.save();
    });
    return next()
  });

  Transaction.observe('before save', function(ctx, next) {
    var Caixa = Transaction.app.models.Caixa;
    Caixa.findById(ctx.instance.caixa_id, function(err, caixa){
      console.log(ctx.instance);
      if(caixa.saldo < ctx.instance.amount && ctx.instance.type == 'saida') {
        const error = new Error("something wrong");
        error.name = "ERROR";
        error.status = 422;
        return next(error);
      } else {
        return next()
      }
    });
  });
};
