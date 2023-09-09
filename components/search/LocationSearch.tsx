import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import Icon from '../icon/Icon';
import Input from '../bootstrap/forms/Input';
import { useGeocodingService } from '../../services/geocoding/geocoding.service';
import { SearchForTextResult } from '@aws-sdk/client-location';
import Card, { CardBody } from '../bootstrap/Card';
import { useLazyText } from '../../hooks/useLazyText';

interface LocationSearchProps {
	placeholder: string;
	goToPlace: Function;
}

const LocationSearch = ({ placeholder, goToPlace }: LocationSearchProps) => {
	const geo = useGeocodingService();
	const refSearchInput = useRef<HTMLInputElement>(null);
	const [, setSearchModalStatus] = useState(false);
	const formik = useFormik({
		initialValues: {
			searchInput: '',
		},
		onSubmit: (values) => {
			setSearchModalStatus(true);
		},
	});

	const [searchData, setSearchData] = useState<SearchForTextResult[] | null>([]);

	const resultBox = useRef<HTMLDivElement | null>(null);
	const searcher = useRef<HTMLDivElement | null>(null);
	const { text, setText, lazyText } = useLazyText('');
	useEffect(() => {
		setText(formik.values.searchInput);
		if (formik.values.searchInput) {
			setSearchModalStatus(true);
			refSearchInput?.current?.focus();
		} else {
			setSearchData([]);
		}
		return () => {
			setSearchModalStatus(false);
		};
	}, [formik.values.searchInput]);

	useEffect(() => {
		if (lazyText)
			geo.findLocation(lazyText).then((data) => {
				setSearchData(data);
			});
	}, [lazyText]);

	useEffect(() => {
		document.addEventListener('click', (e) => {
			if (
				!resultBox.current?.contains(e.target as Node) &&
				!searcher.current?.contains(e.target as Node)
			)
				setSearchData([]);
		});
	}, []);
	return (
		<>
			<div className='d-flex z-3' data-tour='search' ref={searcher}>
				{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
				<label className='border-0 bg-transparent cursor-pointer'>
					<Icon icon='Search' size='2x' color='primary' />
				</label>
				<Input
					id='searchInput'
					type='search'
					className='border-0 shadow-none bg-transparent'
					placeholder={placeholder}
					onChange={formik.handleChange}
					value={formik.values.searchInput}
					autoComplete='off'
				/>
			</div>
			{searchData?.length ? (
				<Card
					ref={resultBox}
					className={'position-absolute z-3 w-100 mt-5'}
					style={{ transform: 'translate(-19px)' }}>
					<CardBody>
						<table className='table table-hover table-modern caption-top mb-0'>
							<caption>Resultados: {searchData?.length}</caption>
							<thead className='position-sticky' style={{ top: -13 }}></thead>
							<tbody>
								{searchData?.map((item) => (
									<tr
										key={item.PlaceId}
										className='cursor-pointer'
										onClick={() => goToPlace(item)}>
										<td>
											<Icon
												icon='LocationSearching'
												size='lg'
												className='me-2'
												color='primary'
											/>
											{item.Place?.Label}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
				</Card>
			) : (
				<tr className='table-active'></tr>
			)}
		</>
	);
};

export default LocationSearch;
