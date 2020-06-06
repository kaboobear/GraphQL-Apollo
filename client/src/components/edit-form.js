import React, {useState, useEffect} from 'react';
import {useMutation} from 'react-apollo';
import {EDIT_COMMENT, DELETE_COMMENT, COMMENT_QUERY} from "./queries";
import {withRouter} from 'react-router-dom';

const Form = (props) => {
    const [text,
        setText] = useState('');

    const [editComment] = useMutation(EDIT_COMMENT);
    const [deleteComment] = useMutation(DELETE_COMMENT);

    useEffect(() => {
        setText(props.data.text)
    }, []);

    const onChange = (e) => {
        const {value} = e.target;
        setText(value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            text,
            _id: props.data._id
        };

        editComment({
            variables: data,
            update: (store, {data}) => {
                const updatedElem = data.editComment;
                const allComments = store.readQuery({query: COMMENT_QUERY});
                store.writeQuery({
                    query: COMMENT_QUERY,
                    data: {
                        comments: allComments
                            .comments
                            .map(elem => elem._id === updatedElem._id
                                ? updatedElem
                                : elem)
                    }
                })
                props
                    .history
                    .push('/');
            }
        })

        setText('');
    }

    const del = () => {
        deleteComment({
            variables: {
                _id: props.data._id
            },
            update: (store, {data}) => {
                const del_id = data.deleteComment._id;
                const allComments = store.readQuery({query: COMMENT_QUERY});
                store.writeQuery({
                    query: COMMENT_QUERY,
                    data: {
                        comments: allComments
                            .comments
                            .filter(elem => (elem._id !== del_id))
                    }
                })
                props
                    .history
                    .push('/');
            }
        })
    }

    return (
        <form onSubmit={onSubmit} className="edit-form">
            <div className="simple-input">
                <input
                    type="text"
                    name="text"
                    value={text}
                    placeholder="Text..."
                    onChange={onChange}/>

                <div className="line"></div>
            </div>

            <div className="form-btns">
                <button type="submit" className="btn">
                    Edit
                </button>

                <div onClick={del} className="btn del-btn">Delete</div>
            </div>
        </form>
    );
}

export default withRouter(Form);
