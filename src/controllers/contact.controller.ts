import { Request, Response } from 'express';
import { Contact } from '../models/contact.model';


export const getContacts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    // Build filters object based on query params
    const filters: any = {};
    if (req.query.name) filters.name = { $regex: req.query.name, $options: 'i' };
    if (req.query.phone) filters.phone = { $regex: req.query.phone, $options: 'i' };
    if (req.query.address) filters.address = { $regex: req.query.address, $options: 'i' };

    const contacts = await Contact.find(filters)
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(filters);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalContacts: total,
      contacts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, notes } = req.body;

    if (!name || !phone || !address || !notes) {
      res.status(400).json({ message: 'All fields are required.' });
      return ;
    }

    const contact = new Contact({ name, phone, address, notes });
    await contact.save();

    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact', error: err });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, address, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { name, phone, address, notes },
      { new: true }
    );

    if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return;
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact', error: err });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact){ 
        res.status(404).json({ message: 'Contact not found' });
        return
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err });
  }
};
