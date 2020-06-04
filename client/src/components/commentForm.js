import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment} from "../actions/commentActions";
import { NavLink } from "react-router-dom";

class CommentsForm extends Component {
    state = {
        text: ''
    }

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({[name]: value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.props.isAuth && this.state.text !== '') {
            const text = this.state.text;
            const data = {
                product_id: this.props.post_id,
                author: this.props.user._id,
                text
            };
            this
                .props
                .addComment(data);

            this.setState({text: ''})
        }
    }

    render() {
        const {user, isAuth} = this.props;

        return (
            <div className="comments-form">

                <form onSubmit={this.onSubmit} className="comments-form-content">
                    <div className="simple-input">
                        <textarea
                            type="text"
                            placeholder={isAuth
                            ? "Text..."
                            : ""}
                            value={this.state.text}
                            onChange={this.onChange}
                            disabled={!isAuth}
                            className={!isAuth && "disabled-text"}
                            name="text"></textarea>
                    </div>

                    {(!isAuth) && (
                        <div className="log-to-comment">
                            <NavLink to="/login" className="log-link">Sign In</NavLink> <span className="login-text"> to leave a comment</span>
                        </div>
                    )}

                    <button type="submit" className={`btn comment-btn ${!isAuth && "disable-btn"}`}>
                        <img src="../img/pen.png" alt=""/>
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({user: state.auth.user, isAuth: state.auth.isAuthenticated})

export default connect(mapStateToProps, {addComment})(CommentsForm);