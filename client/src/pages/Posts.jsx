import React, {useContext, useEffect, useRef, useState} from "react";
import {usePosts, usePostsByTheme} from "../hooks/usePosts";
import PostsService from "../API/PostsService";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import MySelect from "../components/UI/select/MySelect";
import NavThemes from "../components/NavThemes";
import {observer} from "mobx-react-lite";
import {Context} from "../App";


const Posts = observer(() => {
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(-1)
    const [page, setPage] = useState(1)
    const {posts} = useContext(Context)
    const sortedAndSearchedPosts = usePostsByTheme(posts.posts, filter.sort, filter.query, posts.selectedTheme.id)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostsService.fetchPosts(limit, page)
        posts.setPosts([...response])
    })
    const [fetchThemes, isThemesLoading, themesError] = useFetching(async () => {
        const response = await PostsService.fetchThemes()
        posts.setThemes([...response])
    })

    useEffect(() => {
        fetchPosts()
        fetchThemes()
    }, [page, limit])

    const removePost = (id) => {
        PostsService.deletePost(id)
        PostsService.deleteCommentsByPostId(id)
        posts.setComments(posts.comments.filter(p => p.PostId !== id))
        posts.setPosts(posts.posts.filter(p => p.id !== id))
    }

    const createPost = (newPost) => {
        PostsService.createPost(newPost.title, newPost.theme, newPost.body)
            .then(r => posts.setPosts([...posts.posts, r]))
        setModal(false)
    }
    const changePage = (page) => {
        setPage(page)
    }
    return (
        <div className="App">
            <div className="App__navThemes">
                <NavThemes themes={posts.themes}/>
            </div>
            <div className="App__posts">
                <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Создать пост
                </MyButton>
                <MyButton style={{marginTop: 30}} onClick={() => posts.setSelectedTheme([])}>
                    Показать все посты
                </MyButton>
                <MyModal visible={modal} setvisible={setModal}>
                    <PostForm create={createPost}/>
                </MyModal>
                <hr style={{margin: '15px 0'}}/>
                <PostFilter filter={filter}
                            setFilter={setFilter}

                />
                <MySelect
                    value={limit}
                    onChange={value => setLimit(value)}
                    defaultValue="Кол-во элементов на странице"
                    options={[
                        {value: 5, name: "5"},
                        {value: 10, name: "10"},
                        {value: 15, name: "15"},
                        {value: -1, name: "Показать все"},

                    ]}
                />
                {postError &&
                    <h1> Error {postError}</h1>
                }
                <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPosts}
                    theme={(typeof posts.selectedTheme.id) != "number" ? "Все посты" : `Посты про ${posts.selectedTheme.name}`}
                />
                {isPostsLoading &&
                    <div style={{display: "flex", justifyContent: "center", marginTop: 50}}>
                        <Loader/>
                    </div>
                }
                <Pagination page={page}
                            changePage={changePage}
                            totalPages={totalPages}
                />
            </div>
            <div className="App__marketing">
                Marketing
            </div>
        </div>
    )
})

export default Posts;