"use strict";
// import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// AppDataSource.initialize().then(async () => {
//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)
//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)
//     console.log("Here you can setup and run express / fastify / any other framework.")
// }).catch(error => console.log(error))
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: (0, path_1.resolve)(__dirname, "../.env") });
const express_1 = __importDefault(require("express"));
const User_1 = require("./entity/User");
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
(0, typeorm_1.createConnection)({
    type: "mongodb",
    url: process.env.MONGODB_CONNECTION,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: [User_1.User],
})
    .then(() => console.log("connected to DB"))
    .catch((err) => console.error(err));

app.get("/api/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, typeorm_1.getMongoRepository)(User_1.User);
        let member = yield User_1.User.findOne({
            
            description: "Abhi",
            duedate: "20sep",
            status : "20",
            assignee : "Abhi"
        });
        res.send(member);
    }
    catch (err) {
        console.log(err);
    }
}));

app.post("/api/post", async (req, res) => {
const data = req.body
try{
    const user = new User() 
    user.description = data.description
    user.assignee = data.assignee
    user.due_date = data.due_date
    user.status = data.status
    await AppDataSource.manager.save(user)
}catch(err){
    console.log(err);
}

})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server is unser port :", PORT));
//# sourceMappingURL=index.js.map