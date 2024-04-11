// Middleware to validate search text
function validateSearchText(req, res, next) {
  const searchText = req.query.q;
  if (!searchText) {
    return res.status(400).json({ message: 'Search text is required' });
  }
  next();
}

export { validateSearchText };
