const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler( async (req,res)=> {
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json(contact);
});

//@desc Get contact id
//@route GET /api/contacts/:id
//@access private

const getContactId = asyncHandler( async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({message:`Get Contact for ${req.params.id}`});
});

//@desc create new contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler( async (req,res)=> {
    console.log("The request body is: ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory motherfucker!")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(contact);
});

//@desc update contact
//@route POST /api/contacts/:id
//@access private

const updateContact = asyncHandler( async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contacts doesn't exist");
    }

    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User doesn't have the permission to update other user!");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )

    res.status(200).json(updatedContact);
});

//@desc delete contact
//@route POST /api/contacts/:id
//@access private

const deleteContact = asyncHandler( async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    //console.log("Delete Contact")
    if(!contact){
        res.status(404);
        throw new Error("Contacts doesn't exist");
    }

    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User doesn't have the permission to update other user!");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = { getContact , createContact , getContactId , updateContact , deleteContact};