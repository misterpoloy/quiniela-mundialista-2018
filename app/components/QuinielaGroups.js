import React from 'react';
import {Button, Select, Icon, Badge, Row, Col, message} from 'antd';
const Option = Select.Option;
const ButtonGroup = Button.Group;
import Flag from 'react-world-flags'; // Flags

// util
const _ = require('lodash');

const style = {
    margin: '5px',
    width: 46,
    borderRadius: 5
};

class QuinielaGroups extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            count2: 0,
            JUEGO_1: null,
            JUEGO_2: null,
            show: true,
        };
    }
    updateGame = () => {
        const { addGame, game, quinielaId, userId } = this.props;
        const { count, count2, JUEGO_1, JUEGO_2 } = this.state;

        const predictionID = game.ID;
        const jugador1ID = game.JUGADOR_1.NOMBRE !== 'null' ? game.JUGADOR_1.ID : JUEGO_1;
        const jugador2ID = game.JUGADOR_2.NOMBRE !== 'null' ? game.JUGADOR_2.ID : JUEGO_2;

        const prediction = {
            [predictionID]: {
                JUEGO: predictionID,
                QUINIELA: quinielaId,
                USUARIO: userId,
                GOL_1: count,
                GOL_2: count2,
                JUEGO_1: jugador1ID,
                JUEGO_2: jugador2ID
            }
        };
        addGame(prediction);
    };
    increase = () => {
        const { game } = this.props;
        const { JUEGO_1 } = this.state;
        const exist = !!JUEGO_1;

        if (game.JUGADOR_1.NOMBRE === 'null' && !exist ) {
            message.error('Tienes que ingresar el pais uno primero');
            return;
        }

        const count = this.state.count + 1;
        this.setState({ count }, () => {
            this.updateGame();
        });
    };
    decline = () => {
        const { game } = this.props;
        const { JUEGO_1 } = this.state;
        const exist = !!JUEGO_1;

        if (game.JUGADOR_1.NOMBRE === 'null' && !exist ) {
            message.error('Tienes que ingresar el pais uno primero');
            return;
        }
        let count = this.state.count - 1;
        if (count < 0) {
            count = 0;
        }
        this.setState({ count }, () => {
            this.updateGame();
        });
    };
    // Country 2
    increase2 = () => {
        const { game } = this.props;
        const { JUEGO_2 } = this.state;
        const exist = !!JUEGO_2;

        if (game.JUGADOR_2.NOMBRE === 'null' && !exist ) {
            message.error('Tienes que ingresar el pais dos primero');
            return;
        }
        const count2 = this.state.count2 + 1;
        this.setState({ count2 }, () => {
            this.updateGame();
        });
    };
    decline2 = () => {
        const { game } = this.props;
        const { JUEGO_2 } = this.state;
        const exist = !!JUEGO_2;

        if (game.JUGADOR_2.NOMBRE === 'null' && !exist ) {
            message.error('Tienes que ingresar el pais dos primero');
            return;
        }
        let count2 = this.state.count2 - 1;
        if (count2 < 0) {
            count2 = 0;
        }
        this.setState({ count2 }, () => {
            this.updateGame();
        });
    };
    // select Country 1
    selecCountry1 = country => {
        const newValue = country;
        this.setState({ JUEGO_1: newValue }, () => {
            this.updateGame();
        });
    };
    selecCountry2 = value => {
        const JUEGO_2 = value;
        this.setState({ JUEGO_2 }, () => {
            this.updateGame();
        });
    };
    render() {
        console.log('render QuinielaGroup()');
        const { game, CountriesByGroup } = this.props;
        const isGroups = (game.JUGADOR_1 && game.JUGADOR_1.NOMBRE !== 'null' );

        // FlagOptions LEFT
        const optionsPerGame = {};
        const string = game.SELECCION_1;
        const groupsCountries = string.split(',');
        _.chain(groupsCountries)
            .each(item => {
                const justgroup = _.filter(CountriesByGroup, group => {
                    return group.CODIGO === item;
                });
                _.map(justgroup, function(country) {
                    optionsPerGame[country.PAIS] = {...country};
                });
            })
        .value();

        // FlagOptions RIGTH
        const optionsPerGameR = {};
        const groupsCountriesR = game.SELECCION_2.split(',');
        _.chain(groupsCountriesR)
            .each(item => {
                const justgroupR = _.filter(CountriesByGroup, group => {
                    return group.CODIGO === item;
                });
                _.map(justgroupR, function(country) {
                    optionsPerGameR[country.PAIS] = {...country};
                });
            })
            .value();

        const menu = () => _.map(optionsPerGame, pais => {
            return (
                <Option key={pais.PAIS} key={pais.PAIS}>
                    <Flag style={{...style, width: 28, marginLeft: 8}} code={pais.ISO} height="20" />
                    {pais.NOMBRE}
                </Option>
            );
        });
        const menuRigth = () => _.map(optionsPerGameR, pais => {
            return (
                <Option key={pais.PAIS} key={pais.PAIS}>
                    <Flag style={{...style, width: 28, marginLeft: 8}} code={pais.ISO} height="20" />
                    {pais.NOMBRE}
                </Option>
            );
        });
        return (
                <div style={{ width: '100%' }}>
                    { isGroups ? (
                        <div>
                            <Row>
                                <Col xs={{ offset: 0, span: 10 }} lg={{ span: 8, offset: 2 }}>
                                    <label style={style}>{game.JUGADOR_1.NOMBRE || 'ADIVINA 1'}</label>
                                </Col>
                                <Col xs={{ offset: 5, span: 8 }} lg={{ span: 5, offset: 6 }}>
                                    <label style={style}>{game.JUGADOR_2.NOMBRE || 'ADIVINA 2'}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ offset: 0, span: 9 }} lg={{ span: 8, offset: 2 }}>
                                    <ButtonGroup>
                                        <Button onClick={this.decline}>
                                            <Icon type="minus" />
                                        </Button>
                                        <Button onClick={this.increase}>
                                            <Icon type="plus" />
                                        </Button>
                                    </ButtonGroup>
                                    <Flag style={style} code={game.JUGADOR_1.ISO} height="30" />
                                    <Badge showZero count={this.state.count} />
                                </Col>
                                <Col xs={{ offset: 0, span: 4 }} lg={{ span: 4 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h1 className={'customVersus1'}>VS</h1>
                                        <h4 className={'estadio'}>{game.UBICACION.NOMBRE}</h4>
                                        <div style={{fontSize: 12, color: '#d6d6d6', marginTop: -5}}>
                                            Grupo {game.OPCIONES_DE_SELECCION}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{ offset: 2, span: 9 }} lg={{ span: 8, offset: 2 }}>
                                    <ButtonGroup>
                                        <Button onClick={this.decline2}>
                                            <Icon type="minus" />
                                        </Button>
                                        <Button onClick={this.increase2}>
                                            <Icon type="plus" />
                                        </Button>
                                    </ButtonGroup>
                                    <Flag style={style} code={game.JUGADOR_2.ISO} height="30" />
                                    <Badge showZero count={this.state.count2} />
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div>
                            <Row>
                                <Col xs={{ offset: 0, span: 10 }} lg={{ span: 8, offset: 1 }}>
                                    <Select onChange={this.selecCountry1} className={'dropDownCustom'}>
                                        { menu() }
                                    </Select>
                                    <ButtonGroup>
                                        <Button onClick={this.decline}>
                                            <Icon type="minus" />
                                        </Button>
                                        <Button onClick={this.increase} style={{ marginRight: 5 }}>
                                            <Icon type="plus" />
                                        </Button>
                                    </ButtonGroup>
                                    <Badge showZero count={this.state.count} />
                                </Col>
                                <Col xs={{ span: 2 }} lg={{ offset: 1 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h1 className={'customVersus'}>VS</h1>
                                        <h4 className={'estadio'}>{game.UBICACION.NOMBRE}</h4>
                                        {/** options <div>{game.OPCIONES_DE_SELECCION || ''}</div> **/}
                                    </div>
                                </Col>
                                <Col xs={{ offset: 2, span: 10 }} lg={{ span: 8, offset: 2 }}>
                                    <Select onChange={this.selecCountry2} className={'dropDownCustom'}>
                                        { menuRigth() }
                                    </Select>
                                    <ButtonGroup>
                                        <Button onClick={this.decline2}>
                                            <Icon type="minus" />
                                        </Button>
                                        <Button onClick={this.increase2} style={{ marginRight: 5 }}>
                                            <Icon type="plus" />
                                        </Button>
                                    </ButtonGroup>
                                    <Badge showZero count={this.state.count2} />
                                </Col>
                            </Row>
                        </div>
                    )
                }
                </div>
        );
    }
}
QuinielaGroups.propTypes = {
    game: React.PropTypes.object.isRequired,
    addGame: React.PropTypes.func.isRequired,
    quinielaId: React.PropTypes.string.isRequired,
    CountriesByGroup: React.PropTypes.object.isRequired,
    userId: React.PropTypes.string.isRequired
};
export default QuinielaGroups;
