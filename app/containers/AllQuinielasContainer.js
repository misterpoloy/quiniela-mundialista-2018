/* eslint-disable camelcase */
import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

// Actions
import { bindActionCreators} from 'redux';
import { login } from '../actions/auth';
import {
    getAllQuinielas,
    getQuinielaInvitations,
    refuseInvitation,
    accepetInvitation
} from '../actions/quiniela';


// utils
const _ = require('lodash');

// Design
import {Card, List, Avatar, notification, Badge} from 'antd';
import { CardMedia, CardTitle} from 'material-ui/Card';
import pelota from '../src/images/pelota.png';
import bannerSource from '../src/images/banner3.jpg';


class AllQuinielas extends React.Component {
    state = {
        key: 'tab1',
        noTitleKey: 'article'
    };
    componentDidMount() {
        const { user } = this.props;
        const { getUserAllQuinielas, getUserInvitations, loginFunction } = this.props.actions;

        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');
        if (!token || token === 'Token invalido' || !id) {
            this.updateToken();
        } else {
            getUserAllQuinielas(id); // Quinielas a las que pertenezco
            getUserInvitations(id); // Quiniela Invitations
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
    onTabChange = (key, type) => {
        this.setState({[type]: key});
    };
    acceptInvitation = invitationId => {
        const { acceptInvitationAction } = this.props.actions;
        console.log('Accept: ' + invitationId);
        acceptInvitationAction(invitationId);
    };
    refuseInvitation = invitationId => {
        const { refuseInvitationAction } = this.props.actions;
        console.log('refuse: ' + invitationId);
        refuseInvitationAction(invitationId);
    };

    render() {
        const { AllQuinielasArray, user, UserInvitationsArray } = this.props;
        const { api_token } = user;

        if (api_token === 'Token invalido') {
            this.updateToken();
        }

        const tabList = [{
            key: 'tab1',
            tab: 'Listado de quinielas',
        }, {
            key: 'tab2',
            tab: <div>Invitaciones <Badge showZero count={UserInvitationsArray.length} /></div>,
        }];

        const contentList = {
            tab1: <List
                itemLayout="horizontal"
                dataSource={AllQuinielasArray}
                locale={{ emptyText: 'Aún no perteneces a ninguna quiniela'}}
                renderItem={item => (
                    <List.Item actions={[<a>visualizar</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={pelota} />}
                            title={<a href="https://ant.design">{item.NOMBRE}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED"
                        />
                    </List.Item>
                )}
            />,
            tab2: <List
                itemLayout="horizontal"
                dataSource={UserInvitationsArray}
                locale={{ emptyText: 'Aún no tienes invitaciones'}}
                renderItem={item => (
                    <List.Item actions={[
                        <a onClick={() => this.acceptInvitation(item.INVITACIONES_ID)}>Jugar</a>,
                        <a onClick={() => this.refuseInvitation(item.INVITACIONES_ID)}>Rechazar</a>
                    ]}>
                        <List.Item.Meta
                            avatar={<Avatar src={pelota} />}
                            title={item.NOMBRE}
                            description={item.DESCRIPCION}
                        />
                    </List.Item>
                )}
            />
        };

        return (
            <div>
                <CardMedia
                    overlay={<CardTitle title="Quinielas" subtitle="Comienza a crear tus quinielas" />}
                >
                    <img src={bannerSource} alt="" />
                </CardMedia>
                <Card
                    style={{width: '100%'}}
                    tabList={tabList}
                    onTabChange={(key) => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        );
    }
}

AllQuinielas.propTypes = {
    history: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    AllQuinielasArray: React.PropTypes.array.isRequired,
    UserInvitationsArray: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return({
        user: state.auth.user,
        AllQuinielasArray: state.quiniela.AllQuinielas,
        UserInvitationsArray: state.quiniela.UserInvitations
    });
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getUserAllQuinielas: getAllQuinielas,
            getUserInvitations: getQuinielaInvitations,
            refuseInvitationAction: refuseInvitation,
            acceptInvitationAction: accepetInvitation,
            loginFunction: login
        }, dispatch)
    };
}

const ShowTheLocationWithRouter = withRouter(AllQuinielas);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter);