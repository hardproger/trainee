import * as multer from 'multer';
import * as mkdirp from 'mkdirp';


export interface MulterConfig {
  storage: any;
  fileFilter: any;
}

export const multerConfig: MulterConfig = {

  storage: multer.diskStorage({
    destination: (req, file, next) => {
      const dir = `/home/user/trainee/build/public/images/`;
      next(null, dir);
    },

    filename: function(req, file, next) {
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),

  fileFilter: function(req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log('file not supported');

      return next();
    }
  }
};
