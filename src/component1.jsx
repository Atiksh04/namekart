import React from 'react'

export class Component extends React.Component{
	render(){
		return(
			<div>
			{(this.props.value.dismissal === 'not out') ? 
			<div>
				not out
			</div>
			: 
			<p>out</p>
		}
			</div>
			
			)
	}
}