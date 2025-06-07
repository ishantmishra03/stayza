import userModel from "../models/user.models.js"
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.SIGNING_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_adresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }

        switch (type) {
            case "user.created": {
                await userModel.create(userData);
                break;
            }
            case "user.updated": {
                await userModel.findByIdAndUpdate(data.id, userData);
                break;
            }
            case "user.deleted": {
                await userModel.findByIdAndDelete(data.id);
                break;
            }
        }
        res.json({ success: true, message: "Webhook received" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default clerkWebHooks