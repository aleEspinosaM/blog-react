import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const ArticleActions = props => {
    const article = props.article;
    const handleDelete = () => {
        props.onClickDelete(agent.Articles.del(article.slug))
    };
    if (props.canModify) {
        return (
            <span>

                <Link
                    to={`/editor/${article.slug}`}
                    className="btn btn-outline-secondary btn-sm">
                    <i className="ion-edit"></i> Edit Article
                </Link>
                <button className="btn btn-outline-danger btn-sm" style={{marginLeft: '15px'}} onClick={handleDelete}>
                    <i className="ion-trash-a"></i> Delete Article
                 </button>
            </span>
        );
    }

    return (
        <span>
        </span>
    );
};

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: 'DELETE_ARTICLE', payload })
});

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);