import ReactDOM from 'react-dom/client';
import App, {Context} from './App';
import UserStore from "./store/UserStore";
import PostStore from "./store/PostStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: UserStore,
        posts: PostStore
    }}>
        <App/>
    </Context.Provider>
)