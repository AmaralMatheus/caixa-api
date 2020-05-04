module.exports = function prepareDB(app) {
  app.dataSources.db.automigrate();
}