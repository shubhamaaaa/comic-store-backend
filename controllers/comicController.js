const Comic = require('../models/comicModel');

// Create a new comic book
exports.createComic = async (req, res) => {
  try {
    const comic = await Comic.create(req.body);
    res.status(201).json(comic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all comic books
exports.getComics = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const comics = await Comic.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Comic.countDocuments(filters);
    res.status(200).json({ total: count, page, comics });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get comic book details by ID
exports.getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(200).json(comic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a comic book
exports.updateComic = async (req, res) => {
  try {
    const comic = await Comic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(200).json(comic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a comic book
exports.deleteComic = async (req, res) => {
  try {
    const comic = await Comic.findByIdAndDelete(req.params.id);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
