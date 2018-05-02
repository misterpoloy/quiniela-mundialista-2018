import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

// Design
import { Card, Button, Icon, Tabs, List, Modal, Avatar, Input, Row, Col} from 'antd';
import {notification} from 'antd/lib/index';
import { CardMedia, CardTitle} from 'material-ui/Card';
import bannerSource from '../src/images/banner4.jpg';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

// Actions
import {login} from '../actions/auth';
import { getGroupList } from '../actions/game';
import {getQuiniela, deleteQuiniela} from '../actions/quiniela';
import {bindActionCreators} from 'redux';

// util
const _ = require('lodash');

// Components
// import QuinielaGroups from '../components/QuinielaGroups';

const Fases = [
    {
        name: 'Fase de grupos',
        agrupaciones: [
            {
                0: [ 'A' ],
                1: [ 'B' ],
                2: [ 'C' ],
                3: [ 'D' ],
                4: [ 'E' ],
                5: [ 'F' ],
                6: [ 'G' ],
                7: [ 'H' ],
            }
        ],
        CantidadDeAgrupaciones: 8,
        GruposPorAgrupacion: 1,
        partidosPorAgrupacion: 6,
        cantidadTotalDePartidos: 48
    },
    {
        name: 'Fase de Octavos de Final',
        agrupaciones: [
            {
                0: [ 'A', 'B' ],
                1: [ 'C', 'D' ],
                2: [ 'E', 'F' ],
                3: [ 'G', 'H' ],
                4: [ 'B', 'A' ],
                5: [ 'D', 'C' ],
                6: [ 'F', 'E' ],
                7: [ 'H', 'G' ],
            }
        ],
        CantidadDeAgrupaciones: 8,
        GruposPorAgrupacion: 2,
        partidosPorAgrupacion: 1,
        cantidadTotalDePartidos: 8
    },
    {
        name: 'Fase de cuartos de final',
        agrupaciones: [
            {
                0: [ 'A', 'B', 'C', 'D' ],
                1: [ 'E', 'F', 'G', 'H' ],
                2: [ 'A', 'B', 'C', 'D' ],
                3: [ 'E', 'F', 'G', 'H' ],
            }
        ],
        CantidadDeAgrupaciones: 4,
        GruposPorAgrupacion: 4,
        partidosPorAgrupacion: 1,
        cantidadTotalDePartidos: 4
    },
    {
        name: 'Fase de semifinales',
        agrupaciones: [
            {
                0: [ 'A', 'B', 'C', 'D' ],
                1: [ 'E', 'F', 'G', 'H' ]
            }
        ],
        CantidadDeAgrupaciones: 2,
        GruposPorAgrupacion: 4,
        partidosPorAgrupacion: 1,
        cantidadTotalDePartidos: 4
    },
    {
        name: 'Fase de final',
        CantidadDeAgrupaciones: 1,
        GruposPorAgrupacion: 4,
        partidosPorAgrupacion: 1,
        cantidadTotalDePartidos: 1
    }
];

const dataRejected = [
    {
        title: 'Juan',
    },
    {
        title: 'Diego',
    }
];
const dataPosition = [
    {
        title: '1er lugar',
    },
    {
        title: '2do Lugar',
    },
    {
        title: '3er Lugar',
    }
];


class Quiniela extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: false,
            /** countries: [
                {
                    country1: { code: 'usa', name: 'United States'},
                    country2: { code: 'NIC', name: 'Nicaragua'},
                },
                {
                    country1: { code: 'NER', name: 'Nigeria'},
                    country2: { code: 'ECU', name: 'Ecuador'},
                },
                {
                    country1: { code: 'UGA', name: 'Uganda'},
                    country2: { code: 'LUX', name: 'Luxemburgo'},
                },
                {
                    country1: { code: 'CAN', name: 'Canada'},
                    country2: { code: 'SWE', name: 'Suecia'},
                }
            ] **/
        };
    }
    componentWillMount() {
        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');
        if (token && token !== 'Token invalido' && id) {
            this.setState(() => ({ token, userId: parseInt(id, 10) }));
        }
    }
    componentDidMount() {
        const { loginFunction, getQuinielaInfo, getByGroup } = this.props.actions;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');
        if (!token || token === 'Token invalido' || !id) {
            notification.error({
                message: 'Necesitas iniciar sesión',
                description: 'Para poder acceder a todas las funcnioes de la Quiniela primero debes de iniciar sesión.',
                placement: 'bottomRight'
            });
            this.props.history.push('/');
        } else {
            console.log('else');
            loginFunction();
            getByGroup(1);

            if (quinielaId) {
                getQuinielaInfo(quinielaId);
            }
        }
    }
    callback() {
        // console.log(key);
    }
    showDeleteConfirm = () => {
        const { params } = this.props.match;
        const { quinielaId } = params;
        confirm({
            title: '¿Seguro que desea eliminar la quiniela?',
            content: 'Esta acción no puede ser deshecha',
            okText: 'eliminar',
            okType: 'danger',
            cancelText: 'cancelar',
            onOk: this.onDeleteConfirm.bind(this, quinielaId),
            onCancel() {
                // console.log('Cancel');
            },
        });
    };
    onDeleteConfirm = (quinielaId) => {
        const { DeleteQuinielaAction } = this.props.actions;
        DeleteQuinielaAction(quinielaId);
        this.props.history.push('/mis-quinielas');
    };
    renderFases = () => {
        const { CountriesByGroup } = this.props;
        const grupoA = _.filter(CountriesByGroup, group => { return group.CODIGO === 'A'; });

        const Cards = _.map(Fases, fase => {
            const renderPaises = _.map(grupoA, pais => {
                return <div>{ pais.NOMBRE }</div>;
            });
            return (
                <Card
                    type="inner"
                    title={fase.name}
                >
                    { renderPaises }
                </Card>
            );
        });
        return Cards;
    };
    render() {
        const { quiniela, error } = this.props;
        const { userId } = this.state;

        /**
        const grupoA = _.filter(CountriesByGroup, group => { return group.CODIGO === 'A'; });
        const grupoB = _.filter(CountriesByGroup, group => { return group.CODIGO === 'B'; });
        const grupoC = _.filter(CountriesByGroup, group => { return group.CODIGO === 'C'; });
        const grupoD = _.filter(CountriesByGroup, group => { return group.CODIGO === 'D'; });
        const grupoE = _.filter(CountriesByGroup, group => { return group.CODIGO === 'E'; });
        const grupoF = _.filter(CountriesByGroup, group => { return group.CODIGO === 'F'; });
        const grupoG = _.filter(CountriesByGroup, group => { return group.CODIGO === 'G'; });
        const grupoH = _.filter(CountriesByGroup, group => { return group.CODIGO === 'H'; });
         **/

        if (error) {
            notification.error({
                message: 'Se ha producido un error',
                description: 'Es posible que la quiniela no exista, por favor verifica de nuevo',
                placement: 'bottomRight'
            });
            this.props.history.push('/mis-quinielas');
        }

        const operations = <a onClick={this.showDeleteConfirm} type="dashed">Eliminar quiniela</a>;
        /** const data = CountriesByGroup.map((countries) => {
            return <QuinielaGroups country1={countries.country1} country2={countries.country2} />;
        }); **/
        return (
            <div>
                <CardMedia
                    overlay={<CardTitle
                        title={quiniela.NOMBRE || '' }
                        subtitle={quiniela.DESCRIPCION || '' }
                    />}
                >
                    <img src={bannerSource} alt="" />
                </CardMedia>
                <Card>
                    <Tabs
                        defaultActiveKey="1"
                        tabBarExtraContent={quiniela.CREADO_POR === userId ? operations : ''}
                    >
                        <TabPane tab={<span><Icon type="profile" />Mi predicción</span>} key="1">
                            { this.renderFases() }
                            { /** <List
                                 bordered
                                 dataSource={CountriesByGroup ? data : []}
                                 renderItem={item => (<List.Item>{item}</List.Item>)}
                                 / >**/ }
                            <Row>
                                <Col offset={16}>
                                    <Button
                                        type="primary"
                                        size="large"
                                    >
                                        Actualizar mis resultados
                                    </Button>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab={<span><Icon type="user-add" />Invitar</span>} key="2">
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab="Invitar" key="1">
                                    <div style={{ margin: '24px 0' }} />
                                    <Input placeholder="Ingresa el correo de tus amigos, separados por coma." />
                                    <div style={{ margin: '24px 0' }} />
                                    <Row>
                                        <Col span={10}>
                                            <Button
                                                type="primary"
                                                icon="mail"
                                                size="large"
                                                style={{ background: '#454545', border: '#454545' }}
                                            >
                                                Enviar invitaciones
                                            </Button>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Inivtaciones rechazadas" key="2">
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={dataRejected}
                                        renderItem={item => (
                                            <List.Item actions={[<a onClick={this.showQuiniela}>ocultar</a>]}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src="https://www.ocf.berkeley.edu/~dblab/blog/wp-content/uploads/2012/01/icon-profile.png" />}
                                                    title={<a href="https://ant.design">{item.title}</a>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab={<span><Icon type="trophy" />Tabla de posiciones</span>} key="3">
                            <List
                                itemLayout="horizontal"
                                dataSource={dataPosition}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://cdn0.iconfinder.com/data/icons/sport-balls/128/cup.png"/>}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Ant Design, a design language for background applications, is refined by Ant UED"
                                        />
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}
Quiniela.propTypes = {
    history: React.PropTypes.object.isRequired,
    userId: React.PropTypes.string.isRequired,
    match: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    quiniela: React.PropTypes.object.isRequired,
    error: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    CountriesByGroup: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return({
        user: state.auth.user,
        error: state.quiniela.error,
        quiniela: state.quiniela.Quiniela,
        CountriesByGroup: state.game.countriesByGroup
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginFunction: login,
            getQuinielaInfo: getQuiniela,
            DeleteQuinielaAction: deleteQuiniela,
            getByGroup: getGroupList
        }, dispatch)
    };
}
const WithRouterWithForm = withRouter(Quiniela);
export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWithForm);

