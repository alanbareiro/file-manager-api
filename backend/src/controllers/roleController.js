const userService = require('../services/roleService');

const getRoles = async (req, res) => {
    try 
    {
        const result = await userService.getRoles();
        res.status(200).json(result);
    } 
    catch (error)
    {
        console.log(error);
        res.status(500).json({error:"Error getting Roles"});       
    }
};

const createRole = async (req, res) => {
    try 
    {
        const {name} = req.body;
        const result = await userService.createRole(name);
        res.status(201).json(result);
    } 
    catch (error)
     {
        console.log(error);
        res.status(500).json({error: "Error Creating Role!"});      
    }
}

module.exports = {
    getRoles,
    createRole
};