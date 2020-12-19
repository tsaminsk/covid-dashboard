import React, { Component } from 'react';
import './App.scss';
import Header from '../Global/Header/Header';
import Informer from '../Global/Informer/Informer';
import Table from '../Global/Table/Table';
import Map from '../Global/Map/Map';
import Current from '../Global/Current/Current';
import Charts from '../Global/Charts/Charts';
import Covid19DataAPI from '../../services/Covid19DataAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      countries: [],
      totalConfirmed: 0,
      totalDeaths: 0,
      totalRecovered: 0,
    };
    this.covidDataAPI = new Covid19DataAPI();
    this.toggleCurrentCountry = this.toggleCurrentCountry.bind(this)
  }

  componentDidMount() {
    this.covidDataAPI.getSummaryWorld().then((data) => {
      // eslint-disable-next-line no-console
      // console.log(data);
      this.setState({
        totalDeaths: data.deaths,
        totalConfirmed: data.active,
        totalRecovered: data.recovered,
      });
    });

    this.covidDataAPI
      .getCountryList()
      .then((data) => {
        // eslint-disable-next-line no-console
        // console.log('getCountryList', data);
        this.setState({
          countries: data,
        });

        // const afg = this.covidDataAPI.getOneCountryData(this.state.countries[0].countryInfo.iso3)
        // afg.then((data) => {
        //   // console.log('afg', data);
        // })
      })

    this.covidDataAPI
      .getHistoryGlobal()
      .then((resp) => {
        // console.log('getHistoryGlobal', resp);
      })

  }

  toggleCurrentCountry(country) {
    this.setState({
      country: country,
    });
  }

  render() {
    const { totalConfirmed, totalDeaths, totalRecovered, country, countries } = this.state;

    return (
      <div className="app">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <div className={('app__col', 'app__col--first')}>
            <Informer
              totalConfirmed={totalConfirmed}
              totalDeaths={totalDeaths}
              totalRecovered={totalRecovered}
            />
            <Table countries={countries} toggleCurrentCountry={this.toggleCurrentCountry} />
          </div>
          <div className={('app__col', 'app__col--second')}>
            <Map />
          </div>
          <div className={('app__col', 'app__col--third')}>
            <Current country={country} />
            <Charts />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
