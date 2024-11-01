const userService = require('../services/userService');

const getUsers = async (req, res) => {
    try 
    {
        const result = await userService.getUsers();
        res.status(200).json(result);
    } 
    catch (error)
    {
        console.log(error);
        res.status(500).json({error:"Error getting Users"});       
    }
};

const getUserById = async (req, res) => {
    try 
    {
        const id = req.params.id;
        const result = await userService.getUserById(id);
        if(result)
        {
            res.status(200).json(result);
        }    
        else 
        {
            res.status(404).json({error:"User was not founded"});
        }
    } catch (error) 
    {
        console.log(error);
        res.status(500).json({error:"Error getting user"});    
    }
}

const createUser = async (req, res) => {
    try 
    {
        console.log("createUser -- controller");
        
        const {name, email, password, roleId} = req.body;
        const result = await userService.createUser(name, email, password, roleId);
        res.status(201).json(result);
    } 
    catch (error)
     {
        console.log(error);
        res.status(500).json({error: "Error Creating Role!"});      
    }
}

const updateUser = async (req, res) => {
    try 
    {
        const id = req.params.id;
        const { name, email, password, roleId } = req.body;
        const result = await userService.updateUser (id, name, email, password, roleId);
        if(result)
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(404).json({error:"Error on userId: "+id});
        }
    } 
    catch (error) 
    {
        res.status(500).json({error:"Error Updating User"});
    }
}

const deleteUserById = async (req, res) => {
    try 
    {
        const id = req.params.id;
        const result = userService.deleteUserById(id);
        if(result)
        {
            res.sendStatus(204);
        }    
        else 
        {
            res.status(404).json({ error: 'User was not founded' });
        }
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ error: "Error deleting User"});
            
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    getUserById,
    deleteUserById
};