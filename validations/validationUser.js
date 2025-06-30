// const validateUser = (schema) => async (req, res, next) => {
//   try {
//     await schema.validateUser({
//       body: req.body,
//       query: req.query,
//       params: req.params,
//     });
//     next();
//   } catch (error) {
//     return res.status(400).send(e.message);
//   }
// };

const validateUser = schema => async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


module.exports =  validateUser;
