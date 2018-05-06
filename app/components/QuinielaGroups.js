import React from 'react';
import {Button, Icon, Badge, Row, Col, Dropdown, Menu} from 'antd';
const ButtonGroup = Button.Group;
import Flag from 'react-world-flags'; // Flags

const style = {
    margin: '5px',
    width: 46,
    borderRadius: 5
};
const esatdioStyle = {
    color: '#86c5ff',
    fontSize: 12,
    marginTop: -23
};

class QuinielaGroups extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            count2: 0,
            show: true,
        };
    }
    updateGame = () => {
        const { addGame, game, quinielaId, userId } = this.props;
        const { count, count2 } = this.state;
        const predictionID = game.ID;
        const jugador1ID = game.JUGADOR_1 && game.JUGADOR_1.NOMBRE || 'use prediction start';
        const jugador2ID = game.JUGADOR_2 && game.JUGADOR_2.NOMBRE || 'use prediction start';

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
        const count = this.state.count + 1;
        this.setState({ count }, () => {
            this.updateGame();
        });
    };
    decline = () => {
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
        const count2 = this.state.count2 + 1;
        this.setState({ count2 }, () => {
            this.updateGame();
        });
    };
    decline2 = () => {
        let count2 = this.state.count2 - 1;
        if (count2 < 0) {
            count2 = 0;
        }
        this.setState({ count2 }, () => {
            this.updateGame();
        });
    };
    // select Country 1
    selecCountry = () => {
        console.log('cheese');
    };
    render() {
        console.log('render game component');
        const { game } = this.props;
        const isGroups = !!(game.JUGADOR_1 && game.JUGADOR_1.NOMBRE);

        const menu = (
            <Menu onClick={this.selecCountry}>
                <Menu.Item key="1">
                    Mexico
                    <Flag style={{...style, width: 28, marginLeft: 8}} code="MEX" height="20" />
                </Menu.Item>
                <Menu.Item key="2">
                    Suecia
                    <Flag style={{...style, width: 28, marginLeft: 8}} code="SWE" height="20" />
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                    España
                    <Flag style={{...style, width: 28, marginLeft: 8}} code="ESP" height="20" />
                </Menu.Item>
                <Menu.Item key="4">
                    Belgica
                    <Flag style={{...style, width: 28, marginLeft: 8}} code="BEL" height="20" />
                </Menu.Item>
            </Menu>
        );
        return (
                <div style={{ width: '100%' }}>
                    { isGroups ? (
                        <div>
                            <Row>
                                <Col span={8}>
                                    <label style={style}>{game.JUGADOR_1.NOMBRE || 'ADIVINA 1'}</label>
                                </Col>
                                <Col span={7} offset={7}>
                                    <label style={style}>{game.JUGADOR_2.NOMBRE || 'ADIVINA 2'}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
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
                                <Col span={4} offset={1}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h1 style={{ color: '#d6d6d6', marginTop: -15 }}>VS</h1>
                                        <h4 style={esatdioStyle}>{game.UBICACION.NOMBRE}</h4>
                                    </div>
                                </Col>
                                <Col span={8} offset={2}>
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
                                <Col span={9}>
                                    <Dropdown overlay={menu}>
                                        <Button style={{ marginRight: 5 }}>
                                            Selecciona <Icon type="down" />
                                        </Button>
                                    </Dropdown>
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
                                <Col span={4}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h1 style={{ color: '#d6d6d6', marginTop: -15 }}>VS</h1>
                                        <h4 style={esatdioStyle}>{game.UBICACION.NOMBRE}</h4>
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <Dropdown overlay={menu}>
                                        <Button style={{ marginRight: 5 }}>
                                            Selecciona <Icon type="down" />
                                        </Button>
                                    </Dropdown>
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
    quinielaId: React.PropTypes.object.isRequired,
    userId: React.PropTypes.object.isRequired
};
export default QuinielaGroups;
