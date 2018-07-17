import { models } from '../models/index';
import Util from '../utils/utilities';
const util = new Util;

export default class Photo {
  getPhotos = (req, res) => {
    console.log(req.body);
    models.Photo.findAll({
      where: {
        userId: req.params.userId
      },
      order: [
        ['id', 'ASC']
      ]
    })
      .then(photos => res.send(photos))
      .catch(err => res.send(err));
  }
  addPhoto = (req, res) => {
    models.Photo.create({
      url: req.body.url,
      userId: req.user.id
    })
      .then(newPhoto => res.send(newPhoto))
      .catch(err => res.send(err));
  }
  updatePhoto = (req, res) => {
    models.Photo.find({
      where: {
        id: req.params.id
      }
    })
      .then(photo => {
        photo.updateAttributes(req.body)
          .then(upPhoto => res.send(upPhoto))
          .catch(err => res.send(err));
      })
      .catch(err => res.send(err));
  }
  deletePhoto = (req, res) => {
    models.Photo.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => res.send('success'))
      .catch(err => res.send(err));
  }
  findPhoto = (req, res) => {
    models.Photo.find({
      where: {
        id: req.params.id
      }
    })
      .then(foundPhoto => res.send(foundPhoto))
      .catch(err => res.send(err));
  }
}
