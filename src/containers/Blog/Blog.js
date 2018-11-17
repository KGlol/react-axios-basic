import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

import './Blog.css';

class Blog extends Component {
	
	state = {
		posts: [],
		selectedPostId: null
	}

	componentDidMount() {
		axios.get('/posts')//url应以字符串形式
			.then( response => {
				const posts = response.data.slice(0,4);//只保留data的前四个元素
				const updatesPosts = posts.map( post => {
					return {
						...post,
						author: "KG"
					}
				});
				this.setState({posts: updatesPosts})
			} );
		// this.setState(...) 在axios之外不行,异步
	}

	postSeletedHandler(id) {
		this.setState({selectedPostId: id});
	}

	render () {
		const posts = this.state.posts.map( post =>
			<Post 
				key={post.id} 
				title={post.title}
				author={post.author} 
				clicked={() => this.postSeletedHandler(post.id)}
			/>
		);

		return (
			<div>
				<section className="Posts">
					{posts}
				</section>
				<section>
					<FullPost id={this.state.selectedPostId}/>
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;