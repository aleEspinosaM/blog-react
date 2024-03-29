import React from 'react';
import { Link } from 'react-router'
import TagList from './TagList';

const ArticlePreview = ({article}) => {
//   const article = props.article;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a>
          <img src={article.author.image} alt={'author avatar'} />
        </a>

        <div className="info">
          <a className="author">
            {article.author.username}
          </a>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button
            className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          <TagList list={article.tagList} />
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;