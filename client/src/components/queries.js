import gql from 'graphql-tag';

export const ADD_COMMENT = gql`
mutation($text:String!,$product_id:String!){
    addComment(text:$text,product_id:$product_id) {
        _id
        text
        product_id{
            title
            count
        }
        createdAt
    }
}
`;

export const COMMENT_QUERY = gql `
    {
        comments{
            _id
            text
            product_id{
                title
                count
            }
            createdAt
        }
    }
`;

export const EDIT_COMMENT = gql`
    mutation($text:String!,$_id:String!){
        editComment(text:$text,_id:$_id) {
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

export const DELETE_COMMENT = gql`
    mutation($_id:String!){
        deleteComment(_id:$_id) {
            _id
        }
    }
`