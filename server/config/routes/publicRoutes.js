module.exports = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',

  'POST /customer': 'CustomerController.create',
  'PUT /customer/:id': 'CustomerController.update',
  'DELETE /customer/:id': 'CustomerController.destroy',
};
