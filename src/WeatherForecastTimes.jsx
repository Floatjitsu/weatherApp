import React from 'react';
import {List, ListItem, Divider, ListItemText} from '@material-ui/core';
import WeatherImage from './WeatherImage';

class WeatherForecastTimes extends React.Component {
	render() {
		return (
			<List>
				<ListItem>
					<div style={{marginRight: 15}}>
						{this.props.forecastList.threeAm.time}
					</div>
					<div style={{marginRight: 15}}>
						<WeatherImage
							value={this.props.forecastList.threeAm.weatherMain}
							imageStyle={{height: 35, width: 35}} />
					</div>
					<ListItemText
						primary={this.props.forecastList.threeAm.temperature}
						secondary={this.props.forecastList.threeAm.description} />
				</ListItem>
				<Divider />
				<ListItem>
					<div style={{marginRight: 15}}>
						{this.props.forecastList.nineAm.time}
					</div>
					<div style={{marginRight: 15}}>
						<WeatherImage
							value={this.props.forecastList.nineAm.weatherMain}
							imageStyle={{height: 35, width: 35}} />
					</div>
					<ListItemText
						primary={this.props.forecastList.nineAm.time}
						secondary={this.props.forecastList.nineAm.description} />
				</ListItem>
				<Divider />
				<ListItem>
					<div style={{marginRight: 15}}>
						{this.props.forecastList.threePm.time}
					</div>
					<div style={{marginRight: 15}}>
						<WeatherImage
							value={this.props.forecastList.threePm.weatherMain}
							imageStyle={{height: 35, width: 35}} />
					</div>
					<ListItemText
						primary={this.props.forecastList.threePm.time}
						secondary={this.props.forecastList.threePm.description} />
				</ListItem>
				<Divider />
				<ListItem>
					<div style={{marginRight: 15}}>
						{this.props.forecastList.ninePm.time}
					</div>
					<div style={{marginRight: 15}}>
						<WeatherImage
							value={this.props.forecastList.ninePm.weatherMain}
							imageStyle={{height: 35, width: 35}} />
					</div>
					<ListItemText
						primary={this.props.forecastList.ninePm.time}
						secondary={this.props.forecastList.ninePm.description} />
				</ListItem>
			</List>
		);
	}
}

export default WeatherForecastTimes;
