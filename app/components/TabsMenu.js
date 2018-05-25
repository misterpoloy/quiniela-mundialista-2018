import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
// Actions
import { changeMainColor } from '../actions/theme';
import { superQuinielaExist } from '../actions/quiniela';
// Design
import {Tabs, Tab} from 'material-ui/Tabs';
import { Badge } from 'antd';
import AppTheme from './../styles/app-material-ui-theme'; // Custom App Theme

class TabsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleActive = this.handleActive.bind(this);
    }
    componentDidMount() {
        const { getSuperQuiniela } = this.props.actions;
        getSuperQuiniela();
    }
    handleActive(tab) {
        this.props.history.push(tab.props['data-route']);
        if(tab.props['data-route'] === '/super') {
            this.props.actions.changeMainColor(AppTheme.palette.primary2Color);
        } else {
            this.props.actions.changeMainColor(AppTheme.palette.primary1Color);
        }
    }
    render() {
        const style = {
            backgroundColor: this.props.theme.primary1Color,
        };
        const { UserInvitationsArray, superQuiniela } = this.props;

        return(
            <div style={{position: 'fixed', marginTop: 62, width: '100%', zIndex: 10}}>
            <Tabs>
                <Tab
                    style={style}
                    label="Mis quinelas"
                    data-route="/mis-quinielas"
                    onActive={this.handleActive} />
                <Tab
                    style={style}
                    label={<div>Todas <Badge showZero style={style} count={UserInvitationsArray.length}/></div>}
                    data-route="/quinielas"
                    onActive={this.handleActive} />

                {superQuiniela && (
                    <Tab
                        style={style}
                        label="Quiniela Claro"
                        data-route="/super"
                        onActive={this.handleActive}
                    />
                )}
            </Tabs>
            </div>
        );
    }
}
TabsMenu.propTypes = {
    history: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    theme: React.PropTypes.object.isRequired,
    superQuiniela: React.PropTypes.number.isRequired,
    UserInvitationsArray: React.PropTypes.array.isRequired
};
function mapStateToProps(state) {
    return({
        theme: state.theme,
        UserInvitationsArray: state.quiniela.UserInvitations,
        superQuiniela: state.quiniela.superQuiniela
    });
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            changeMainColor,
            getSuperQuiniela: superQuinielaExist
        }, dispatch)
    };
}

const ShowTheLocationWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(TabsMenu));

export default ShowTheLocationWithRouter;
