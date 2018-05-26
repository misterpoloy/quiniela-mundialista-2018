/* eslint-disable camelcase */
import React from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

const styleGray = {
    background: '#F5F5F5',
    paddingLeft: 15,
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 10,
    borderRadius: 3
};

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
import {PLCONNECT_SIGNOFF, REACT_URL, URLQUINIELA} from '../constants/urls';

const PlConnectSignOff = PLCONNECT_SIGNOFF + URLQUINIELA + '?incomingUrl=' + REACT_URL;

class AllQuinielas extends React.Component {
    state = {
        key: 'tab1',
        noTitleKey: 'article'
    };
    componentDidMount() {
        const { user, location } = this.props;
        const { getUserAllQuinielas, getUserInvitations, loginFunction } = this.props.actions;

        const { search } = location;
        if (search === '?signOff=yes') {
            localStorage.clear();
            window.location.href = PlConnectSignOff;
        }

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
            description: 'Para poder acceder a todas las funciones de la Quiniela primero debes de iniciar sesión.',
            placement: 'bottomRight'
        });
        this.props.history.push('/');
    };
    onTabChange = (key, type) => {
        this.setState({[type]: key});
    };
    acceptInvitation = invitation => {
        const { acceptInvitationAction } = this.props.actions;
        acceptInvitationAction(invitation.INVITACIONES_ID);
        this.props.history.push('/quiniela/' + invitation.ID);
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
                    <List.Item actions={[[<Link style={styleGray} to={'/quiniela/' + item.ID}>Ver quiniela</Link>]]}>
                        <List.Item.Meta
                            avatar={<Avatar src={pelota} />}
                            title={<Link to={'/quiniela/' + item.ID}>{item.NOMBRE}</Link>}
                            description={item.DESCRIPCION}
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
                        <a style={styleGray} onClick={() => this.acceptInvitation(item)}>Jugar</a>,
                        <a style={styleGray} onClick={() => this.refuseInvitation(item.INVITACIONES_ID)}>Rechazar</a>
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
                    className={'banner'}
                    overlay={<CardTitle title="Todas las quinielas" subtitle="Juega, únete y disfruta de todas tus predicciones" />}
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
    UserInvitationsArray: React.PropTypes.array.isRequired,
    location: React.PropTypes.object.isRequired
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
