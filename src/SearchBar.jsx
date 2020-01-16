import React from 'react';
import AutocompleteCity from './AutocompleteCity';
import crossfilter from 'crossfilter2';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import cities from './cities.json';
import request from 'request';

const getCurrentCityOfUser = new Promise((resolve, reject) => {
	request('https://freegeoip.app/json/', (error, response, body) => {
		if (!error) {
			const result = JSON.parse(body);
			if (result.city) {
				resolve(result.city + ', ' + result.region_name + ', ' + result.country_name);
			} else {
				reject('Could not detect city!');
			}
		} else {
			reject(error);
		}
	});
});

const citiesFilter = crossfilter(cities);
const cityNameDimension = citiesFilter.dimension((city) => {
	return decodeURI(city.name) || '';
});

class SearchBar extends React.Component {
	componentDidMount() {
		getCurrentCityOfUser.then(result => {
			this._asyncRequest = null;
			this.setState({
				selectedCity: result
			});
		}).catch(err => {
			console.log(err);
		});
	}

	componentWillUnmount() {
	    if (this._asyncRequest) {
	      this._asyncRequest.cancel();
	    }
  	}

	onInputChange = (event, value, reason) => {
		this.setAutocompleteOptions(['Type in city...']);
		const cityFilter = this.getCitiesStartsWithValue(this.capitalizeString(value));
		this.setState({
			selectedCity: value,
			autoCompleteOptions: this.getAutocompleteCitiesInOutputFormat(cityFilter)
		});
	}

	capitalizeString = (stringToCapitalize) => {
		return stringToCapitalize.charAt(0).toUpperCase() + stringToCapitalize.slice(1);
	}

	state = {
		autoCompleteOptions: ['Type in city...']
	}

	setAutocompleteOptions = (newAutoCompleteOptions) => {
		this.setState({autoCompleteOptions: newAutoCompleteOptions});
	}

	getCitiesStartsWithValue = (value) => {
		return cityNameDimension.filter((city) => {
			return city.startsWith(value);
		}).top(20);
	}

	// Output format for the Autocomplete: 'City', 'Subcountry', 'Country'
	// Example: London, England, United Kingdom
	getAutocompleteCitiesInOutputFormat(cities) {
		return cities.map(cityObject => {
			return cityObject.name + ', ' + cityObject.subcountry + ', ' + cityObject.country;
		});
	}

	onSearchButtonClick() {
		this.props.onSearch(this.state.selectedCity);
	}

	render() {
		if (this.state.selectedCity === null) {
			return (
				<div className='searchContainer'>
					<div className='autoComplete'>
					<AutocompleteCity
						inputChange={this.onInputChange}
						autoCompleteOptions={this.state.autoCompleteOptions} />
					</div>
					<div className='searchLogo'>
						<Fab color="primary" aria-label="add" onClick={this.onSearchButtonClick.bind(this)}>
							<SearchIcon />
						</Fab>
					</div>
				</div>
			);

		} else {
			return (
				<div className='searchContainer'>
					<div className='autoComplete'>
					<AutocompleteCity
						value={this.state.selectedCity}
						inputChange={this.onInputChange}
						autoCompleteOptions={this.state.autoCompleteOptions} />
					</div>
					<div className='searchLogo'>
						<Fab color="primary" aria-label="add" onClick={this.onSearchButtonClick.bind(this)}>
							<SearchIcon />
						</Fab>
					</div>
				</div>
			);
		}

	}
}

export default SearchBar;
