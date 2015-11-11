function requireEntryTitle(req, res, next) {
  const title = req.body.entry.title;
  if (title) {
    next();
  } else {
    res.error('Title is required.');
    res.redirect('back');
  }
}
function requireEntryTitleLengthAbove(len) {
  return (req, res, next) => {
    const title = req.body.entry.title;
    if (title.length > len) {
      next();
    } else {
      res.error(`Title must be longer than ${len}.`);
      res.redirect('back');
    }
  };
}
