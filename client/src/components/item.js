import React,{useState} from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';
import Moment from 'react-moment';
import EditForm from './edit-form';

const COMMENT_QUERY2 = gql `
        query ($_id: String!){
            comment(_id:$_id){
                _id
                text
                product_id{
                    title
                    count
                }
                createdAt
            }
        }
`

const Item = (props) => {
    const [_id,setId] = useState(props.match.params.id);
    const {loading, data} = useQuery(COMMENT_QUERY2,{variables:{_id}})

    return (
        <div className="container">
            <h1 className="main-title">Item Page</h1>

                {
                    (loading) ? (
                         <h3>Loading...</h3>
                    )
                    :(
                    
                     <div>
                        <EditForm data={data.comment}/>
                    </div>
                    )}
        </div>
    );
}

export default Item;
