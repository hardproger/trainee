import * as fs from 'fs';

import { models } from '../models/index';
import { util } from '../utils/utilities';

class Photo {
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
      .then(photos => res.json(photos))
      .catch(err => util.handleResponse(res, 500, 'error', 'Something went wrong :(', null, err));
  }
  addPhoto = (req, res) => {
    models.Photo.create({
      url: req.body.url,
      userId: req.user.id
    })
      .then(newPhoto => util.handleResponse(res, 200, 'success', 'Photo was successfully added!', newPhoto))
      .catch(err => util.handleResponse(res, 500, 'error', 'Something went wrong :(', null, err));
  }
  updatePhoto = (req, res) => {
    models.Photo.find({
      where: {
        id: req.params.id
      }
    })
      .then(photo => {
        photo.updateAttributes(req.body)
          .then(upPhoto => util.handleResponse(res, 200, 'success', 'Photo was successfully updated!', upPhoto))
          .catch(err => util.handleResponse(res, 500, 'error', 'Something went wrong :(', null, err));
      })
      .catch(err => util.handleResponse(res, 404, 'error', 'Photo is not found!', null, err));
  }
  deletePhoto = (req, res) => {
    models.Photo.find({
      where: {
        id: req.params.id
      }
    })
      .then(photo => {
        photo.destroy(photo)
        .then(() => {
          fs.unlink(`client/assets/userImg/${photo.url}`, () => {});
          util.handleResponse(res, 200, 'success', 'Photo was successfully deleted!');
        })
        .catch(err => {
          util.handleResponse(res, 500, 'error', 'Something went wrong :(');
          console.log(err);
        });
      })
      .catch(err => util.handleResponse(res, 404, 'error', 'Photo is not found!', null, err));
  }
  findPhoto = (req, res) => {
    models.Photo.find({
      where: {
        id: req.params.id
      }
    })
      .then(foundPhoto => res.json(foundPhoto))
      .catch(err => util.handleResponse(res, 404, 'error', 'Photo is not found!', null, err));
  }
}

export const photoCtrl = new Photo();
