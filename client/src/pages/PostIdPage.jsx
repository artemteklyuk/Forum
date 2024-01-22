import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostsService from "../API/PostsService";
import Loader from "../components/UI/loader/Loader";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/Input/MyInput";
import login from "./Login";
import {Context} from "../App";
import {observer} from "mobx-react-lite";

const PostIdPage = observer(() => {
    const params = useParams()
    const [postByID, setPostByID] = useState({})
    const [com, setCom] = useState("")

    const [fetchPostById, isLoading, error] = useFetching(async ()=> {
        const response = await PostsService.fetchOnePost(params.id)
        setPostByID(response)
    })
    const {posts} = useContext(Context)
    const [fetchComments, isComLoading, comError] = useFetching(async ()=> {
        const response = await PostsService.fetchCommentsById(params.id)
        posts.setComments([...response])
    })

    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, [])
    const sendCom = () => {
        PostsService.createComment(com, params.id).then(r => posts.setComments([r, ...posts.comments]))
        setCom("")
    }
    return (
        <div>
            {isLoading
                ? <Loader/>
                : <div>
                    <h1>{postByID.id}. {postByID.title}</h1>
                    {postByID.body}
            </div>

            }
            <h2>
                Комментарии
            </h2>
            <div>
                <MyInput
                    value={com}
                    onChange={e => setCom(e.target.value)}
                    placeholder="Комментарий...">
                </MyInput>
                <MyButton onClick={sendCom}>Оставить</MyButton>
            </div>
            {isComLoading
                ? <Loader/>
                : <div>
                    {posts.comments.map(comm =>
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                    </div>
            }
        </div>
    );
}
)
export default PostIdPage;