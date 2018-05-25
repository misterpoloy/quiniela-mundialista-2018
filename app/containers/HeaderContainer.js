import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {changeMainColor} from '../actions/theme';
import AppTheme from '../styles/app-material-ui-theme';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import bannerLogo from '../src/images/logo.png';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import {PLCONNECT_SIGNOFF, FACEBOOK_SHARE, URLQUINIELA, REACT_URL, PLCONNECT_URL, API_URL} from '../constants/urls';

const PlConnectSignOff = PLCONNECT_SIGNOFF + URLQUINIELA + '?incomingUrl=' + REACT_URL;
const PlConnectUrl = PLCONNECT_URL + URLQUINIELA + '?incomingUrl=' + API_URL + 'api/auth';

class ComponentHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.history.push('/info');
        this.props.actions.changeMainColor(AppTheme.palette.primary3Color);
    }
    goToWelcome = () => {
        this.props.history.push('/');
    };
    goToMyQuinielas = () => {
        this.props.history.push('/mis-quinielas');
    };
    signOff() {
        localStorage.clear();
        window.location.href = PlConnectSignOff;
    }
    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        const { user } = this.props;
        return(
            <div>
                <AppBar
                    onLeftIconButtonClick={this.handleToggle}
                    style={{backgroundColor: this.props.theme.primary1Color, position: 'fixed', width: '100%'}}
                    title={<img src={bannerLogo} width={230} alt="Prensa Libre 2018" />}
                    iconElementRight={
                        <div>
                            <FlatButton className={'reglas'} onClick={this.handleClick} label="Reglas" />
                            <FacebookShareButton url={FACEBOOK_SHARE}>
                                <FacebookIcon size={42} round />
                            </FacebookShareButton>
                        </div>
                    }
                />
                <div>
                    <Drawer open={this.state.open}>
                        <AppBar
                            title={<img src={bannerLogo} width={230} alt="Prensa Libre 2018" />}
                            onTitleClick={this.handleToggle}
                            iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}
                        />
                        {user.primer_nombre ?
                            <div>
                                <MenuItem onClick={this.goToMyQuinielas}>
                                    { user.primer_nombre + ' ' + user.segundo_nombre + ' ' + user.primer_apellido}
                                </MenuItem>
                                <MenuItem onClick={this.signOff}>Cerrar sesión</MenuItem>
                            </div>
                            :
                            <MenuItem href={PlConnectUrl} onClick={this.goToWelcome}>Iniciar sesión</MenuItem>
                        }
                    </Drawer>
                </div>
            </div>
        );
    }
}

ComponentHeader.propTypes = {
    history: React.PropTypes.object.isRequired,
    theme: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return({
        theme: state.theme,
        user: state.auth.user
    });
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            changeMainColor
        }, dispatch)
    };
}

const ShowTheLocationWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentHeader));
export default ShowTheLocationWithRouter;


