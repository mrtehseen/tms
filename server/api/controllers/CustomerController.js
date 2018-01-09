const Customer = require('../models/Customer');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const CustomerController = () => {

  const create = (req, res) => {
    console.log(req.body);
    const body = req.body;

    if (body.name != '' && body.mobile != '') {
      return Customer
        .create({
          name: body.name,
          mobile: body.mobile,
          email: body.email,
          gender: body.gender,
          status: body.status
        })
        .then((customer) => {
           return res.status(200).json({ customer });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        });
    }

    return res.status(400).json({ msg: 'Customer name and mobile number cannot be empty' });
  };

 
  const getAll = (req, res) => {

    Customer
      .findAll()
      .then((customers) => res.status(200).json({ customers }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  const update = (req, res) => {
    // params is part of an url
    const id = req.params.id;

    // body is part of form-data
    const name   = req.body.name;
    const mobile = req.body.mobile;
    const email  = req.body.email;
    const status = req.body.status;

    Customer
      .findById(id)
      .then((customer) => {
        if(!customer) {
          return res.status(400).json({ msg: 'Bad Request: Customer not found' });
        }

        return customer
          .update({
            name  : name,
            mobile: mobile,
            email : email,
            status: status
          }).then((customer) => {
            return res.status(200).json({ customer });
          });
      })
      .catch((err) => {
        // better save it to log file
        console.error(err);

        return res.status(500).json({ msg: err });
      });
  };

  const destroy = (req, res) => {
    // params is part of an url
    const id = req.params.id;

    Customer
      .findById(id)
      .then((customer) => {
        if(!customer) {
          return res.status(400).json({ msg: 'Bad Request: Customer not found' })
        }

        customer.destroy().then(() => {
          return res.status(200).json({ msg: 'Successfully destroyed customer' });
        }).catch((err) => {
          // better save it to log file
          console.error(err);

          return res.status(500).json({ msg: 'Internal server error' });
        });
      })
      .catch((err) => {
        // better save it to log file
        console.error(err);

        return res.status(500).json({ msg: 'Internal server error' });
      });
  };



  return {
    create,
    update,
    destroy,
    getAll,
  };
};

module.exports = CustomerController;
