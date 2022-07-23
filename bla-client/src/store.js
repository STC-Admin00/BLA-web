import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/axios';

export default createStore({
    stories: [],
    setStories: action((state, payload) => {
        state.stories = payload;
    }),
    storyTitle: '',
    setstoryTitle: action((state, payload) => {
        state.storyTitle = payload;
    }),
    storyBody: '',
    setstoryBody: action((state, payload) => {
        state.storyBody = payload;
    }),
    editTitle: '',
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((state, payload) => {
        state.editBody = payload;
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    storyCount: computed((state) => state.stories.length),
    getStoryById: computed((state) => {
        return (id) => state.stories.find(story => (story.id).toString() === id);
    }),
    saveStory: thunk(async (actions, newStory, helpers) => {
        const { stories } = helpers.getState();
        try {
            const response = await api.story('/stories', newStory);
            actions.setStories([...stories, response.data]);
            actions.setStoryTitle('');
            actions.setStoryBody('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    deleteStory: thunk(async (actions, id, helpers) => {
        const { stories } = helpers.getState();
        try {
            await api.delete(`/stories/${id}`);
            actions.setStories(stories.filter(story => story.id !== id));
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    editStory: thunk(async (actions, updatedStory, helpers) => {
        const { stories } = helpers.getState();
        const { id } = updatedStory;
        try {
            const response = await api.put(`/stories/${id}`, updatedStory);
            actions.setStories(stories.map(story => story.id === id ? { ...response.data } : story));
            actions.setEditTitle('');
            actions.setEditBody('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    })
});