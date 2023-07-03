import dbConnect from "../../../utils/mongo";
import Post from "../../../models/Post";
import multer from "multer";
import nc from "next-connect";
import path from "path";
import slugify from "slugify";

// Disabling the NextJS default bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Multer Middleware Configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public", "images", "posts"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

// This enables us pass in Middleware in Nextjs as Nextjs does not support middleware by default.
const handler = nc({
  onError: (err, req, res, next) => {

    console.log("REQ", req.body)
    res.status(500).end("Something went wrong!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page not found!");
  },
})
  .use(upload.single("image"))
  .post(async (req, res) => {
    console.log("req body", req.body)
    try {
      // const session = await getSession();
      await dbConnect();
      const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });
      const imageUrl = req.file.filename;

      const post = new Post({
        ...req.body,
        slug: slug.toLocaleLowerCase(),
        image: imageUrl,
      });

      const savedPost = await post.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default handler;
