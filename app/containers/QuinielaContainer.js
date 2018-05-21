/* eslint-disable camelcase */
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

// Design
import { Card, Button, Icon, Tabs, List, Modal, message, Avatar, Input, Row, Col, Form, Alert, notification} from 'antd';
import { CardMedia, CardTitle} from 'material-ui/Card';
import bannerSource from '../src/images/banner4.jpg';
import avatar from '../src/images/avatar.png';
import one from '../src/images/1.png';
import two from '../src/images/2.png';
import three from '../src/images/3.png';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
// instances
const FormItem = Form.Item;

// Actions
import {login} from '../actions/auth';
import {
    getGroupList,
    getAllGamesByGroups,
    sendPrediction,
    getPredictionsPerUser,
    getQuinielaPositions
} from '../actions/game';

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
import PredictionContry from '../components/PredictionContry';

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
        const { params } = this.props.match;
        const { quinielaId } = params;
        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');
        const {
            loginFunction,
            getQuinielaInfo,
            getByGroup,
            getAllQuinielaInvitations,
            getStructures,
            getPredictionsPerUserActions,
            getQuinielaPositionsActions,
            getAllGamesByGroupsAction
        } = this.props.actions;
        if (!token || token === 'Token invalido' || !id) {
            this.updateToken();
        } else {
            loginFunction();
            getByGroup(1);
            getStructures();
            getPredictionsPerUserActions(quinielaId, id);
            getAllGamesByGroupsAction();

            if (quinielaId) {
                getQuinielaInfo(quinielaId);
                getQuinielaPositionsActions(quinielaId);
                getAllQuinielaInvitations(quinielaId);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        // If user post Quinielas succesfully seach again
        const { getPredictionsPerUserActions } = this.props.actions;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        if (this.props.postSuccesfull !== nextProps.postSuccesfull) {
            // console.log('getAllQuinielas');
            getPredictionsPerUserActions(quinielaId, id);
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
            title: '¿Estás seguro que deseas eliminar tu quiniela?',
            content: 'Las predicciones de tus invitados de esta quiniela también serán eliminadas. Esta acción no puede ser deshecha.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: this.onDeleteConfirm.bind(this, quinielaId),
            onCancel() {
                // console.log('Cancel');
            },
        });
    };
    sendInvitation = e => {
        const { inviteToQuiniela } = this.props.actions;
        const { resetFields } = this.props.form;

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
                    if (!emailsFound) {
                        notification.error({
                            message: 'No has ingresado correos electrónicos',
                            description: 'Tienes que ingresar correos electrónicos validos',
                            placement: 'bottomRight'
                        });
                        return;
                    }
                    const eachMail = emailsFound[0].split(',');
                    let totalEmailString = '';

                    eachMail.forEach(function(email) {
                        totalEmailString += email;
                        const body = {
                            email,
                            quinela_id
                        };
                        inviteToQuiniela(body);
                        console.log(body);
                        resetFields();
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
    savePrediction = () => {
        const { grupos } = this.props;
        const { sendPredictionAction } = this.props.actions;
        const { games } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        if(_.isEmpty(games)) {
            // console.log('no prediction');
            message.error('Hún no has echo ninguna predicción aún...');
        } else {
            // console.log('mi magia');
            const prediction = {};
            // 1. For the groups if zero then create a default object
            // 1. Generate the 64 games in one simple array
            _.map(grupos, function(game) {
                prediction[game.ID] = {
                    GOL_1: game.GOLES_1 || 0,
                    GOL_2: game.GOLES_2 || 0,
                    JUEGO: game.ID,
                    JUEGO_1: game.JUGADOR_1.ID,
                    JUEGO_2: game.JUGADOR_2.ID,
                    QUINIELA: quinielaId,
                    USUARIO: id
                };
            });
            // 1.2 check games already played
            const { quinielaStructures } = this.props;
            const fasesState = ['grupos', 'octavos', 'cuartos', 'semiFinales', 'tercer', 'final'];

            let i = 0;
            let gamesPlayed = {};
            _.map(quinielaStructures, () => {
                const currentProp = fasesState[i];
                const currentFaseProps = this.props[currentProp];

                _.each(currentFaseProps, function(juego) {
                    if (juego.GOLES_1 !== null && juego.GOLES_2 !== null) {
                        const gamesPlayedCopy = gamesPlayed;
                        const predictionAdd = {
                            [juego.ID]: {
                                JUEGO: juego.ID,
                                QUINIELA: quinielaId,
                                USUARIO: id,
                                GOL_1: juego.GOLES_1,
                                GOL_2: juego.GOLES_2,
                                JUEGO_1: juego.JUGADOR_1.ID,
                                JUEGO_2: juego.JUGADOR_2.ID
                            }
                        };
                        gamesPlayed = {...gamesPlayedCopy, ...predictionAdd}; // already played games
                    }
                });
                i++;
            });
            // 2. Mix the predictions with the original value
            const curated = {...prediction, ...games, ...gamesPlayed};
            if (_.size(curated) !== 63) {
                message.error('Aún hay predicciones en blanco');
            } else {
                const verifyLeftGame = _.filter(curated, function(verify) { return verify.JUEGO_1 !== null; });
                const verifyRigth = _.filter(verifyLeftGame, function(verify) { return verify.JUEGO_2 !== null; });
                // 3. Check if there is no null.
                // 4. Save the prediction.
                if (_.size(verifyRigth) === 63) {
                    // Let's save the game!
                    confirm({
                        title: '¿Estás seguro que quieres guardar tu quiniela?',
                        content: 'Recuerda que no puedes editar tu predicción después, así que elige con atención tus predicciones.',
                        okText: '¡Si! Guardar',
                        cancelText: 'No, aún no',
                        onOk() {
                            window.scrollTo(0, 0);
                            sendPredictionAction(verifyRigth);
                        }
                    });
                } else {
                    message.error('Aún hay predicciones en blanco');
                }
            }
        }
    };
    renderMyPrediction = () => {
        const { predictionsByUsers } = this.props;
        // const { params } = this.props.match;
        // const { quinielaId } = params;
        // const id = localStorage.getItem('PrensaUserId');
        const fasesState = ['grupos', 'octavos', 'cuartos', 'semifinales', 'tercer puesto', 'final'];

        const predictionCard = _.map(fasesState, fase => {
            const PredictionCountryFase =
                _.filter(predictionsByUsers, prediction => prediction.JUEGO.ESTRUCTURA.NOMBRE === fase);
            const PredictionCountryFaseOrdered = _.sortBy(PredictionCountryFase, ['ID']);

            const data = _.map(PredictionCountryFaseOrdered, juego => {
                return (
                    <PredictionContry
                        game={juego}
                    />
                );
            });

            return (
                <Card type="inner" title={'Fase de ' + fase}>
                    <List
                        bordered
                        dataSource={data}
                        locale={{ emptyText: 'Cargando, por favor espera...' }}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                </Card>
            );
        });
        return predictionCard;
    };
    renderFases = () => {
        const { quinielaStructures, CountriesByGroup } = this.props;
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
                        CountriesByGroup={CountriesByGroup}
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
                        locale={{ emptyText: 'Cargando paises, banderas y opciones. Por favor espera...' }}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                </Card>
            );
        });
        return Cards;
    };
    setFlag = flag => {
        // console.log('attention!!!');
        // console.log(flag);
        switch (flag) {
            case 1:
                return <Avatar src={one} />;
            case 2:
                return <Avatar src={two} />;
            case 3:
                return <Avatar src={three} />;
            default:
                return <Avatar src={avatar} />;
        }
    };
    render() {
        // console.log('render container');
        const {
            quiniela,
            error,
            user,
            predictionsByUsers,
            quinielaPositions
        } = this.props;
        const { api_token } = user;
        const { userId } = this.state;
        const { getFieldDecorator } = this.props.form;

        // Check if is valid token
        if (api_token === 'Token invalido') {
            this.updateToken();
        }

        // Invitations arrays
        const invitationsTypes = [
            { propName: 'sendInvitations', human: 'Enviadas', text: 'enviadas'},
            { propName: 'refusedInvitations', human: 'Rechazadas', text: 'rechazadas'},
            { propName: 'acceptedInvitations', human: 'Aceptadas', text: 'aceptadas'},
        ];
        const invitations = {};
        _.chain(invitationsTypes)
            .each(item => {
                invitations[item.propName] = {
                    invitation: _.uniqBy(this.props[item.propName], 'USUARIO.CORREO'),
                    human: item.human,
                    text: item.text
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
        const operations = <a onClick={this.showDeleteConfirm} style={{ padding: 20 }} type="dashed">Eliminar quiniela</a>;
        let i = 2; // to have the control of dynamic tab keys
        let x = 0; // to have the control of dynamic tab keys
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
                        {_.isEmpty(predictionsByUsers) ? (
                            <Row>
                                { this.renderFases() }
                                <Col>
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{ marginTop: 15 }}
                                        onClick={this.savePrediction}
                                    >
                                        Colocar mi quiniela
                                    </Button>
                                </Col>
                            </Row>
                        ) : (
                            <div>
                                <Alert
                                    message="¡Felicitaciones!"
                                    description="Ya estás participando en esta quiniela. Actualizaremos los resultados reales después de cada partido, consulta tus puntos y tu lugar en la tabla de posiciones conforme se vayan jugando los partidos."
                                    type="success"
                                    showIcon
                                />
                                <br />
                                    { this.renderMyPrediction() }
                            </div>
                            )
                        }
                        </TabPane>
                        <TabPane tab={<span><Icon type="user-add" />Invitaciones</span>} key="2">
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab="Invitar" key="1">
                                    <div style={{ margin: '24px 0' }} />
                                    <Form onSubmit={this.sendInvitation} className="login-form">
                                        <FormItem>
                                            <span>Ingresa los correos electrónicos separados por coma.</span>
                                            {getFieldDecorator('emailStrings', {
                                                rules: [{required: true, message: 'Por favor ingresa los correos electrónicos'}],
                                            })(<Input placeholder="Ingresa los correos electrónicos" />)}
                                        </FormItem>
                                        <FormItem>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                icon="mail"
                                                size="large"
                                                onClick={this.sendInvitation}
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
                                                locale={{ emptyText: 'Aún no hay invitaciones ' + invitation.text }}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src={avatar} />}
                                                            title={item.USUARIO.CORREO || 'Nombre no disponible'}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </TabPane>
                                    );
                                })}
                            </Tabs>
                        </TabPane>
                        <TabPane tab={<span className={'posiciones'}><Icon type="trophy" />Posiciones </span>} key="3">
                            <List
                                itemLayout="horizontal"
                                dataSource={quinielaPositions}
                                renderItem={item => {
                                    x++;
                                    return (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={this.setFlag(x)}
                                                title={'Posición ' + x + ': ' + item.NOMBRE}
                                                description={'Puntos: ' + item.PUNTOS}
                                            />
                                        </List.Item>
                                    );
                                }}
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
    error: React.PropTypes.bool.isRequired,
    grupos: React.PropTypes.array.isRequired,
    postSuccesfull: React.PropTypes.bool.isRequired,
    CountriesByGroup: React.PropTypes.object.isRequired,
    refusedInvitations: React.PropTypes.array.isRequired,
    acceptedInvitations: React.PropTypes.array.isRequired,
    sendInvitations: React.PropTypes.array.isRequired,
    quinielaPositions: React.PropTypes.array.isRequired,
    predictionsByUsers: React.PropTypes.array.isRequired,
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
        quinielaPositions: state.game.quinielaPositions,
        postSuccesfull: state.game.postSuccesfull,
        sendInvitations: state.quiniela.sendInvitations,
        grupos: state.game.grupos,
        octavos: state.game.octavos,
        cuartos: state.game.cuartos,
        predictionsByUsers: state.game.predictionsByUsers,
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
            getPredictionsPerUserActions: getPredictionsPerUser,
            DeleteQuinielaAction: deleteQuiniela,
            sendPredictionAction: sendPrediction,
            getQuinielaPositionsActions: getQuinielaPositions,
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


