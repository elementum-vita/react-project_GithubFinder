import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';
import githubContext from './githubContext';

// function to initiate state, include all our actions
const GithubState = props => {
    // global state for anything that has to do with github 
    const initialState = {
        users: [], // array
        user: {}, // object
        repos: [], // array
        loading: false // bool
    };

    //boilerplate :: sections of code that are repeated in multiple places with little to no variation.
    const [state, dispatch] = useReducer (GithubReducer, initialState); 

    // Search Users
    const searchUsers = async text => {
        setLoading();
    
        const res = await axios.get(
          `https://api.github.com/search/users?q=${text}&client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID
          }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
            
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
      };

    // Get User

    // Get Repos

    // Clear Users

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    // 
    return (
        <GithubContext.Provider // provides to our React Components
            value ={{
                // anything available to the entire app
                users: state.users, 
                user: state.user,
                repose: state.repos, 
                loading: state.loading,
                searchUsers
            }}
        >
            {props.children} 
        </GithubContext.Provider>
    );
};

export default GithubState;