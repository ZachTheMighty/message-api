const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const uploadImage = [
  upload.single("file"),
  async (req, res, next) => {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );

    const filePath = `${Date.now()}_${req.file.originalname}`;

    try {
      const { error } = await supabase.storage
        .from("files")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });
      if (error) throw error;
    } catch (error) {
      throw error;
    }
    req.imageUrl = supabase.storage
      .from("files")
      .getPublicUrl(filePath).data.publicUrl;
    next();
  },
];

module.exports = uploadImage;
