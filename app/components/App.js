import React from 'react';
import {Link} from 'react-router-dom';
import {footer} from '../styles/footer.scss';
import Routes from '../routes';
import {Layout} from 'antd'; // Ant Styles
const {Footer, Content} = Layout; // Ant Layout
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // Material theme
import getMuiTheme from 'material-ui/styles/getMuiTheme'; // Custom App Theme
import ComponentHeader from './../containers/HeaderContainer'; // Main Content
import TabsMenu from './TabsMenu'; // Main Content
import 'antd/dist/antd.css';
import './../styles/styles.scss';
import AppTheme from './../styles/app-material-ui-theme';

const App = () =>
    <MuiThemeProvider muiTheme={getMuiTheme(AppTheme)}>
        <div>
            <ComponentHeader/>
            <TabsMenu/>
            <Content>
                { Routes }
            </Content>
            <Footer className={footer}>
                <Link to="/">Inicio</Link>
                <a href="http://www.prensalibre.com/Terminos" target="_blank">Términos y condiciones</a>
                <Link to="/info">Reglas</Link>
            </Footer>
        </div>
    </MuiThemeProvider>;

export default App;
