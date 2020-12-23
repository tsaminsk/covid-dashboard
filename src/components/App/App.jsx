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
      country: { country: null },
      countries: [],
      totalCases: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      globalWord: {},
    };
    this.covidDataAPI = new Covid19DataAPI();
    this.toggleCurrentCountry = this.toggleCurrentCountry.bind(this);
  }

  componentDidMount() {
    this.covidDataAPI.getSummaryWorld().then((data) => {
      // eslint-disable-next-line no-console
      this.setState({
        totalDeaths: data.deaths,
        totalCases: data.cases,
        totalRecovered: data.recovered,
        globalWord: data,
      });
    });

    this.covidDataAPI.getCountryList().then((data) => {
      this.setState({
        countries: data,
      });

      // пример запрос для одно страны
      // const afg = this.covidDataAPI.getOneCountryData(this.state.countries[0].countryInfo.iso3)
      // afg.then((data) => {
      //   // console.log('afg', data);
      // })
    });
  }

  toggleCurrentCountry(country) {
    this.setState({ country });
  }

  render() {
    const {
      totalCases,
      totalDeaths,
      totalRecovered,
      country,
      countries,
      globalWord,
    } = this.state;

    return (
      <div className="app">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__main">
          <div className={('app__col', 'app__col--first')}>
            <Informer
              totalCases={totalCases}
              totalDeaths={totalDeaths}
              totalRecovered={totalRecovered}
            />
            <Table
              country={country}
              countries={countries}
              toggleCurrentCountry={this.toggleCurrentCountry}
              cbChangeCurrentCountry={this.toggleCurrentCountry}
            />
          </div>
          <div className={('app__col', 'app__col--second')}>
            <Map country={country} />
          </div>
          <div className={('app__col', 'app__col--third')}>
            <Current
              country={country}
              globalWord={globalWord}
            />
            <Charts country={country} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
