import "../models/models.js"
import {PostTheme} from "../models/models.js";

class PostThemeController {
    async getAll(req, res) {
        const themes = await PostTheme.findAll()
        res.json(themes)
    }
}

export default new PostThemeController()