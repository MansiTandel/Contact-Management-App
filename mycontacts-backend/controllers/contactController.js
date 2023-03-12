const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
const Contact = require("../models/contactModel");

//@des Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async(req,res)=>{   // returns req,res
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});


//@des Create new contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async(req,res)=>{   // returns req,res
    console.log("the req body is:",req.body);
    const {name, email, phone} = req.body;  // destructuring of body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields aremandatory!  ");
    }
    // if not empty,
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

//@des Get individual contact
//@route POST /api/contacts/:id
//@access private

const getContact = asyncHandler(async(req,res)=>{   // returns req,res
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@des UPDATE contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async(req,res)=>{   // returns req,res
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    //before update, we check
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User doesn't have permisiion to update other user's contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
    );
    res.status(200).json(updatedContact);
});

//@des DELETE contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async(req,res)=>{   // returns req,res
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User doesn't have permisiion to update other user's contact");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});





module.exports = { getContacts,
     createContact,
      getContact, 
      updateContact,
       deleteContact};