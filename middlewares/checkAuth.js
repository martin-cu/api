exports.isPrivate = (req, res, next) => {
  if (req.session.authority >= 0) {
    return next();
  } 
  else {
    res.redirect('/login');
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.session.authority == 0) {
    req.flash('error_msg', 'Trying to access invalid route!')
    res.redirect('/dashboard')
  }
  else {
    return next();
  }
};