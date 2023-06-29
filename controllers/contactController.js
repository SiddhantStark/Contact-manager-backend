const asyncHandler = require('express-async-handler');

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContact = asyncHandler( async (req,res)=> {
    res.status(200).json({message:"Get all contacts"});
});

//@desc Get contact id
//@route GET /api/contacts/:id
//@access public

const getContactId = asyncHandler( async (req,res)=> {
    res.status(200).json({message:`Get Contact for ${req.params.id}`});
});

//@desc create new contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler( async (req,res)=> {
    console.log("The request body is: ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory motherfucker!")
    }
    res.status(201).json({message:"Create Contact"});
});

//@desc update contact
//@route POST /api/contacts/:id
//@access public

const updateContact = asyncHandler( async (req,res)=> {
    res.status(200).json({message:`Update Contact for ${req.params.id}`});
});

//@desc delete contact
//@route POST /api/contacts/:id
//@access public

const deleteContact = asyncHandler( async (req,res)=> {
    res.status(201).json({message:`Delete contacts for ${req.params.id}`});
});

module.exports = { getContact , createContact , getContactId , updateContact , deleteContact};