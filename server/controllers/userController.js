import { use } from "react";

//Get User Data | /api/user |
export const getUserData = (req,res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        return res.json({success: true, role, recentSearchedCities});
    } catch (error) {
        return res.json({success: false, message : error.message});
    }
}

//Store recent searched cities
export const storeRecentSearchedCities = async (req,res) => {
    try {
        const {recentSearchedCities} = req.body;
        const user = await req.user;
        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCities);
        } else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities);
        }

        await user.save();
        res.json({success: true, message : "City Added"});
    } catch (error) {
         return res.json({success: false, message : error.message});
    }
}