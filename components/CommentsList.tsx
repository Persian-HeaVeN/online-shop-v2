'use client';
import React, { useState } from 'react';
import CommentCard from './CommentCard';

const CommentsList = ({ comments }: any) => {
	const [visibleComments, setVisibleComments] = useState(3);

	const showMoreComments = () => {
		setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
	};

	const closeComments = () => {
		setVisibleComments(3);
	};

	return (
		<div className='flex flex-col gap-4'>
			{Object.keys(comments)
				.slice(0, visibleComments)
				.map((commentID: any, index: number) => (
					<CommentCard
						key={index}
						comment={JSON.stringify(comments[commentID])}
					/>
				))}
			{visibleComments < comments.length ? (
				<div className='flex justify-center'>
					<button onClick={showMoreComments}>Show More...</button>
				</div>
			) : (
				<div className='flex justify-center'>
					<button onClick={closeComments}>Close</button>
				</div>
			)}
		</div>
	);
};

export default CommentsList;
