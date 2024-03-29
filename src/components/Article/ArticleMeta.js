import React from 'react';
import { Link } from 'react-router';
import ArticleActions from './ArticleActions';

const ArticleMeta = (props) => {
    const article = props.article;
    return (
        <div className="article-meta">
            <Link to={`@${article.author.username}`}>
                <img src={article.author.image} alt={"author avatar"} />
            </Link>

            <div className="info">
                <Link to={`@${article.author.username}`} className="author">
                    {article.author.username}
                </Link>
                <span className="date">
                    {new Date(article.createdAt).toDateString()}
                </span>
            </div>

            <ArticleActions canModify={props.canModify} article={article} />
        </div>
    );
};

export default ArticleMeta;