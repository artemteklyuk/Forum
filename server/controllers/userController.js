import "../models/models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import {User} from "../models/models.js";

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}

class UserController {
    async registration(req, res) {
        console.log(req.method)
        const {email, password} = req.body
        const candidate = await User.findOne(
            {where: {email}
            })
        if (candidate) {
            return res.status(401).json({message: "Пользователь с таким email уже существует"})
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create(
            {email,
            password: hashPassword
            }
        )
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(500).json({message: "Пользователь не найден"})
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
           return res.status(500).json({message: "Пароль неверен"})
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}
export default new UserController()