/* eslint-disable camelcase */
import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';

// utils
import uniqid from 'uniqid';
const _ = require('lodash');

// actions
import { bindActionCreators } from 'redux';
import {login} from '../actions/auth';
import {createQuiniela} from '../actions/quiniela';

// Design
import {Card as CardAnt, Steps, Input,
        Row, Col, Button, Icon, Alert, Form } from 'antd';
import {notification} from 'antd/lib/index';
import { CardMedia, CardTitle} from 'material-ui/Card';
import bannerSource from '../src/images/banner2.jpg'; // ContentSite

// Instances
const Step = Steps.Step;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class CreateQuiniela extends  React.Component {
    constructor() {
        super();
        this.state = {
            step: 0,
            quiniela: {
                id: ''
            }
        };
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }
    componentDidMount() {
        const { loginFunction } = this.props.actions;
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
        }
    }
    handleNext() {
        this.setState({ step: this.state.step + 1 });
    }
    handleBack() {
        this.setState({ step: this.state.step - 1 });
    }
    handleSubmit = (e) => {
        const { createQuinielaFunction } = this.props.actions;
        const TIPO_DE_QUINIELA = 1; // normal
        const CREADO_POR = parseInt(localStorage.getItem('PrensaUserId'), 10);
        const CODIGO_COMPARTIR = uniqid();
        e.preventDefault();
        this.props.form.validateFields((err, quinielaObject) => {
            if (!err) {
                const Quiniela = {...quinielaObject, TIPO_DE_QUINIELA, CREADO_POR, CODIGO_COMPARTIR};
                console.log(Quiniela);
                createQuinielaFunction({...Quiniela});
                this.handleNext();
            }
        });
    };
    handleFinish = () => {
        this.props.history.push('/mis-quinielas');
    };
    sendInvitation = () => {
        const { createdQuiniela } = this.props;
        if (!_.isEmpty(createdQuiniela)) {
            console.log(createdQuiniela);
        } else {
            notification.error({
                message: 'Se ha producido un error',
                description: 'Se ha producido un con el API al momento de crear la Quiniela',
                placement: 'bottomRight'
            });
        }
    };
    renderSteps = () => {
        const {step} = this.state;
        const { getFieldDecorator } = this.props.form;
        const required = 'Este campo es requerido';

        switch (step) {
            case 0:
                return(
                    <CardAnt title="Ingresa los datos:">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                <span>Nombre de la quiniela</span>
                                {getFieldDecorator('NOMBRE', {
                                    rules: [{ required: true, message: required }]
                                })(<Input placeholder="Por ejemplo: Amigos" />)}
                            </FormItem>
                            <FormItem>
                                <span>Descripción</span>
                                {getFieldDecorator('DESCRIPCION', {
                                    rules: [{ required: true, message: required }]
                                })(
                                    <TextArea
                                        placeholder="Ingresa una descripción para que la recuerdes"
                                        autosize={{ minRows: 4, maxRows: 6 }}
                                    />
                                )}
                        </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    size="large"
                                >
                                    Crear quiniela
                                </Button>
                            </FormItem>
                        </Form>
                    </CardAnt>);
            case 1:
                return(
                    <CardAnt title="Compartir e invitar:">
                        <Alert
                            message="¿Puedo invitar después?"
                            description="Si, mas adelante podrás invitar a tus amigos también"
                            type="info"
                            showIcon
                        />
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
                                    onClick={this.sendInvitation}
                                >
                                    Enviar invitaciones
                                </Button>
                            </Col>
                            <Col span={3} offset={11}>
                                <ButtonGroup>
                                    <Button onClick={this.handleNext} type="primary" size="large">
                                        Terminar<Icon type="right" />
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </CardAnt>
                );
            case 2:
                return(
                    <CardAnt title="Hemos terminado">
                        <Alert
                            message="¡Todo listo!"
                            description="Haz creado tu quiniela, ahora puedes comenzar a jugar."
                            type="success"
                            showIcon
                        />
                        <div style={{ margin: '24px 0' }} />
                        <Row>
                            <Col span={2} offset={10}>
                                <Button onClick={this.handleFinish} type="primary" size="large">Ver mis quinielas</Button>
                            </Col>
                        </Row>
                    </CardAnt>
                );
            default:
                return(
                    <div style={{ margin: '24px 0', padding: '25px' }}>
                        Has ido demasiado lejos!! :O
                    </div>);
        }
    };
    render() {
        return(
            <div>
                <CardMedia
                    overlay={<CardTitle title="Crea tus propias quinielas" subtitle="Diviertete y juega con tu familia y amigos" />}>
                    <img src={bannerSource} alt="" />
                </CardMedia>
                <CardAnt
                    title="Crear nueva quiniela"
                    style={{ width: '100%' }}>
                    <Steps current={this.state.step}>
                        <Step title="Información" description="Descripción general." />
                        <Step title="Compartir" description="Invita a amigos." />
                        <Step title="¡Juega!" description="Haz tu predicción" />
                    </Steps>
                </CardAnt>
                {this.renderSteps()}
            </div>
        );
    }
}

CreateQuiniela.propTypes = {
    history: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    recentQuiniela: React.PropTypes.object.isRequired,
    createdQuiniela: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    form: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return({
        user: state.auth.user,
        recentQuiniela: state.quiniela.recentQuiniela
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginFunction: login,
            createQuinielaFunction: createQuiniela
        }, dispatch)
    };
}

const ShowTheLocationWithRouter = withRouter(CreateQuiniela);

const WithRouterWithForm = Form.create()(ShowTheLocationWithRouter);

export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWithForm);
