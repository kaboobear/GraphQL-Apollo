import React from 'react';
import {useQuery} from 'react-apollo';
import Moment from 'react-moment';
import AddForm from './add-form';
import {NavLink} from 'react-router-dom';
import {COMMENT_QUERY} from "./queries";

const Main = () => {
    const {loading, data} = useQuery(COMMENT_QUERY)

    return (
        <div className="container">
            <h1 className="main-title">GraphQL</h1>
            <AddForm/>
            {(loading)
                ? (
                    <h3>Loading...</h3>
                )
                : (
                    <div className="comment-items">
                        {data
                            .comments
                            .map(comment => {
                                const comDate = new Date(parseInt(comment.createdAt));
                                return(
                                <div key={comment._id} className="comment-wrap">
                                    <NavLink to={`/item/${comment._id}`} className="comment-item">
                                        <div className="comment-top">
                                            <div className="comment-title">
                                                {comment.product_id.title}
                                            </div>

                                            <Moment className="comment-time" fromNow>{comDate}</Moment>
                                        </div>

                                        <div className="comment-text">
                                            {comment.text}
                                        </div>
                                    </NavLink>
                                </div>
                            )})
}
                    </div>
                )}
        </div>
    )
}

export default Main;
