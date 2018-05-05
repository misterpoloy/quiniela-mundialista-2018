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
import { getGroupList } from '../actions/game';
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


class Quiniela extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: false,
            countries: [
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
            ]
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
            getStructures
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

            if (quinielaId) {
                getQuinielaInfo(quinielaId);
                getAllQuinielaInvitations(quinielaId);
            }
        }
    }
    updateToken = () => {
        notification.error({
            message: 'Necesitas iniciar sesión',
            description: 'Para poder acceder a todas las funcnioes de la Quiniela primero debes de iniciar sesión.',
            placement: 'bottomRight'
        });
        this.props.history.push('/');
    };
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
    renderFases = () => {
        const { quinielaStructures } = this.props;

        const Cards = _.map(quinielaStructures, fase => {
            // getGamesById API PENDING
            const data = this.state.countries.map((countries) => {
                return <QuinielaGroups country1={countries.country1} country2={countries.country2} />;
            });

            return (
                <Card
                    type="inner"
                    title={'Fase de ' + fase.NOMBRE}
                >
                    {/**
                     // const grupoA = _.filter(CountriesByGroup, group => { return group.ID === 'A'; });
                     Aqui es donde se hace el render de paises
                     **/}
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                </Card>
            );
        });
        return Cards;
    };
    render() {
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
                                                            title={<a href="https://ant.design">{item.NOMBRE || 'Nombre no disponible'}</a>}
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
Quiniela.propTypes = {
    history: React.PropTypes.object.isRequired,
    userId: React.PropTypes.string.isRequired,
    match: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    quiniela: React.PropTypes.object.isRequired,
    error: React.PropTypes.object.isRequired,
    CountriesByGroup: React.PropTypes.array.isRequired,
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
        sendInvitations: state.quiniela.sendInvitations
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
            getAllQuinielaInvitations: getInivtationsById
        }, dispatch)
    };
}
const ShowTheLocationWithRouter = withRouter(Quiniela);

const WithRouterWithForm = Form.create()(ShowTheLocationWithRouter);

export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWithForm);


