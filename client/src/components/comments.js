import React, {Component} from 'react';
import {connect} from 'react-redux';

import CommentsForm from './commentForm';
import CommentsItem from './commentItem';

class Comments extends Component {

    render() {
        const {comments, commentsLoading} = this.props;

        return (
            <div className="comments-section">
                <CommentsForm post_id={this.props.post_id}/>

                <div className="comment-items">
                    {(comments.length > 0) ? (comments.map(elem => (<CommentsItem data={elem} key={elem._id}/>))) : (
                        <div className="no-comments">No comments yet</div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({comments: state.comment.comments, commentsLoading: state.comment.commentsLoading})

export default connect(mapStateToProps, {})(Comments);