import React from 'react';
import {Badge, Row, Col} from 'antd';
import Flag from 'react-world-flags'; // Flags

const style = {
    margin: '5px',
    width: 46,
    borderRadius: 5
};
const esatdioStyle = {
    color: '#86c5ff',
    fontSize: 12,
    textAlign: 'center'
};

const japanFlag = {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e1e1e1'
};

class QuinielaGroups extends React.Component {
    render() {
        const { game } = this.props;
        // TODO hacer función para ver si el partido ya se jugo y que se ponga de otro color.

        return (
                <div style={{ width: '100%' }}>
                        <div>
                            <Row>
                                <Col xs={{ offset: 0, span: 10 }} lg={{ span: 4 }}>
                                    <label style={style}>{game.JUEGO_1.NOMBRE || 'ADIVINA 1'}</label>
                                </Col>
                                <Col
                                    style={{ textAlign: 'right', marginLeft: 40 }}
                                    xs={{ offset: 4, span: 10 }}
                                    lg={{ span: 4, offset: 15 }}
                                >
                                    <label style={style}>{game.JUEGO_2.NOMBRE || 'ADIVINA 2'}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ offset: 0, span: 10 }} lg={{ span: 5 }}>
                                    {(game.JUEGO_1.ISO === 'JPN') ? (
                                        <Flag style={{...style, ...japanFlag}} code={game.JUEGO_1.ISO} height="30" />)
                                    : (
                                        <Flag style={style} code={game.JUEGO_1.ISO} height="30" />
                                    )}
                                    <Badge showZero count={game.GOL_1} />
                                </Col>
                                <Col xs={{ offset: 0, span: 3 }} lg={{ span: 3, offset: 4 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h1 style={{ color: '#d6d6d6', marginTop: -15 }}>VS</h1>
                                    </div>
                                </Col>
                                <Col xs={{ offset: 4, span: 7 }} lg={{ span: 5, offset: 7 }}>
                                    <Badge showZero count={game.GOL_2} />
                                    {(game.JUEGO_2.ISO === 'JPN') ? (
                                            <Flag style={{...style, ...japanFlag}} code={game.JUEGO_2.ISO} height="30" />)
                                        : (
                                            <Flag style={style} code={game.JUEGO_2.ISO} height="30" />
                                        )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4 style={esatdioStyle}>{game.JUEGO.UBICACION.NOMBRE}</h4>
                                </Col>
                            </Row>
                        </div>
                </div>
        );
    }
}
QuinielaGroups.propTypes = {
    game: React.PropTypes.object.isRequired
};
export default QuinielaGroups;
