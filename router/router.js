const router = require('express').Router();
const userController = require('../controller/usercontroller');
const loginController = require('../controller/logincontroller');
const todoController = require('../controller/todolistcontroller');
const userValidateMiddleware = require('../validator/uservalidator');
const authMiddleware = require('../middleware/authmiddleware');

// user api's
router.put('/user-update/:id', [authMiddleware.authenticateToken, userValidateMiddleware.addUser], userController.updateUser);
router.get('/users', authMiddleware.authenticateToken, userController.getUsers);
router.get('/users/:id', authMiddleware.authenticateToken, userController.getUsers);
router.delete('/delete-user/:id', authMiddleware.authenticateToken, userController.deleteUser);
router.get('/current-user', authMiddleware.authenticateToken, userController.getCurrentUser);

// register and login
router.post('/user-register', userValidateMiddleware.addUser, userController.createUser);
router.post('/user-login', userValidateMiddleware.login, loginController.login);

// todo api's
router.post('/create-todo', authMiddleware.authenticateToken, todoController.createTodo);
router.put('/update-todo/:id', authMiddleware.authenticateToken, todoController.updateTodo);
router.get('/view-todo', authMiddleware.authenticateToken, todoController.viewTodoList);
router.get('/view-todo/:id', authMiddleware.authenticateToken, todoController.viewTodo);
router.delete('/delete-todo/:id', authMiddleware.authenticateToken, todoController.deleteTodo);

module.exports = router;
