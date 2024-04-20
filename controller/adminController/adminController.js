const Users = require('../../Models/Users');
// const Profile = require('../../Models/profile_schema');

const getUsers = async (req, res) => {
  try {
    const users = await Users.aggregate([
      {
        $match: {
          role: 'user',
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile',
        },
      },
    ]);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};
const getAgency = async (req, res) => {
  try {
    const users = await Users.aggregate([
      {
        $match: {
          role: 'agency',
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile',
        },
      },
    ]);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

const blockUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({error: 'User ID is required'});
    }
    const user = await Users.findById(userId);
    const newBlockStatus = !user.isBlocked;
    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }
    await Users.updateOne(
        {_id: userId},
        {$set: {isBlocked: newBlockStatus}},
    );
    if (newBlockStatus == true) {
      res.status(200).json({message: 'User blocked successfully'});
    } else {
      res.status(200).json({message: 'User unblocked successfully'});
    }
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({error: 'An unexpected error occurred'});
  }
};

const RemoveUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Users.deleteOne({_id: userId});

    if (result.deletedCount === 0) {
      return res.status(404).json({message: 'User not found'});
    }

    return res.status(200).json({message: 'User deleted successfully'});
  } catch (error) {
    console.error('Error removing user:', error);
    return res.status(500).json({message: 'Internal server error'});
  }
};

const getPending = async (req, res) => {
  try {
    const pendingUsers = await Users.find({isVerified: false});

    res.json({pendingUsers});
  } catch (error) {
    console.error('Error while fetching pending users:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

const approveUser = async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  await Users.updateOne({_id: userId}, {$set: {isVerified: true}});
};

module.exports = {
  getUsers,
  getAgency,
  blockUser,
  RemoveUser,
  getPending,
  approveUser,
};
