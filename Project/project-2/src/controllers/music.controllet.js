import musicModel from "../models/music.models.js";
import jwt from "jsonwebtoken";
import uploadFile from "../services/storage.service.js";
import albumModel from "../models/album.models.js";

async function createMusic(req, res) {
  // token verify middleware kr rha hai music route me diya hua hai middleware
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "file is required",
    });
  }

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "music created",
    music,
  });
}

async function creatAlbum(req, res) {
  // token verify middleware kr rha hai music route me diya hua hai middleware
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    music: musics,
  });

  res.status(201).json({
    message: "Album created sucess",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      music: album.music,
    },
  });
}

async function getAllMusic(req, res) {
  const music = await musicModel
    .find()
    .populate("artist", "userName role email");
  res.status(200).json({
    message: "music featched",
    music: music,
  });
}

async function getAllAlbum(req, res) {
  const album = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "userName email");
  res.status(200).json({
    message: "Album featched",
    album: album,
  });
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "useName email")
    .populate("music");
  return res.status(200).json({
    message: "album featched",
    album: album,
  });
}
export { createMusic, creatAlbum, getAllMusic, getAllAlbum, getAlbumById };
