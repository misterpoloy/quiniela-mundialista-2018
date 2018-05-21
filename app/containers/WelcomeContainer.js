import React from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import { login } from '../actions/auth';
import {getMyQuinielas, getQuinielaInvitations} from '../actions/quiniela';

// utils
import queryString from 'query-string';

// Design
import { Layout, Row, Col, Button } from 'antd'; // Ant Styles
import {Card} from 'material-ui/Card';
import welcome from '../src/images/welcome.png';
const style = { marginTop: 20, marginLeft: 60, marginBottom: 50 };
const h1Style = {  marginTop: 30, marginBottom: 30, marginLeft: -50, color: '#379fe1' };

// urls
import {URLQUINIELA, PLCONNECT_URL, API_URL, PLCONNECT_SIGNOFF, REACT_URL} from '../constants/urls';
const PlConnectUrl = PLCONNECT_URL + URLQUINIELA + '?incomingUrl=' + API_URL + 'api/auth';
const PlConnectSignOff = PLCONNECT_SIGNOFF + URLQUINIELA + '?incomingUrl=' + REACT_URL;

class Welcome extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');
        if (token && token !== 'Token invalido' && id) {
            this.setState(() => ({ token, id }));
        } else {
            const { location } = this.props;
            const { search } = location;
            const urlVars = queryString.parse(search);
            if (urlVars && urlVars.id && urlVars.token) {
                this.setState(() => ({ ...urlVars }));
                localStorage.setItem('PrensaToken', urlVars.token);
                localStorage.setItem('PrensaUserId', urlVars.id);
            }
        }
    }
    componentDidMount() {
        const { loginFunction, getUserInvitations, getUserQuinielas } = this.props.actions;
        const { user } = this.props;
        const apiToken = user.api_token || '';

        if (apiToken === 'Token invalido') {
            localStorage.clear();
            window.location.href = PlConnectSignOff;
        }

        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');

        if(token) {
            loginFunction();
            getUserInvitations(id); // Quiniela Invitations
            getUserQuinielas(id);
        }
    }
    render() {
        const { user } = this.props;
        const apiToken = user.api_token || '';
        if (apiToken === 'Token invalido') {
            localStorage.clear();
            window.location.href = PlConnectSignOff;
        }
        return (
            <div>
                <Layout>
                    <Card>
                        <div>
                            <Row>
                                <Col xs={{span: 6, offset: 2}} md={{span: 12, offset: 8}}>
                                    <img style={{ marginTop: 150}} src={welcome} width={300} alt="" />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{span: 4, offset: 4}} md={{span: 10, offset: 9}}>
                                    {user.primer_nombre ?
                                        <h1 style={h1Style}>
                                            ¡Bienvenido { user.primer_nombre + ' ' + user.primer_apellido}!
                                        </h1>
                                        :
                                        <Button href={PlConnectUrl} style={style} type={'primary'} size={'large'}>
                                            Iniciar sesión</Button>
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Layout>
            </div>
        );
    }
}
Welcome.propTypes = {
    actions: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return({
        user: state.auth.user
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginFunction: login,
            getUserQuinielas: getMyQuinielas,
            getUserInvitations: getQuinielaInvitations,
        }, dispatch)
    };
}
const ShowTheLocationWithRouter = withRouter(Welcome);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter);
