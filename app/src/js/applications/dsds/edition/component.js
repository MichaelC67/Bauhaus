import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from 'index';
import { Input, Loading, ErrorBloc } from '@inseefr/wilco';
import Controls from './controls';
import Components from './components';
import { StructureAPI } from 'bauhaus-structures';
import D from 'js/i18n';

const defaultDSD = {
	id: '',
	labelLg1: '',
	labelLg2: '',
	descriptionLg1: '',
	descriptionLg2: '',
	components: [],
};

const Edition = ({ creation, initDSD }) => {
	const [DSD, setDSD] = useState(() => defaultDSD);
	const [loading, setLoading] = useState(false);
	const [redirectId, setRedirectId] = useState('');
	const onChange = (key, value) => setDSD({ ...DSD, [key]: value });
	const { lg1, lg2 } = useContext(AppContext);
	const {
		id,
		labelLg1,
		labelLg2,
		descriptionLg1,
		descriptionLg2,
		components,
	} = DSD;
	useEffect(() => {
		setDSD({ ...defaultDSD, ...initDSD });
	}, [initDSD]);

	if (redirectId) return <Redirect to={`/dsds/${id}`} />;
	if (loading) return <Loading textType={'saving'} />;

	let errorMessage;
	if (!id) {
		errorMessage = D.requiredId;
	} else if (!labelLg1) {
		errorMessage = D.requiredLabel;
	}
	return (
		<>
			<Controls
				creation={creation}
				save={() => {
					setLoading(true);
					(creation
						? StructureAPI.postStructure(DSD)
						: StructureAPI.putStructure(DSD)
					).then(id => {
						setRedirectId(id);
					});
				}}
				disabledSave={!id || !labelLg1}
			/>
			<ErrorBloc error={errorMessage} />
			<Input
				id="id"
				label={
					<>
						{D.idTitle} <span className="boldRed">*</span>
					</>
				}
				value={id}
				onChange={e => onChange('id', e.target.value)}
				disabled={!creation}
			/>
			<div className="row">
				<div className="col-md-6">
					<Input
						id="labelLg1"
						label={
							<>
								{D.labelTitle} <span className="boldRed">*</span>
							</>
						}
						value={labelLg1}
						onChange={e => onChange('labelLg1', e.target.value)}
						lang={lg1}
					/>
				</div>
				<div className="col-md-6">
					<Input
						id="labelLg2"
						label={D.labelTitle}
						value={labelLg2}
						onChange={e => onChange('labelLg2', e.target.value)}
						lang={lg2}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<Input
						id="descriptionLg1"
						label={D.descriptionTitle}
						value={descriptionLg1}
						onChange={e => onChange('descriptionLg1', e.target.value)}
						lang={lg1}
					/>
				</div>
				<div className="col-md-6">
					<Input
						id="descriptionLg2"
						label={D.descriptionTitle}
						value={descriptionLg2}
						onChange={e => onChange('descriptionLg2', e.target.value)}
						lang={lg2}
					/>
				</div>
			</div>
			<Components
				components={components}
				onChange={components => onChange('components', components)}
			/>
		</>
	);
};

export default Edition;
