import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/storiesTable.css'

const Stories = () => {
    const [stories, setStories] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getStories = async () => {
            try {
                const response = await axiosPrivate.get('/api/stories', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setStories(response.data);
            } catch (err) {
                console.error(err);
                navigate('/home', { state: { from: location }, replace: true });
            }
        }
        getStories();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    
    return (
        <article>
            <h2 className='storiesListLabel'>Stories List</h2>
            {stories?.length
                ? (
                    <ol>
                        {stories.map((story, i) => 
                        <li className='storyListItem' key={i}>
                            {story?.storyTitle}
                            {story?.storyURL}
                            {story?.desc}
                            </li>)
                        }
                    </ol>
                ) : <p>No Stories to display</p>
            }
        </article>
    )
};

export default Stories;