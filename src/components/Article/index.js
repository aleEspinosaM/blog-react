import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
// import { Link } from 'react-router';
import agent from '../../agent';
import TagList from '../TagList';
import { connect } from 'react-redux';
import marked from 'marked';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/article'


import React, { Component } from 'react';

class Article extends Component {
    componentWillMount() {
        this.props.onLoad(Promise.all([
            agent.Articles.get(this.props.params.id),
            agent.Comments.forArticle(this.props.params.id)
        ]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        if (!this.props.article) {
            return null;
        }

        const markup = { __html: marked(this.props.article.body) };
        const canModify =  this.props.currentUser && this.props.currentUser.username === this.props.article.author.username;
        return (
            <div className="article-page">

                <div className="banner">
                    <div className="container">

                        <h1>{this.props.article.title}</h1>
                        <ArticleMeta
                            article={this.props.article}
                            canModify={canModify} />

                    </div>
                </div>

                <div className="container page">

                    <div className="row article-content">
                        <div className="col-xs-12">

                            <div dangerouslySetInnerHTML={markup}></div>

                            <ul className="tag-list">
                                <TagList list={this.props.article.tagList} />
                            </ul>

                        </div>
                    </div>

                    <hr />

                    <div className="article-actions">
                    </div>

                    <div className="row">
                        <CommentContainer
                            comments={this.props.comments || []}
                            errors={this.props.commentErrors}
                            slug={this.props.params.id}
                            currentUser={this.props.currentUser} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload => 
        dispatch({ type: ARTICLE_PAGE_LOADED, payload}),
    onUnload: () => 
        dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

export default connect(mapStateToProps,mapDispatchToProps)(Article);