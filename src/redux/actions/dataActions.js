import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from '../types';
import axios from 'axios';

export const getScreams = () => dispatch =>{
    dispatch({
        type : LOADING_DATA
    });

    axios.get('/screams')
        .then(res =>{
            dispatch({
                type : SET_SCREAMS,
                payload : res.data
            });
        })
        .catch(err =>{
            dispatch({
                type : SET_SCREAMS,
                payload : []
            });
        })
};

export const likeScream = (screamId) => dispatch =>{
  axios.get(`/scream/${screamId}/like`)
      .then(res =>{
          dispatch({
              type : LIKE_SCREAM,
              payload :res.data
          });
      })
      .catch(err =>{
          console.log(err);
      })
};

export const unLikeScream = (screamId) => dispatch =>{
    axios.get(`/scream/${screamId}/unlike`)
        .then(res =>{
            dispatch({
                type : UNLIKE_SCREAM,
                payload :res.data
            });
        })
        .catch(err =>{
            console.log(err);
        })
};

export const deleteScream = (screamId) => dispatch =>{
    axios.delete(`/scream/${screamId}`)
        .then(() =>{
            dispatch({
                type : DELETE_SCREAM,
                payload : screamId
            });
        })
        .catch(err =>{
            console.log(err)
        })
};