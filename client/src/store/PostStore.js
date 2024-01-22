import {makeAutoObservable} from "mobx";

class PostStore {
    constructor(props) {
        this._themes = []
        this._posts = []
        this._selectedTheme = []
        this._comments = []
        makeAutoObservable(this)
    }
    setThemes(themes) {
        this._themes = themes
    }
    setPosts(posts) {
        this._posts = posts
    }
    setComments(comments) {
        this._comments = comments
    }
    setSelectedTheme(theme) {
        this._selectedTheme = theme
    }
    get comments() {
        return this._comments
    }
    get themes() {
        return this._themes
    }
    get posts() {
        return this._posts
    }
    get selectedTheme() {
        return this._selectedTheme
    }

}
export default new PostStore()