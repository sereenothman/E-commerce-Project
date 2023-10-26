function generateToken(user) {
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      'secretkey',
      {
        expiresIn: '1h',
      }
    );
    return accessToken;
  }

  module.exports=generateToken