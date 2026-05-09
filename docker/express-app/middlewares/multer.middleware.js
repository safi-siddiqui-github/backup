import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(process.cwd());
    cb(null, "./public/temp");
    // cb(null, `${process.cwd()}/public/temp`);
  },

  // destination: path.join(__dirname, "uploads"),
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
// export const upload = multer({ dest: './public/temp' });
