import sequelize from "../db.js"
import {DataTypes} from "sequelize";

const User = sequelize.define("User", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const PostTheme = sequelize.define("Post_theme", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Post = sequelize.define("Post", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    body: {type: DataTypes.TEXT, allowNull: false},
})
const Comments = sequelize.define("Comments", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    body: {type: DataTypes.STRING, allowNull: false},
})
User.hasMany(Post)
Post.belongsTo(User)

User.hasMany(Comments)
Comments.belongsTo(User)

Post.hasMany(Comments)
Comments.belongsTo(Post)

PostTheme.hasMany(Post)
Post.belongsTo(PostTheme)

export {
    User,
    PostTheme,
    Post,
    Comments
}