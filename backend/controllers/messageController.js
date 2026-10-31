import Message from '../models/Message.js';

// @desc    Submit a contact form message
// @route   POST /api/messages
// @access  Public
export const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required',
      });
    }

    // Email format check
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Umar will get back to you soon.',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message,
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private (Admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving messages',
      error: error.message,
    });
  }
};

// @desc    Mark message as read/unread
// @route   PATCH /api/messages/:id/read
// @access  Private (Admin)
export const toggleMessageRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    message.read = req.body.read !== undefined ? Boolean(req.body.read) : !message.read;
    const updated = await message.save();

    res.status(200).json({
      success: true,
      message: `Message marked as ${updated.read ? 'read' : 'unread'}`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating message status',
      error: error.message,
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting message',
      error: error.message,
    });
  }
};
