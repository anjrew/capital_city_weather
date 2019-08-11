import React from 'react';
import { connect } from 'react-redux';
import { action } from '../react_utils/redux/actions';

// Components
import SafeArea from '../components/layout/safe_area';
import Column from '../components/layout/column';
import Row from '../components/layout/row';
import { CSSTransition } from 'react-transition-group';
import CircularProgressIndicator from '../components/progress_indicators/circular_progress_indicator.js';
import TextField from '../components/inputs/textfield';


class App extends React.Component {

    render() {
        const props = this.props;
        const status = props.status;
        const citys = props.citys;
        const weather = props.weather;
        const showResults = props.showResults;

        return (
            <SafeArea>
                <Column>
                    <h1 style={{ textAlign: 'center'}}>Capital City weather</h1>
                    <p style={{ textAlign: 'center'}}>Check the weather in a capital city.</p>
					
                    <div id="search" style={{ padding : '20px' }}>
                        <TextField
                            value={props.query || ""}  
                            // onBlur={() => { this.props.dispatch(action.hideResults()); } }
                            onFocus={() => { props.dispatch(action.showResults()); }}
                            handleChange={(e) => { props.dispatch(action.getCitys(e.target.value)); }}/>
                        <div>

                            <CSSTransition
                                in={showResults}
                                timeout={500}
                                classNames='fade'
                                unmountOnExit>
                                <div
                                    style={{
                                        position :'absolute',
                                        left: '50%',
                                        transform: 'translate(-50%)',
                                        width: '100%',
                                        maxWidth: '400px'
                                    }}>
                                    {citys && citys.map((city) => (
                                        <div 
                                            onClick={ (e) => { 
                                                e.preventDefault();
                                                e.stopPropagation();
                                                console.log("Handleing change in div");}}
                                            key={city + Math.random().toString()} 
                                            style={{
                                                placeContent:'center',
                                                padding: '10px'
                                            }} >
                                            <h3 
                                                classNames={'option'}
                                                onClick={ (e) => { 
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    console.log("Handleing change in title");
                                                    props.dispatch(action.chooseCity(e.target.innerText));
                                                }}>{city}</h3>
                                        </div>
                                    ))}
                                </div>
                            </CSSTransition>
                        </div>
						
                        <div id="results" className="hide"/>
                    </div>

                    <CSSTransition
                        in={!showResults}
                        timeout={500}
                        classNames='fade'
                        unmountOnExit>
                        <button
                            style={{ 
                                padding: '20px',
                                borderRadius: '20px',
                                backgroundColor: 'lightgray'
                            }}
                            onClick={() => props.dispatch(action.getWeather(props.query))}
                        >Get weather</button>
                    </CSSTransition>
					
                    <div style={{ 
                        position :'relative',
                        width: '100%'}}>

                        <div style={{
                            position :'absolute',
                            left: '50%',
                            transform: 'translate(-50%)',
                        }}>
                            <CSSTransition
                                in={props.loading}
                                timeout={500}
                                classNames='fade'
                                unmountOnExit>
                                <CircularProgressIndicator/>
                            </CSSTransition>
                        </div>
					
                        <div style={{
                            position :'absolute',
                            left: '50%',
                            transform: 'translate(-50%)',
                        }}>
                            <CSSTransition
                                in={status === 'error'}
                                timeout={500}
                                classNames='fade'
                                unmountOnExit>
                                <h5 style={{textAlign:'center'}}>{props.message && props.message.toString()}</h5>
                            </CSSTransition>
                        </div>

                        <div style={{
                            position :'absolute',
                            left: '50%',
                            transform: 'translate(-50%)',
                            width: '100%',
                            maxWidth: '400px'
                        }}>
                            <CSSTransition
                                in={status === 'hasData'}
                                timeout={500}
                                classNames='fade'
                                unmountOnExit>
                                <Column>
                                    <h3 
                                        style={{ 
                                            textAlign: 'center',
                                            padding: '20px'
                                        }}
                                    >Weather in {props.query}</h3>
                                    <Row padding='10px'><h4>Temp</h4>{weather && <h4>{weather.temp}&#8451;</h4>}</Row>
                                    <Row padding='10px'><h4>Pressure</h4>{weather && <h4>{weather.pressure} hPa</h4>}</Row>
                                    <Row padding='10px'><h4>Humidity</h4>{weather && <h4>{weather.humidity}%</h4>}</Row>
                                    <Row padding='10px'><h4>Wind speed</h4>{weather && <h4>{weather.windSpeed} mph</h4>}</Row>
                                    <Row padding='10px'><h4>Wind direction</h4>{weather && <h4>{weather.windDirection}</h4>}</Row>
                                </Column>

                            </CSSTransition>
                        </div>

                    </div>
                </Column>
            </SafeArea>
        );
    }
		
    componentDidMount() {
        const dispatch = this.props.dispatch;
        dispatch(action.getCurrentLocation());
        document.body.addEventListener('mousedown', () => {
            // this.props.dispatch(action.hideResults());
            console.log("Handleing change in body handler");
        });
    }
}


const mapStateToProps = state => {

    return {
        ...state,
        citys: state.citys,
        status: state.status,
        weather: state.weather,
        query: state.query 
    };
};
			
export default connect(mapStateToProps)(App);
			
