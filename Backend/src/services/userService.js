const User = require('../models/user');

// Obtener todos los usuarios
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener un usuario por ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Crear un nuevo usuario
const createUser = async ({ name, email }) => {
  try {
    const newUser = await User.create({ name, email });
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Actualizar un usuario por ID
const updateUser = async (userId, { name, email }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('Usuario no encontrado');
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Eliminar un usuario por ID
const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error('Usuario no encontrado');
    }
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
