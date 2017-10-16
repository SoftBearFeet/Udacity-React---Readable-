import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styling/main.css';

import NavOrderTab from './components/nav_sorts';

import { fetchPosts, orderByVote, orderByTime } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts = () => {
    const { sorts, posts } = this.props;
    const sort = sorts.order === 'byVotes' ? _.sortBy(posts, (post) => post.voteScore) : _.sortBy(posts, (post) => post.timestamp)
    return _.map(sort, post => {
      if (post.deleted === false) {
        return (
          <li key={post.id}>
            <div className='post-title'>
              <Link to={`/posts/${post.id}`} >
              {post.title}
              </Link>
            </div>
            <div className='post-edit'>
              <Link to={`/posts/edit/${post.id}`}>
                <FontAwesome name='pencil-square-o' aria-hidden="true" />
              </Link>
            </div>
          </li>
        );
      }
    });
  }


  render() {
    return (
      <div className="App">
        <div className='sort-tab'>
          <h5>Sort by:</h5> <NavOrderTab orderByTime={this.props.orderByTime} orderByVotes={this.props.orderByVote} topic='posts' />
        </div>
        <h3 className='index'>Post Index</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts, sorts }) {
  return {
    categories,
    posts,
    sorts: sorts.posts
  }
}

export default connect(mapStateToProps, { fetchPosts, orderByVote, orderByTime } )(App);