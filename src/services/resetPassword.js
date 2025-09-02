import bycrypt from 'bcrypt';
import Users from '../db/models/user.js';

export async function resetPassword(userId, oldPassword, newPassword){
   const user = await Users.findByPk(userId)

   console.log(user, "user from resetPassword service");
    console.log(oldPassword, newPassword, "old and new password");
   if (!user) 
    throw new Error("User not found");

   console.log(user.password, "user password from db");

    const isMatch = await bycrypt.compare(oldPassword, user.password);

   console.log(isMatch, "isMatch");

   if(!isMatch) throw new Error("Old Passwors is incorrect");

   const salt = await bycrypt.genSalt(10);
   const hashedPassword = await bycrypt.hash(newPassword, salt);

   user.password = hashedPassword;
   await user.save();
}
