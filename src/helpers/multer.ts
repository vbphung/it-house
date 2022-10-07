import multer from "multer";

const ExcelUploader = multer({
  dest: "uploads/",
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      return callback(new Error("only .xlsx file is allowed"));
    }

    if (
      file.mimetype !=
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return callback(new Error("only .xlsx file is allowed"));
    }

    callback(null, true);
  },
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});

export default ExcelUploader;
