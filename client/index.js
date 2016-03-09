'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let CommentBox = require('./comment.js').CommentBox;

ReactDOM.render(
  <CommentBox url='/data/comments.json' pollInterval={2000} />,
  document.getElementById('content')
);
