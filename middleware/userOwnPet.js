function userOwnPet(req, res, next) {
  const { userId, ownerId } = req.body;
    if (userId !== ownerId) {
      res.status(400).send('You can not return this pet, is not yours to retun.');
      return;
    }
    next();
  }
  
  
  module.exports = {userOwnPet}
  