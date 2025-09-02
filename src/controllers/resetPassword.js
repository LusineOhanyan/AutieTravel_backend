// controllers/resetPasswordController.js
import { resetPassword } from "../services/resetPassword.js";

export async function resetPasswordController(req, res) {
    const { oldPassword, newPassword } = req.body;

    // Ստուգում ենք, որ երկու դաշտերն էլ ստացվել են
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Old password and new password are required" });
    }

    try {
        // req.user արդեն middleware-ով լրացված է՝ authenticated user-ի տվյալներով
        const id = req.userID;

        // Կոչում ենք service ֆունկցիան, որը իրականում թարմացնում է password-ը
        await resetPassword(id, oldPassword, newPassword);

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
