const model = require("../models/model");
const _ = require("lodash");

//post http://localhost:80801/api/categories
async function create_categories(req, res) {
  const Create = new model.Categories({
    type: "Investment",
    color: "#FCBE44",
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
}

//get http://localhost:80801/api/categories
async function get_Categories(req, res) {
  let data = await model.Categories.find({});
  return res.json(data);
}
//post http://localhost:80801/api/transaction
async function create_Transaction(req, res) {
  if (_.isEmpty(req.body))
    return res.status(400).json("PostHTTP data not Provided");

  let { name, type, amount } = req.body;
  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });
  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` });
  });
}

//get http://localhost:80801/api/transaction
async function get_Transaction(req, res) {
  let data = await model.Transaction.find({});
  return res.json(data);
}

//delete http://localhost:80801/api/transaction
async function delete_Transaction(req, res) {
  if (_.isEmpty(req.body))
    return res.status(400).json({ message: "Request body not found" });
  await model.Transaction.deleteOne(res.body, function (err) {
    if (!err) res.json("Record deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json(`Error while deleting TransactionRecord ${err}`);
    });
}

module.exports = {
  create_categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
};
