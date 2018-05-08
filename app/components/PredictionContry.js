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
    marginTop: -23
};

class QuinielaGroups extends React.Component {
    render() {
        const { game } = this.props;
        console.log('render GameComponentRender()');
        // TODO hacer función para ver si el partido ya se jugo y que se ponga de otro color.

        return (
                <div style={{ width: '100%' }}>
                        <div>
                            <Row>
                                <Col span={8}>
                                    <label style={style}>{game.JUEGO_1.NOMBRE || 'ADIVINA 1'}</label>
                                </Col>
                                <Col span={7} offset={7}>
                                    <label style={style}>{game.JUEGO_2.NOMBRE || 'ADIVINA 2'}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Flag style={style} code={game.JUEGO_1.ISO} height="30" />
                                    <Badge showZero count={game.GOL_1} />
                                </Col>
                                <Col span={4} offset={1}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h1 style={{ color: '#d6d6d6', marginTop: -15 }}>VS</h1>
                                        <h4 style={esatdioStyle}>{game.JUEGO.UBICACION.NOMBRE}</h4>
                                    </div>
                                </Col>
                                <Col span={8} offset={2}>
                                    <Flag style={style} code={game.JUEGO_2.ISO} height="30" />
                                    <Badge showZero count={game.GOL_2} />
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
