const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const ValidationError = require('../errors/validation-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.delLiked = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate({ _id: cardId }, { $pull: { likes: req.user._id } }, {
    new: true,
    runValidators: true,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError();
      }
      return res.status(200).send({ message: 'Произошло удаление лайка', data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new CastError());
      if (err.name === 'NotFoundError') next(new NotFoundError());
      next(err);
    });
};

module.exports.sendLiked = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate({ _id: cardId }, { $addToSet: { likes: req.user._id } }, {
    new: true,
    runValidators: true,
  })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(); // good work
      }
      return res.status(200).send({ message: 'Произошло постановка лайка', data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new CastError());
      if (err.name === 'NotFoundError') next(new NotFoundError());
      next(err);
    });
};

module.exports.delCardId = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .orFail(() => new NotFoundError())
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError());
      }
      Card.deleteOne(card)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name, link, owner: req.user._id,
  })
    .then((card) => {
      res.send(
        {
          data: card,
          owner: req.user._id,
        },
      );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new ValidationError(err.message));
      next(err);
    });
};
