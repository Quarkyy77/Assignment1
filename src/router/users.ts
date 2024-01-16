import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middleware';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);//can delete only if the user is the owner of the account
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);// can update only if the user is the owner of the account
};
