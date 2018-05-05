/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

// Actions
import {bindActionCreators} from 'redux';
import {getMyQuinielas} from '../actions/quiniela';
import { login } from '../actions/auth';

// util
const _ = require('lodash');

// Design
import { CardMedia, CardTitle} from 'material-ui/Card';
import { Card, Button, List, Avatar, notification} from 'antd';
import bannerSource from '../src/images/banner3.jpg';
import pelota from '../src/images/pelota.png';

class MyQuinielas extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.showQuiniela = this.showQuiniela.bind(this);
    }
    componentDidMount() {
        const { getUserQuinielas, loginFunction } = this.props.actions;
        const { user } = this.props;

        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');
        if (!token || token === 'Token invalido' || !id) {
            this.updateToken();
        } else {
            // Load user Quinielas and getUser if neccesary
            getUserQuinielas(id);
            if (_.isEmpty(user)) {
                loginFunction(); // load user again if necesary
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
    handleClick() {
        this.props.history.push('/create');
    }
    showQuiniela() {
        this.props.history.push('/quiniela');
    }
    render() {
        const { quinielasByUser } = this.props;
        const { user } = this.props;
        const { api_token } = user;

        if (api_token === 'Token invalido') {
            this.updateToken();
        }

        return (
            <div>
                <CardMedia
                    overlay={<CardTitle title="Mis quinielas" subtitle="Comienza a crear tus quinielas" />}
                >
                    <img src={bannerSource} alt="" />
                </CardMedia>
                <Card
                    style={{ width: '100%' }}
                    title="Listado"
                    extra={<Button onClick={this.handleClick} type="primary">Crear nueva quiniela</Button>}
                >
                    {quinielasByUser &&
                    <List
                        itemLayout="horizontal"
                        dataSource={quinielasByUser}
                        locale={{ emptyText: 'Aún no has creado ninguna quiniela'}}
                        renderItem={item => (
                            <List.Item actions={[<Link to={'/quiniela/' + item.ID}>visualizar</Link>]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={pelota} />}
                                    title={<Link to={'/quiniela/' + item.ID}>{item.NOMBRE}</Link>}
                                    description={item.DESCRIPCION}
                                />
                            </List.Item>
                        )}
                    />
                    }
                </Card>
            </div>
        );
    }
}

MyQuinielas.propTypes = {
    history: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    getUserQuinielas: React.PropTypes.func.isRequired,
    myQuinielas: React.PropTypes.object.isRequired,
    quinielasByUser: React.PropTypes.array.isRequired
};
function mapStateToProps(state) {
    return({
        user: state.auth.user,
        quinielasByUser: state.quiniela.UserQuinielas
    });
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getUserQuinielas: getMyQuinielas,
            loginFunction: login
        }, dispatch)
    };
}

const ShowTheLocationWithRouter = withRouter(MyQuinielas);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter);

