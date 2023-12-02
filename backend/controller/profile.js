exports.profile = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.userId);

        if (!user) {
            res.send({
                status: 404,
                message: "User not found"
            });
        } else {
            res.send({
                status: 200,
                message: "User profile fetched successfully",
                user: user
            });
        }
    } catch (err) {
        console.log("Error during fetching profile", err);
        res.send({
            status: 500,
            message: "Internal server error"
        });
    }
};