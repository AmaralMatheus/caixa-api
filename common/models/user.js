'use strict';

module.exports = function(User) {
  User.current = function(id) {
    return User.find({
      include: {
        relation: 'caixas',
      },
      where: {
        id: id
      }
    })
  };
  
  User.remoteMethod(
    'current', {
        http: {
            path: '/current',
            verb: 'get'
        },
        accepts: {
          arg: 'id',
          type: 'number'
        },
        returns: {
            arg: 'user',
            type: 'object'
        }
    }
  );
};