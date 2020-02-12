import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor-html.scss';
import { getLang } from '@inseefr/wilco';

import { mdFromEditorState, editorStateFromMd } from 'js/utils/html';

export const toolbar = {
	options: ['list', 'inline', 'link'],
	list: {
		inDropdown: false,
		className: undefined,
		options: ['unordered', 'ordered'],
	},
	inline: {
		options: ['bold', 'italic'],
	},
};

class EditorMarkdown extends Component {
	static propTypes = {
		text: PropTypes.string,
		handleChange: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		const { text } = props;
		this.state = {
			editorState: editorStateFromMd(text || ''),
			text,
		};

		this.editorRef = React.createRef();
	}

	handleChange = editorState => {
		this.setState({
			editorState,
		});
	};
	handleLeave = () => {
		this.props.handleChange(mdFromEditorState(this.state.editorState));
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			editorState: editorStateFromMd(nextProps.text || ''),
		});
	}

	render() {
		return (
			<Editor
				ref={this.editorRef}
				editorState={this.state.editorState}
				toolbar={toolbar}
				toolbarClassName="home-toolbar"
				wrapperClassName="home-wrapper"
				editorClassName="home-editor"
				onEditorStateChange={this.handleChange}
				onBlur={this.handleLeave}
				localization={{
					locale: getLang(),
				}}
			/>
		);
	}
}

export default EditorMarkdown;
