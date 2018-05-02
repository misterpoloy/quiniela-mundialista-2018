import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Badge } from 'antd';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeMainColor } from '../actions/theme'; // Actions
import AppTheme from './../styles/app-material-ui-theme'; // Custom App Theme

class TabsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleActive = this.handleActive.bind(this);
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
        const { UserInvitationsArray } = this.props;

        return(
            <div style={{position: 'fixed', marginTop: 62, width: '100%', zIndex: 99}}>
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
                {/** Hide Quiniela Claro Manually
                 <Tab
                 style={style}
                 label="Quiniela Claro"
                 data-route="/super"
                 onActive={this.handleActive} />
                 **/}
            </Tabs>
            </div>
        );
    }
}
TabsMenu.propTypes = {
    history: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    theme: React.PropTypes.object.isRequired,
    UserInvitationsArray: React.PropTypes.array.isRequired
};
function mapStateToProps(state) {
    return({
        theme: state.theme,
        UserInvitationsArray: state.quiniela.UserInvitations
    });
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            changeMainColor
        }, dispatch)
    };
}

const ShowTheLocationWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(TabsMenu));

export default ShowTheLocationWithRouter;
