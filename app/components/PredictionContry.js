import React from 'react';
import {Badge, Row, Col} from 'antd';
import RUS from '../src/images/flags/RUS.png';
import EGY from '../src/images/flags/EGY.png';
import SAU from '../src/images/flags/SAU.png';
import URY from '../src/images/flags/URY.png';
import PRT from '../src/images/flags/PRT.png';
import MAR from '../src/images/flags/MAR.png';
import ESP from '../src/images/flags/ESP.png';
import IRN from '../src/images/flags/IRN.png';
import FRA from '../src/images/flags/FRA.png';
import PER from '../src/images/flags/PER.png';
import AUS from '../src/images/flags/AUS.png';
import DNK from '../src/images/flags/DNK.png';
import ARG from '../src/images/flags/ARG.png';
import HRV from '../src/images/flags/HRV.png';
import ISL from '../src/images/flags/ISL.png';
import NGA from '../src/images/flags/NGA.png';
import BRA from '../src/images/flags/BRA.png';
import CRI from '../src/images/flags/CRI.png';
import CHE from '../src/images/flags/CHE.png';
import SRB from '../src/images/flags/SRB.png';
import DEU from '../src/images/flags/DEU.png';
import SWE from '../src/images/flags/SWE.png';
import MEX from '../src/images/flags/MEX.png';
import KOR from '../src/images/flags/KOR.png';
import BEL from '../src/images/flags/BEL.png';
import TUN from '../src/images/flags/TUN.png';
import GBR from '../src/images/flags/GBR.png';
import PAN from '../src/images/flags/PAN.png';
import POL from '../src/images/flags/POL.png';
import COL from '../src/images/flags/COL.png';
import SEN from '../src/images/flags/SEN.png';
import JPN from '../src/images/flags/JPN.png';
import moment from 'moment-timezone';

const flag = {
    RUS,
    EGY,
    SAU,
    URY,
    PRT,
    MAR,
    ESP,
    IRN,
    FRA,
    PER,
    AUS,
    DNK,
    ARG,
    HRV,
    ISL,
    NGA,
    BRA,
    CRI,
    CHE,
    SRB,
    DEU,
    SWE,
    MEX,
    KOR,
    BEL,
    TUN,
    GBR,
    PAN,
    POL,
    COL,
    SEN,
    JPN
};

const style = {
    marginLeft: 2,
    marginRigth: 5,
    marginTop: 5
};
const esatdioStyle = {
    color: '#86c5ff',
    fontSize: 12,
    textAlign: 'center'
};

class QuinielaGroups extends React.Component {
    render() {
        const { game } = this.props;
        // Moment date to user:
        const date = moment(game.FECHA).locale('es');
        const fecha = date.tz('America/Guatemala').format('MMM DD YYYY, h:mm:ss a');

        return (
                <div style={{ width: '100%' }}>
                        <div>
                            <Row>
                                <Col xs={{ span: 8 }} xl={{ span: 12 }}>
                                    <label style={style}>{game.JUEGO_1.NOMBRE || 'ADIVINA 1'}</label>
                                </Col>
                                <Col xs={{ span: 8, offset: 8 }} xl={{ span: 4 }}>
                                    <label className={'alignRightName'} style={style}>{game.JUEGO_2.NOMBRE || 'ADIVINA 2'}</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 8 }} xl={{ span: 4 }}>
                                    <img style={style} width={40} src={flag[game.JUEGO_1.ISO]}/>
                                    <Badge style={style} showZero count={game.GOL_1} />
                                </Col>
                                <Col xs={{ offset: 3, span: 1 }} xl={{ span: 2, offset: 7 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h1 style={{ color: '#d6d6d6', marginTop: -15, marginLeft: -5 }}>VS</h1>
                                    </div>
                                </Col>
                                <Col xs={{ offset: 4, span: 8 }} xl={{ span: 4, offset: 7 }}>
                                    <div className={'allignRightLeft'}>
                                        <Badge style={style} showZero count={game.GOL_2} />
                                        <img style={style} width={40} src={flag[game.JUEGO_2.ISO]}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4 style={esatdioStyle}>{game.JUEGO.UBICACION.NOMBRE}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center', marginTop: 10 }}>
                                    <div>
                                        <h4 style={{ color: '#aca9a9' }}>{fecha}</h4>
                                    </div>
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
