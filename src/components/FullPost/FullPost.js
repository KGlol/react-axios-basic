/**重要问题
 * 1.this.props.id为真时,state.loadedPost可能还未从服务器中获取指定的数据,所以多加一道loading条件判断
 * 2. 
 * 	当在componentDidUpdate时执行set.state会引起re-render,
 * 	而re-render又会引起componentDidUpdate,形成循环.
 */

import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

	state = {
		loadedPost: null,
		error: false
	}

	componentDidUpdate () {
		if (this.props.id){
			if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !==this.props.id))
			axios.get('posts/' + this.props.id)
				.then( response => {
					this.setState({loadedPost: response.data});
				} );
		}
	}

	postDeleteHandler = () => {
		axios.delete('posts/' + this.props.id)//url应以字符串形式
			.then( response => {
				console.log( response );
				}
			)
			.catch( error => {
				this.setState({error: true});	
				// console.log( Object.keys( error ) )
				// console.log( error.config, error.response, error.request )
			})
	}

	render () {
		
		let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;

		
		if (this.props.id) {//null,0都会返回false, id传入时,axios.get还要花时间完成,所以要多加一步条件判断.
			post = <p style={{textAlign: "center"}}>loading...!</p>;
		}
		
		if (this.state.loadedPost) {//只有setstate执行之后,即state.loadedPost不再是null时,才能显示从服务器获取的内容
			post = (
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.body}</p>
						<div className="Edit">
							<button className="Delete" onClick={this.postDeleteHandler}>Delete</button>
						</div>
				</div>
			);
		}
		
		if (this.state.loadedPost && this.props.id !== this.state.loadedPost.id) {//null,0都会返回false, id传入时,axios.get还要花时间完成,所以要多加一步条件判断.
			post = <p style={{textAlign: "center"}}>loading...!</p>;
		}//已经加载且加载不同post时,也要显示loading
		
		if (this.state.error) {
			post = <p style={{textAlign: "center"}}>something went wrong!</p>
		}
		return post;//post不必加大括号,因为post中装的就是jsx,并不在jsx中
	}
}

export default FullPost;