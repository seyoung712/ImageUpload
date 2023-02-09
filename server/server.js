const express = require('express');
const multer = require('multer');
const { v4 : uuid } = require('uuid') //v4를 사용하고 이름은 uuid로 사용
const mime = require("mime-types")


//const upload = multer({ dest: "uploads" })
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) =>
        cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
  });
const upload = multer({ storage });

const app = express(); //미들웨어를 app에 추가
const PORT = 5000;

app.use("/uploads", express.static("uploads"));

app.post('/upload', upload.single("imageTest"), (req, res) => {
    console.log(req.file);
    res.json(req.file);
})

//Express server 설정
app.listen(PORT, () => console.log("Express server listening on PORT " + PORT));

