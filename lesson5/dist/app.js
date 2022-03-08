"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const post_1 = require("./entity/post");
const comments_1 = require("./entity/comments");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .find({ relations: ['posts'] });
    console.log(users);
    res.json(users);
    // const users = await getManager().getRepository(User)
    //     .createQueryBuilder('user')
    //     .where('user.firstName = "User3"')
    //     .getOne();
    // console.log(users);
    // res.json(users);
});
app.post('/users', async (req, res) => {
    console.log(req.body);
    const createdUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(createdUser);
});
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(createdUser);
});
app.delete('/users/:id', async (req, res) => {
    const createdUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .delete({ id: Number(req.params.id) });
    res.json(createdUser);
});
app.get('/posts/:userId', async (req, res) => {
    try {
        const user = await (0, typeorm_1.getManager)().getRepository(post_1.Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +req.params['userId'] })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        res.json(user);
    }
    catch (e) {
        console.log(e);
    }
});
app.put('/posts/:postId', async (req, res) => {
    try {
        const { title, text } = req.body;
        const updatedPost = await (0, typeorm_1.getManager)()
            .getRepository(post_1.Post)
            .update({ id: Number(req.params['postId']) }, { title, text });
        res.json(updatedPost);
    }
    catch (e) {
        console.log(e);
    }
});
app.post('/comments', async (req, res) => {
    try {
        const createdComment = await (0, typeorm_1.getManager)().getRepository(comments_1.Coment).save(req.body);
        res.status(201).json(createdComment);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/comments/:userId', async (req, res) => {
    try {
        const comments = await (0, typeorm_1.getManager)().getRepository(comments_1.Coment)
            .createQueryBuilder('comment')
            .where('comment.authorId = :id', { id: +req.params['userId'] })
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();
        res.json(comments);
    }
    catch (e) {
        console.log(e);
    }
});
app.listen(5200, async () => {
    console.log('Server has started!!!!');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map