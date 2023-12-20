module.exports = async (req, res) => {
    // Get user data by ID
    let UserData;
    try {
      UserData = await queryMySQL('SELECT * FROM user WHERE UserID = ?', [req.session.userId]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).send('Internal Server Error');
    }

    // Get all user data
    let allUserData;
    try {
      allUserData = await queryMySQL('SELECT * FROM user');
    } catch (error) {
      console.error('Error fetching all user data:', error);
      return res.status(500).send('Internal Server Error');
    }

    // Get all drawings with user data
    let posts;
    try {
      posts = await queryMySQL('SELECT * FROM drawing ORDER BY UploadDate DESC');
    } catch (error) {
      console.error('Error fetching drawings:', error);
      return res.status(500).send('Internal Server Error');
    }

    // Get comments for each post
    let comments = {};
    console.log("post");
    console.log(posts);
    for (let post of posts) {
      let postComments;
      try {
        postComments = await queryMySQL('SELECT * FROM comment WHERE DrawingID = ?', [post._id]);
      } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
      }

      comments[post._id] = { comment: postComments };
    }

    // console.log();
    console.log("commet");
    console.log(comments[10]);

    res.render('manu', {UserData : UserData[0], Post:posts, allUserData, comments });
  };