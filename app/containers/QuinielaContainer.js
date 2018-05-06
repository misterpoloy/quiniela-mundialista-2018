/* eslint-disable camelcase */
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

// Design
import { Card, Button, Icon, Tabs, List, Modal, Avatar, Input, Row, Col, Form, notification} from 'antd';
import { CardMedia, CardTitle} from 'material-ui/Card';
import bannerSource from '../src/images/banner4.jpg';
import avatar from '../src/images/avatar.png';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
// instances
const FormItem = Form.Item;

// Actions
import {login} from '../actions/auth';
import { getGroupList, getAllGamesByGroups } from '../actions/game';
import {getQuiniela,
    deleteQuiniela,
    sendQuinielaInvitations,
    getInivtationsById,
    getQuinielaStructures
} from '../actions/quiniela';
import {bindActionCreators} from 'redux';

// util
const _ = require('lodash');

// Components
import QuinielaGroups from '../components/QuinielaGroups';

// Hardcoded data
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


class QuinielaGame extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: false,
            games: {}
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
        const {
            loginFunction,
            getQuinielaInfo,
            getByGroup,
            getAllQuinielaInvitations,
            getStructures,
            getAllGamesByGroupsAction
        } = this.props.actions;

        const { params } = this.props.match;
        const { quinielaId } = params;
        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');
        if (!token || token === 'Token invalido' || !id) {
            this.updateToken();
        } else {
            loginFunction();
            getByGroup(1);
            getStructures();
            getAllGamesByGroupsAction();

            if (quinielaId) {
                getQuinielaInfo(quinielaId);
                getAllQuinielaInvitations(quinielaId);
            }
        }
    }
    shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;
    }
    updateToken = () => {
        notification.error({
            message: 'Necesitas iniciar sesión',
            description: 'Para poder acceder a todas las funcnioes de la Quiniela primero debes de iniciar sesión.',
            placement: 'bottomRight'
        });
        this.props.history.push('/');
    };
    callback = () => {
        const { getAllQuinielaInvitations } = this.props.actions;
        const { params } = this.props.match;
        const { quinielaId } = params;
        getAllQuinielaInvitations(quinielaId);
    };
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
    sendInvitation = e => {
        const { inviteToQuiniela } = this.props.actions;

        e.preventDefault();
        this.props.form.validateFields((err, object) => {
            const { params } = this.props.match;
            const { quinielaId } = params;
            if (!err) {
                if (quinielaId) {
                    const quinela_id = quinielaId;

                    const regex = /([^;:<>!?\n]+\@[^;:<>!?\n]+\.[^;:<>!?\n]+)/gmi;
                    const str = object.emailStrings;
                    const emailsFound = str.match(regex);
                    let totalEmailString = '';

                    emailsFound.forEach(function(email) {
                        totalEmailString += email;
                        const body = {
                            email,
                            quinela_id
                        };
                        inviteToQuiniela(body);
                    });
                    notification.success({
                        message: 'Exito',
                        description: 'La invitación se ha enviado con exito a ' + totalEmailString,
                        placement: 'bottomRight'
                    });
                } else {
                    notification.error({
                        message: 'Se ha producido un error',
                        description: 'Se ha producido un con el API, por favor intenta de nuevo',
                        placement: 'bottomRight'
                    });
                }
            }
        });
    };
    onDeleteConfirm = (quinielaId) => {
        const { DeleteQuinielaAction } = this.props.actions;
        DeleteQuinielaAction(quinielaId);
        this.props.history.push('/mis-quinielas');
    };
    setNewPrediction = prediction => {
        const { games } = this.state;
        const gamesCopy = games;
        const updateGames = { ...gamesCopy, ...prediction };
        this.setState(() => ({ games: updateGames }));
    };
    renderFases = () => {
        const { quinielaStructures } = this.props;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');
        const fasesState = ['grupos', 'octavos', 'cuartos', 'semiFinales', 'tercer', 'final'];

        let i = 0;
        const Cards = _.map(quinielaStructures, fase => {
            const currentProp = fasesState[i];
            const currentFaseProps = this.props[currentProp];

            const data = currentFaseProps.map((juego) => {
                return (
                    <QuinielaGroups
                        quinielaId={quinielaId}
                        userId={id}
                        addGame={this.setNewPrediction}
                        game={juego}
                    />
                );
            });
            i++;
            return (
                <Card type="inner" title={'Fase de ' + fase.NOMBRE}>
                    <List
                        bordered
                        dataSource={data}
                        locale={{ emptyText: 'Cargando, por favor espera...' }}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />{/**
                 // const grupoA = _.filter(CountriesByGroup, group => { return group.ID === 'A'; });
                 Aqui es donde se hace el render de paises
                 **/}
                </Card>
            );
        });
        return Cards;
    };
    render() {
        console.log('render container');
        const {
            quiniela,
            error,
            user
        } = this.props;
        const { api_token } = user;
        const { userId } = this.state;
        const { getFieldDecorator } = this.props.form;

        if (api_token === 'Token invalido') {
            this.updateToken();
        }

        // Invitations arrays
        const invitationsTypes = [
            { propName: 'sendInvitations', human: 'Enviadas'},
            { propName: 'refusedInvitations', human: 'Rechazadas'},
            { propName: 'acceptedInvitations', human: 'Aceptadas'},
        ];
        const invitations = {};
        _.chain(invitationsTypes)
            .each(item => {
                invitations[item.propName] = {
                    invitation: this.props[item.propName],
                    human: item.human
                };
            })
            .value();

        // Check if token expires
        if (error) {
            notification.error({
                message: 'Se ha producido un error',
                description: 'Es posible que la quiniela no exista, por favor verifica de nuevo',
                placement: 'bottomRight'
            });
            this.props.history.push('/mis-quinielas');
        }
        // Check if admin to delete quniela
        const operations = <a onClick={this.showDeleteConfirm} type="dashed">Eliminar quiniela</a>;
        let i = 2; // to have the control of dynamic tab keys
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
                        <TabPane tab={<span><Icon type="user-add" />Invitaciones</span>} key="2">
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab="Invitar" key="1">
                                    <div style={{ margin: '24px 0' }} />
                                    <Form onSubmit={this.sendInvitation} className="login-form">
                                        <FormItem>
                                            <span>Ingresa el coreo</span>
                                            {getFieldDecorator('emailStrings', {
                                                rules: [{required: true, message: 'Por favor ingresa los correos'}],
                                            })(<Input placeholder="Ingresa los correos electronicos" />)}
                                        </FormItem>
                                        <FormItem>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                icon="mail"
                                                size="large"
                                                style={{ background: '#454545', border: '#454545' }}
                                            >
                                                Enviar invitaciones
                                            </Button>
                                        </FormItem>
                                    </Form>
                                </TabPane>
                                {_.map(invitations, invitation => {
                                    return (
                                        <TabPane tab={invitation.human} key={i++}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={invitation.invitation}
                                                locale={{ emptyText: 'Aún no hay ' + invitation.human }}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src={avatar} />}
                                                            title={<a href="https://ant.design">{item.USUARIO.CORREO || 'Nombre no disponible'}</a>}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </TabPane>
                                    );
                                })}
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
QuinielaGame.propTypes = {
    history: React.PropTypes.object.isRequired,
    match: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    quiniela: React.PropTypes.object.isRequired,
    error: React.PropTypes.object.isRequired,
    refusedInvitations: React.PropTypes.array.isRequired,
    acceptedInvitations: React.PropTypes.array.isRequired,
    sendInvitations: React.PropTypes.array.isRequired,
    quinielaStructures: React.PropTypes.array.isRequired,
    form: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return({
        user: state.auth.user,
        error: state.quiniela.error,
        quiniela: state.quiniela.Quiniela,
        CountriesByGroup: state.game.countriesByGroup,
        refusedInvitations: state.quiniela.refusedInvitations,
        acceptedInvitations: state.quiniela.acceptedInvitations,
        quinielaStructures: state.quiniela.quinielaStructures,
        sendInvitations: state.quiniela.sendInvitations,
        grupos: state.game.grupos,
        octavos: state.game.octavos,
        cuartos: state.game.cuartos,
        semiFinales: state.game.semiFinales,
        tercer: state.game.tercer,
        final: state.game.final,
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginFunction: login,
            getStructures: getQuinielaStructures,
            getQuinielaInfo: getQuiniela,
            DeleteQuinielaAction: deleteQuiniela,
            inviteToQuiniela: sendQuinielaInvitations,
            getByGroup: getGroupList,
            getAllQuinielaInvitations: getInivtationsById,
            getAllGamesByGroupsAction: getAllGamesByGroups
        }, dispatch)
    };
}
const ShowTheLocationWithRouter = withRouter(QuinielaGame);

const WithRouterWithForm = Form.create()(ShowTheLocationWithRouter);

export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWithForm);


