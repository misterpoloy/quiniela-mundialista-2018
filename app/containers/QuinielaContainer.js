/* eslint-disable camelcase */
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';

// Design
import { Steps, Card, Button, Icon, Tabs, List, Modal, message, Avatar, Input, Row, Col, Form, Alert, notification} from 'antd';
import { CardMedia, CardTitle} from 'material-ui/Card';
import bannerSource from '../src/images/banner4.jpg';
import avatar from '../src/images/avatar.png';
import one from '../src/images/1.png';
import two from '../src/images/2.png';
import three from '../src/images/3.png';
// instances
const FormItem = Form.Item;
const Step = Steps.Step;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

// Actions
import {login} from '../actions/auth';
import {
    getGroupList,
    getAllGamesByGroups,
    sendPrediction,
    getPredictionsPerUser,
    getQuinielaPositions
} from '../actions/game';

import {getQuiniela,
    deleteQuiniela,
    sendQuinielaInvitations,
    getInivtationsById,
    getQuinielaStructures
} from '../actions/quiniela';

// util
const _ = require('lodash');

// Components
import QuinielaGroups from '../components/QuinielaGroups';
import PredictionContry from '../components/PredictionContry';

const DownStyle = {
    position: 'fixed',
    bottom: 25,
    right: 25,
    width: 50,
    opacity: 0.7
};
const UpStyle = {
    position: 'fixed',
    bottom: 70,
    right: 25,
    width: 50,
    opacity: 0.7
};

const initialState = {
    userId: false,
    playedCounter: 0,
    step: 0,
    done: false,
    groupsGame: {},
    games: {},
    groupsIsReady: false,
    octavosIsReady: false,
    cuartosIsReady: false,
    semiIsReady: false,
    thirdIsReady: false,
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    a8: [],
    b8: [],
    c8: [],
    d8: [],
    e8: [],
    f8: [],
    g8: [],
    h8: [],
    a4: [],
    b4: [],
    c4: [],
    d4: [],
    a2: [],
    b2: [],
    ter: [],
    fin: [],
    octavos: [],
    cuartos: [],
    semifinal: [],
    tercero: [],
    final: []
};

class QuinielaGame extends React.Component {
    constructor() {
        super();
        this.state = {
            ...initialState
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
        const { params } = this.props.match;
        const { quinielaId } = params;
        const token = localStorage.getItem('PrensaToken');
        const id = localStorage.getItem('PrensaUserId');
        const {
            loginFunction,
            getQuinielaInfo,
            getByGroup,
            getAllQuinielaInvitations,
            getStructures,
            getPredictionsPerUserActions,
            getQuinielaPositionsActions,
            getAllGamesByGroupsAction
        } = this.props.actions;
        if (!token || token === 'Token invalido' || !id) {
            this.updateToken();
        } else {
            loginFunction();
            getByGroup(1);
            getStructures();
            getPredictionsPerUserActions(quinielaId, id);
            getAllGamesByGroupsAction();

            if (quinielaId) {
                getQuinielaInfo(quinielaId);
                getQuinielaPositionsActions(quinielaId);
                getAllQuinielaInvitations(quinielaId);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        // If user post Quinielas succesfully seach again
        const { getPredictionsPerUserActions } = this.props.actions;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');
        // PART OF NEW CODE START
        // SET GROUPS
        if (!_.isEmpty(nextProps.grupos) && this.state.groupsIsReady === false) {
            const groupsGame = {};
            _.each(nextProps.grupos, groupGame => {
                groupsGame[groupGame.ID] = {
                    id: groupGame.ID,
                    winnerId: null,
                    loserId: null,
                    group: groupGame.OPCIONES_DE_SELECCION
                };
            });
            this.setState(() => ({ groupsGame, groupsIsReady: true }));
        }
        // SET OCTAVOS
        if (!_.isEmpty(nextProps.octavos) && this.state.octavosIsReady === false) {
            const octavosGame = {};
            _.each(nextProps.octavos, groupGame => {
                octavosGame[groupGame.ID] = {
                    id: groupGame.ID,
                    winnerId: null,
                    loserId: null,
                    group: groupGame.OPCIONES_DE_SELECCION
                };
            });
            this.setState(() => ({ octavosGame, octavosIsReady: true }));
        }
        // SET SEMIFINALS
        if (!_.isEmpty(nextProps.semiFinales) && this.state.semiIsReady === false) {
            const semiFinalesGame = {};
            _.each(nextProps.semiFinales, groupGame => {
                semiFinalesGame[groupGame.ID] = {
                    id: groupGame.ID,
                    winnerId: null,
                    loserId: null,
                    group: groupGame.OPCIONES_DE_SELECCION
                };
            });
            this.setState(() => ({ semiFinalesGame, semiIsReady: true }));
        }
        // SET THIRD
        if (!_.isEmpty(nextProps.tercer) && this.state.thirdIsReady === false) {
            const tercerGame = {};
            _.each(nextProps.tercer, groupGame => {
                tercerGame[groupGame.ID] = {
                    id: groupGame.ID,
                    winnerId: null,
                    loserId: null,
                    group: tercerGame.OPCIONES_DE_SELECCION
                };
            });
            this.setState(() => ({ tercerGame, thirdIsReady: true }));
        }
        // COUNTRIES
        if (!_.isEmpty(nextProps.CountriesByGroup) && this.state.done === false) {
            const countriesGroupA = _.filter(nextProps.CountriesByGroup, group => {
                return group.CODIGO === 'A';
            });
            const countriesGroupB = _.filter(nextProps.CountriesByGroup, group => {
                return group.CODIGO === 'B';
            });
            const countriesGroupC = _.filter(nextProps.CountriesByGroup, group => {
                return group.CODIGO === 'C';
            });
            const countriesGroupD = _.filter(nextProps.CountriesByGroup, group => {
                return group.CODIGO === 'D';
            });
            const countriesGroupE = _.filter(nextProps.CountriesByGroup, group => {
                return group.CODIGO === 'E';
            });
            const countriesGroupF = _.filter(nextProps.CountriesByGroup, group => {
                return group.CODIGO === 'F';
            });
            const countriesGroupG = _.filter(nextProps.CountriesByGroup, group => {
                return group.CODIGO === 'G';
            });
            const countriesGroupH = _.filter(nextProps.CountriesByGroup, group => {
                return group.CODIGO === 'H';
            });
            this.setState(() => ({
                countriesGroupA,
                countriesGroupB,
                countriesGroupC,
                countriesGroupD,
                countriesGroupE,
                countriesGroupF,
                countriesGroupG,
                countriesGroupH,
                done: true
            }));
        }
        // PART OF NEW CODE END
        // to render succes quiniela
        if (this.props.postSuccesfull !== nextProps.postSuccesfull) {
            // console.log('getAllQuinielas');
            getPredictionsPerUserActions(quinielaId, id);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const stepChange = nextState.step !== this.state.step;
        const propsChange = this.props !== nextProps;
        return propsChange || stepChange;
    }
    updateToken = () => {
        notification.error({
            message: 'Necesitas iniciar sesión',
            description: 'Para poder acceder a todas las funcnioes de la Quiniela primero debes de iniciar sesión.',
            placement: 'bottomRight'
        });
        this.props.history.push('/');
    };
    callback = () => {
        const { getAllQuinielaInvitations } = this.props.actions;
        const { params } = this.props.match;
        const { quinielaId } = params;
        getAllQuinielaInvitations(quinielaId);
    };
    showDeleteConfirm = () => {
        const { params } = this.props.match;
        const { quinielaId } = params;
        confirm({
            title: '¿Estás seguro que deseas eliminar tu quiniela?',
            content: 'Las predicciones de tus invitados de esta quiniela también serán eliminadas. Esta acción no puede ser deshecha.',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: this.onDeleteConfirm.bind(this, quinielaId),
            onCancel() {
                // console.log('Cancel');
            },
        });
    };
    sendInvitation = e => {
        const { inviteToQuiniela } = this.props.actions;
        const { resetFields } = this.props.form;

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
                    if (!emailsFound) {
                        notification.error({
                            message: 'No has ingresado correos electrónicos',
                            description: 'Tienes que ingresar correos electrónicos validos',
                            placement: 'bottomRight'
                        });
                        return;
                    }
                    const eachMail = emailsFound[0].split(',');
                    let totalEmailString = '';

                    eachMail.forEach(function(email) {
                        totalEmailString += email;
                        const body = {
                            email: email.replace(/\s+/g, ''),
                            quinela_id
                        };
                        inviteToQuiniela(body, function(error) {
                            if (!error) {
                                notification.success({
                                    message: 'Exito',
                                    description: 'La invitación se ha enviado con exito a ' + email,
                                    placement: 'bottomRight'
                                });
                            } else {
                                notification.error({
                                    message: 'Usuario ya invitado',
                                    description: 'El usuario ' + email + ', ya ha sido invitado a esta quiniela',
                                    placement: 'bottomRight'
                                });
                            }
                        });

                        resetFields();
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
    setNewPrediction = prediction => {
        const { games } = this.state;
        const gamesCopy = games;
        const updateGames = { ...gamesCopy, ...prediction };
        this.setState(() => ({ games: updateGames }));
    };
    utilStructure = structure =>    {
        // Get the current structure
        const index = Object.keys(structure)[0];
        const structureObject = structure[index];
        // Create Copy of the state
        const copy = this.state.groupsGame;
        const groupsGame = { ...copy, ...structure };
        const groupATable = {};

        _.chain(groupsGame)
        .filter((game) => game.group === structureObject.group)
        .each(game => {
            // create a unique counter per GROUP GAME per COUNTRY
            if (!groupATable[game.winnerId] && game.winnerId !== null) {
                groupATable[game.winnerId] = {
                    countryId: game.winnerId,
                    counter: 0
                };
            }
            if (game.winnerId !== null) {
                groupATable[game.winnerId].counter++;
            }
        })
        .value();
        // Order the first 2 results

        const temporalContainer = {
            [structureObject.group]: _.orderBy(groupATable, ['counter'], ['desc'])
        };
        // Asign the ID of the 2 results to the state
        this.setState(() => ({ groupsGame, ...temporalContainer }));
    };
    utilStruOctavos = structure => {
        // Get the current structure
        const index = Object.keys(structure)[0];
        const structureObject = structure[index];
        // Create Copy of the state
        const copy = this.state.octavosGame;
        const octavosGame = { ...copy, ...structure };
        const groupATable = {};

        _.chain(octavosGame)
            .filter((game) => game.group === structureObject.group)
            .each(game => {
                // create a unique counter per GROUP GAME per COUNTRY
                if (!groupATable[game.winnerId] && game.winnerId !== null) {
                    groupATable[game.winnerId] = {
                        countryId: game.winnerId,
                        counter: 0
                    };
                }
                if (game.winnerId !== null) {
                    groupATable[game.winnerId].counter++;
                }
            })
            .value();
        // Order the first 2 results
        const temporalContainer = {
            [structureObject.group]: _.orderBy(groupATable, ['counter'], ['desc'])
        };
        // Asign the ID of the 2 results to the state
        this.setState(() => ({ octavosGame, ...temporalContainer }));
    };
    utilStruCuartos = structure => {
        // Get the current structure
        const index = Object.keys(structure)[0];
        const structureObject = structure[index];
        // Create Copy of the state
        const copy = this.state.cuartosGame;
        const cuartosGame = { ...copy, ...structure };
        const groupATable = {};

        _.chain(cuartosGame)
            .filter((game) => game.group === structureObject.group)
            .each(game => {
                // create a unique counter per GROUP GAME per COUNTRY
                if (!groupATable[game.winnerId] && game.winnerId !== null) {
                    groupATable[game.winnerId] = {
                        countryId: game.winnerId,
                        counter: 0
                    };
                }
                if (game.winnerId !== null) {
                    groupATable[game.winnerId].counter++;
                }
            })
            .value();
        // Order the first 2 results
        const temporalContainer = {
            [structureObject.group]: _.orderBy(groupATable, ['counter'], ['desc'])
        };
        // Asign the ID of the 2 results to the state
        this.setState(() => ({ cuartosGame, ...temporalContainer }));
    };
    utilStruSemiFinal = structure => {
        // Get the current structure
        const index = Object.keys(structure)[0];
        const structureObject = structure[index];
        // Create Copy of the state
        const copy = this.state.semiFinalGame;
        const semiFinalGame = { ...copy, ...structure };
        const groupATable = {};

        _.chain(semiFinalGame)
            .filter((game) => game.group === structureObject.group)
            .each(game => {
                // create a unique counter per GROUP GAME per COUNTRY
                if (!groupATable[game.winnerId] && game.winnerId !== null) {
                    groupATable[game.winnerId] = {
                        countryId: game.winnerId,
                        loserId: game.loserId,
                        counter: 0
                    };
                }
                if (game.winnerId !== null) {
                    groupATable[game.winnerId].counter++;
                }
            })
            .value();
        // Order the first 2 results
        const temporalContainer = {
            [structureObject.group]: _.orderBy(groupATable, ['counter'], ['desc'])
        };
        // Asign the ID of the 2 results to the state
        this.setState(() => ({ semiFinalGame, ...temporalContainer }));
    };
    utilStruTercero = structure => {
        console.log('utilTercero');
        console.log(structure);
        // Get the current structure
        const index = Object.keys(structure)[0];
        const structureObject = structure[index];
        // Create Copy of the state
        const copy = this.state.tercerGame;
        const tercerGame = { ...copy, ...structure };
        const groupATable = {};

        _.chain(tercerGame)
            .filter((game) => game.group === structureObject.group)
            .each(game => {
                // create a unique counter per GROUP GAME per COUNTRY
                if (!groupATable[game.winnerId] && game.winnerId !== null) {
                    groupATable[game.winnerId] = {
                        countryId: game.winnerId,
                        loserId: game.loserId,
                        counter: 0
                    };
                }
                if (game.winnerId !== null) {
                    groupATable[game.winnerId].counter++;
                }
            })
            .value();
        // Order the first 2 results
        const temporalContainer = {
            [structureObject.group]: _.orderBy(groupATable, ['counter'], ['desc'])
        };
        // Asign the ID of the 2 results to the state
        this.setState(() => ({ tercerGame, ...temporalContainer }));
    };
    checkAlreadyPlayed = stru => {
        const { playedCounter } = this.state;

        let playedCounterCopy = playedCounter;
        let totalPlayedPerStru = [];

        _.each(this.props[stru], function(juego) {
            if (juego.GOLES_1 !== null && juego.GOLES_2 !== null) {
                const stuCopy = totalPlayedPerStru;
                const winner = (juego.GOLES_1 > juego.GOLES_2) ? juego.JUGADOR_1.ID : juego.JUGADOR_2.ID;
                const loser = (juego.GOLES_1 > juego.GOLES_2) ? juego.JUGADOR_2.ID : juego.JUGADOR_1.ID;
                const utilPlayed = [
                    {
                        id: juego.ID,
                        group: juego.OPCIONES_DE_SELECCION,
                        winnerId: winner,
                        loserId: loser
                    }
                ];
                playedCounterCopy++;
                totalPlayedPerStru = [...stuCopy, ...utilPlayed];
            }
        });
        return { playedCounter: playedCounterCopy, totalPlayedPerStru};
    };
    savePrediction = () => {
        const { grupos } = this.props;
        const { sendPredictionAction } = this.props.actions;
        const { games } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        if(_.isEmpty(games)) {
            // console.log('no prediction');
            message.error('Hún no has echo ninguna predicción aún...');
        } else {
            // console.log('mi magia');
            const prediction = {};
            // 1. For the groups if zero then create a default object
            // 1. Generate the 64 games in one simple array
            _.map(grupos, function(game) {
                prediction[game.ID] = {
                    GOL_1: game.GOLES_1 || 0,
                    GOL_2: game.GOLES_2 || 0,
                    JUEGO: game.ID,
                    JUEGO_1: game.JUGADOR_1.ID,
                    JUEGO_2: game.JUGADOR_2.ID,
                    QUINIELA: quinielaId,
                    USUARIO: id
                };
            });
            // 1.2 check games already played
            const { quinielaStructures } = this.props;
            const fasesState = ['grupos', 'octavos', 'cuartos', 'semiFinales', 'tercer', 'final'];

            let i = 0;
            let gamesPlayed = {};
            _.map(quinielaStructures, () => {
                const currentProp = fasesState[i];
                const currentFaseProps = this.props[currentProp];

                _.each(currentFaseProps, function(juego) {
                    if (juego.GOLES_1 !== null && juego.GOLES_2 !== null) {
                        const gamesPlayedCopy = gamesPlayed;
                        const predictionAdd = {
                            [juego.ID]: {
                                JUEGO: juego.ID,
                                QUINIELA: quinielaId,
                                USUARIO: id,
                                GOL_1: juego.GOLES_1,
                                GOL_2: juego.GOLES_2,
                                JUEGO_1: juego.JUGADOR_1.ID,
                                JUEGO_2: juego.JUGADOR_2.ID
                            }
                        };
                        gamesPlayed = {...gamesPlayedCopy, ...predictionAdd}; // already played games
                    }
                });
                i++;
            });
            // 2. Mix the predictions with the original value
            const curated = {...prediction, ...games, ...gamesPlayed};
            if (_.size(curated) !== 64) {
                console.log('attention');
                console.log(_.size(curated));
                message.error('Aún hay predicciones en blanco');
            } else {
                const verifyLeftGame = _.filter(curated, function(verify) { return verify.JUEGO_1 !== null; });
                const verifyRigth = _.filter(verifyLeftGame, function(verify) { return verify.JUEGO_2 !== null; });
                // 3. Check if there is no null.
                // 4. Save the prediction.
                if (_.size(verifyRigth) === 64) {
                    // Let's save the game!
                    confirm({
                        title: '¿Estás seguro que quieres guardar tu quiniela?',
                        content: 'Recuerda que no puedes editar tu predicción después, así que elige con atención tus predicciones.',
                        okText: '¡Si! Guardar',
                        cancelText: 'No, aún no',
                        onOk() {
                            window.scrollTo(0, 0);
                            // #newFunction
                            document.body.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                            // #newFunction_end
                            sendPredictionAction(verifyRigth);
                        }
                    });
                } else {
                    message.error('Aún hay predicciones en blanco');
                }
            }
        }
    };
    renderMyPrediction = () => {
        const { predictionsByUsers } = this.props;
        // const { params } = this.props.match;
        // const { quinielaId } = params;
        // const id = localStorage.getItem('PrensaUserId');
        const fasesState = ['grupos', 'octavos', 'cuartos', 'semifinales', 'tercer puesto', 'final'];

        const predictionCard = _.map(fasesState, fase => {
            const PredictionCountryFase =
                _.filter(predictionsByUsers, prediction => prediction.JUEGO.ESTRUCTURA.NOMBRE === fase);
            const PredictionCountryFaseOrdered = _.sortBy(PredictionCountryFase, ['ID']);

            const data = _.map(PredictionCountryFaseOrdered, juego => {
                return (
                    <PredictionContry
                        game={juego}
                    />
                );
            });

            return (
                <Card type="inner" title={'Fase de ' + fase}>
                    <List
                        bordered
                        dataSource={data}
                        locale={{ emptyText: 'Cargando, por favor espera...' }}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                </Card>
            );
        });
        return predictionCard;
    };
    renderGroupGames = () => {
        const { CountriesByGroup, grupos } = this.props;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        const data = grupos.map((juego) => {
            return (
                <QuinielaGroups
                    key={juego.ID}
                    quinielaId={quinielaId}
                    userId={id}
                    order={this.state[juego.OPCIONES_DE_SELECCION] || [] }
                    CountriesByGroup={CountriesByGroup}
                    utilStructure={this.utilStructure}
                    addGame={this.setNewPrediction}
                    game={juego}
                />
            );
        });
        return (
            <Card type="inner" title={'Fase de Grupos'}>
                <List
                    bordered
                    dataSource={data}
                    locale={{ emptyText: 'Cargando paises, banderas y opciones. Por favor espera...' }}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </Card>
        );
    };
    renderOctavos = () => {
        const { CountriesByGroup, octavos } = this.props;
        const { arrayDefaultValues } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        // array counter
        let ac = -1;
        const data = octavos.map((juego) => {
            ac++;
            return (
                <QuinielaGroups
                    key={juego.ID}
                    quinielaId={quinielaId}
                    userId={id}
                    defaultValue={arrayDefaultValues[ac]}
                    order={this.state[juego.OPCIONES_DE_SELECCION] || [] }
                    CountriesByGroup={CountriesByGroup}
                    utilStructure={this.utilStruOctavos}
                    addGame={this.setNewPrediction}
                    game={juego}
                />
            );
        });
        return (
            <Card type="inner" title={'Fase de Octavos'}>
                <List
                    bordered
                    dataSource={data}
                    locale={{ emptyText: 'Cargando paises, banderas y opciones. Por favor espera...' }}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </Card>
        );
    };
    renderCuartos = () => {
        const { CountriesByGroup, cuartos } = this.props;
        const { arrayDefaultValuesCuartos } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        // array counter
        let ac = -1;
        const data = cuartos.map((juego) => {
            ac++;
            return (
                <QuinielaGroups
                    key={juego.ID}
                    quinielaId={quinielaId}
                    userId={id}
                    defaultValue={arrayDefaultValuesCuartos[ac]}
                    order={this.state[juego.OPCIONES_DE_SELECCION] || [] }
                    CountriesByGroup={CountriesByGroup}
                    utilStructure={this.utilStruCuartos}
                    addGame={this.setNewPrediction}
                    game={juego}
                />
            );
        });
        return (
            <Card type="inner" title={'Fase de Cuartos'}>
                <List
                    bordered
                    dataSource={data}
                    locale={{ emptyText: 'Cargando paises, banderas y opciones. Por favor espera...' }}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </Card>
        );
    };
    renderSemiFinales = () => {
        const { CountriesByGroup, semiFinales } = this.props;
        const { arrayDefaultValuesSemiFinales } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        // array counter
        let ac = -1;
        const data = semiFinales.map((juego) => {
            ac++;
            return (
                <QuinielaGroups
                    key={juego.ID}
                    quinielaId={quinielaId}
                    userId={id}
                    defaultValue={arrayDefaultValuesSemiFinales[ac]}
                    order={this.state[juego.OPCIONES_DE_SELECCION] || [] }
                    CountriesByGroup={CountriesByGroup}
                    utilStructure={this.utilStruSemiFinal}
                    addGame={this.setNewPrediction}
                    game={juego}
                />
            );
        });
        return (
            <Card type="inner" title={'Fase de Semifinales'}>
                <List
                    bordered
                    dataSource={data}
                    locale={{ emptyText: 'Cargando paises, banderas y opciones. Por favor espera...' }}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </Card>
        );
    };
    renderTercer = () => {
        const { CountriesByGroup, tercer } = this.props;
        const { arrayDefaultValuesTercer } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        // array counter
        let ac = -1;
        const data = tercer.map((juego) => {
            ac++;
            return (
                <QuinielaGroups
                    key={juego.ID}
                    quinielaId={quinielaId}
                    userId={id}
                    defaultValue={arrayDefaultValuesTercer[ac]}
                    order={this.state[juego.OPCIONES_DE_SELECCION] || [] }
                    CountriesByGroup={CountriesByGroup}
                    utilStructure={this.utilStruTercero}
                    addGame={this.setNewPrediction}
                    game={juego}
                />
            );
        });
        return (
            <Card type="inner" title={'Tercer y Cuarto Lugar'}>
                <List
                    bordered
                    dataSource={data}
                    locale={{ emptyText: 'Cargando paises, banderas y opciones. Por favor espera...' }}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </Card>
        );
    };
    renderFinal = () => {
        const { CountriesByGroup, final } = this.props;
        const { arrayDefaultValuesFinal } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        // array counter
        let ac = -1;
        const data = final.map((juego) => {
            ac++;
            return (
                <QuinielaGroups
                    key={juego.ID}
                    quinielaId={quinielaId}
                    userId={id}
                    defaultValue={arrayDefaultValuesFinal[ac]}
                    order={this.state[juego.OPCIONES_DE_SELECCION] || [] }
                    CountriesByGroup={CountriesByGroup}
                    utilStructure={this.utilStruOctavos}
                    addGame={this.setNewPrediction}
                    game={juego}
                />
            );
        });
        return (
            <Card type="inner" title={'Final'}>
                <List
                    bordered
                    dataSource={data}
                    locale={{ emptyText: 'Cargando paises, banderas y opciones. Por favor espera...' }}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
            </Card>
        );
    };
    setFlag = flag => {
        // console.log('attention!!!');
        // console.log(flag);
        switch (flag) {
            case 1:
                return <Avatar src={one} />;
            case 2:
                return <Avatar src={two} />;
            case 3:
                return <Avatar src={three} />;
            default:
                return <Avatar src={avatar} />;
        }
    };
    _goDown() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    _goUp() {
        window.scrollTo(0, 600);
        // #newFunction
        document.body.scrollTop = 600;
        document.documentElement.scrollTop = 600;
        // #newFunction_end
    }
    // New stepper code
    handleNext = () => {
        this._goUp();
        this.setState(() => ({ step: this.state.step + 1 }));
    };
    // Check if 1th and 2th positions per Group
    checkGroups = () => {
        const { octavos } = this.props;
        const { A, B, C, D, E, F, G, H } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        const groupsID = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let error = false;

        /** #VALIDATOR1 **/
        const played = this.checkAlreadyPlayed('grupos');
        const playedCounter = played.playedCounter;
        /** VALIDATOR **/
        _.each(groupsID, groupId => {
            const positionTable = this.state[groupId];
            if (_.isEmpty(positionTable)) {
                /** #VALIDATOR2 **/
                const isPlayed = _.findIndex(played.totalPlayedPerStru, playedGame => {
                    return playedGame.group === groupId;
                });
                if (isPlayed === -1) {
                    message.error('Aún no hay ganadores definidos para el grupo: ' + groupId);
                    error = true;
                    return;
                }
                /** END VALIDATOR **/
            }
            if(positionTable.length < 2) {
                /** #VALIDATOR2 **/
                const isPlayed = _.findIndex(played.totalPlayedPerStru, playedGame => {
                    return playedGame.group === groupId;
                });
                if (isPlayed === -1) {
                    message.error('No hay segundo puesto para el grupo ' + groupId);
                    error = true;
                    return;
                }
                /** END VALIDATOR **/
            }
        });
        if(!error) {
            this.handleNext();
            // Default positions
            const arrayDefaultValues = [
                { optionLeft: A[0] && A[0].countryId, optionRight: B[1] && B[1].countryId },
                { optionLeft: C[0] && C[0].countryId, optionRight: D[1] && D[1].countryId },
                { optionLeft: E[0] && E[0].countryId, optionRight: F[1] && F[1].countryId },
                { optionLeft: G[0] && G[0].countryId, optionRight: H[1] && H[1].countryId },
                { optionLeft: B[0] && B[0].countryId, optionRight: A[1] && A[1].countryId },
                { optionLeft: D[0] && D[0].countryId, optionRight: C[1] && C[1].countryId },
                { optionLeft: F[0] && F[0].countryId, optionRight: E[1] && E[1].countryId },
                { optionLeft: H[0] && H[0].countryId, optionRight: G[1] && G[1].countryId }
            ];
            const octavosGames = {};
            // array counter
            let ac = -1;
            _.map(octavos, juego => {
                ac++;
                // add by default the games prediction to octavos
                octavosGames[juego.ID] = {
                    JUEGO: juego.ID,
                    QUINIELA: quinielaId,
                    USUARIO: id,
                    GOL_1: 0,
                    GOL_2: 0,
                    JUEGO_1: arrayDefaultValues[ac].optionLeft,
                    JUEGO_2: arrayDefaultValues[ac].optionRight
                };
            });
            const gamesCopy = this.state.games;
            const games = {...gamesCopy, ...octavosGames};
            /** #VALIDATOR3 **/
            this.setState(() => ({ arrayDefaultValues, games, playedCounter }));
        }
    };
    checkOctavos = () => {
        const { cuartos } = this.props;
        const { a8, b8, c8, d8, e8, f8, g8, h8 } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        const groupsID = [ 'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'];
        let error = false;
        let i = 0;
        /** #VALIDATOR1 **/
        const played = this.checkAlreadyPlayed('octavos');
        const playedCounter = played.playedCounter;
        /** VALIDATOR **/
        _.each(groupsID, groupId => {
            i++;
            const positionTable = this.state[groupId];
            if (_.isEmpty(positionTable)) {
                /** #VALIDATOR2 **/
                const isPlayed = _.findIndex(played.totalPlayedPerStru, playedGame => {
                    return playedGame.group === groupId;
                });
                if (isPlayed === -1) {
                    message.error('Aún no hay ganadores definidos para el juego: ' + i);
                    error = true;
                    return;
                }
                /** END VALIDATOR **/
            }
        });
        if(!error) {
            // Default positions
            const arrayDefaultValuesCuartos = [
                { optionLeft: a8[0] && a8[0].countryId || '', optionRight: b8[0] && b8[0].countryId || ''},
                { optionLeft: c8[0] && c8[0].countryId || '', optionRight: d8[0] && d8[0].countryId || ''},
                { optionLeft: e8[0] && e8[0].countryId || '', optionRight: f8[0] && f8[0].countryId || ''},
                { optionLeft: g8[0] && g8[0].countryId || '', optionRight: h8[0] && h8[0].countryId || ''}
            ];
            const cuartosGames = {};
            // array counter
            let ac = -1;
            _.map(cuartos, juego => {
                ac++;
                // add by default the games prediction to octavos
                cuartosGames[juego.ID] = {
                    JUEGO: juego.ID,
                    QUINIELA: quinielaId,
                    USUARIO: id,
                    GOL_1: 0,
                    GOL_2: 0,
                    JUEGO_1: arrayDefaultValuesCuartos[ac].optionLeft,
                    JUEGO_2: arrayDefaultValuesCuartos[ac].optionRight
                };
            });
            console.log('setstate');
            const gamesCopy = this.state.games;
            const games = {...gamesCopy, ...cuartosGames};
            /** #VALIDATOR3 **/
            this.setState(() => ({ arrayDefaultValuesCuartos, games, playedCounter }), () => {
                console.log('arrayDefaultValuesCuartos state');
                this.handleNext();
            });
        }
    };
    checkCuartos = () => {
        const { semiFinales } = this.props;
        const { a4, b4, c4, d4 } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        const groupsID = [ 'a4', 'b4', 'c4', 'd4'];
        let error = false;
        let i = 0;
        /** #VALIDATOR1 **/
        const played = this.checkAlreadyPlayed('cuartos');
        const playedCounter = played.playedCounter;
        /** VALIDATOR **/
        _.each(groupsID, groupId => {
            i++;
            const positionTable = this.state[groupId];
            if (_.isEmpty(positionTable)) {
                /** #VALIDATOR2 **/
                const isPlayed = _.findIndex(played.totalPlayedPerStru, playedGame => {
                    return playedGame.group === groupId;
                });
                if (isPlayed === -1) {
                    message.error('Aún no hay ganadores definidos para el juego: ' + i);
                    error = true;
                    return;
                }
                /** END VALIDATOR **/
            }
        });
        if(!error) {
            // Default positions
            const arrayDefaultValuesSemiFinales = [
                { optionLeft: a4[0] && a4[0].countryId || '', optionRight: b4[0] && b4[0].countryId || ''},
                { optionLeft: c4[0] && c4[0].countryId || '', optionRight: d4[0] && d4[0].countryId || '' }
            ];
            const cuartosGames = {};
            // array counter
            let ac = -1;
            _.map(semiFinales, juego => {
                ac++;
                // add by default the games prediction to octavos
                cuartosGames[juego.ID] = {
                    JUEGO: juego.ID,
                    QUINIELA: quinielaId,
                    USUARIO: id,
                    GOL_1: 0,
                    GOL_2: 0,
                    JUEGO_1: arrayDefaultValuesSemiFinales[ac].optionLeft,
                    JUEGO_2: arrayDefaultValuesSemiFinales[ac].optionRight
                };
            });
            /** #VALIDATOR3 **/
            const gamesCopy = this.state.games;
            const games = {...gamesCopy, ...cuartosGames};
            this.setState(() => ({ arrayDefaultValuesSemiFinales, games, playedCounter }), () => {
                this.handleNext();
            });
        }
    };
    checkSemiFinal = () => {
        const { tercer } = this.props;
        const { a2, b2 } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        const groupsID = [ 'a2', 'b2' ];
        let error = false;
        let i = 0;
        /** #VALIDATOR1 **/
        const played = this.checkAlreadyPlayed('semiFinales');
        const playedCounter = played.playedCounter;
        /** VALIDATOR **/
        _.each(groupsID, groupId => {
            i++;
            const positionTable = this.state[groupId];
            if (_.isEmpty(positionTable)) {
                /** #VALIDATOR2 **/
                const isPlayed = _.findIndex(played.totalPlayedPerStru, playedGame => {
                    return playedGame.group === groupId;
                });
                if (isPlayed === -1) {
                    message.error('Aún no hay ganadores definidos para el juego: ' + i);
                    error = true;
                    return;
                }
                /** END VALIDATOR **/
            }
        });
        if(!error) {
            // Default positions
            const arrayDefaultValuesTercer = [
                { optionLeft: a2[0] && a2[0].loserId || '', optionRight: b2[0] && b2[0].loserId || '' }
            ];
            const tercerGames = {};
            // array counter
            let ac = -1;
            _.map(tercer, juego => {
                ac++;
                // add by default the games prediction to octavos
                tercerGames[juego.ID] = {
                    JUEGO: juego.ID,
                    QUINIELA: quinielaId,
                    USUARIO: id,
                    GOL_1: 0,
                    GOL_2: 0,
                    JUEGO_1: arrayDefaultValuesTercer[ac].optionLeft,
                    JUEGO_2: arrayDefaultValuesTercer[ac].optionRight
                };
            });
            const gamesCopy = this.state.games;
            const games = {...gamesCopy, ...tercerGames};
            /** #VALIDATOR3 **/
            this.setState(() => ({ arrayDefaultValuesTercer, games, playedCounter }), () => {
                this.handleNext();
            });
        }
    };
    checkTercer = () => {
        const { final } = this.props;
        const { a2, b2 } = this.state;
        const { params } = this.props.match;
        const { quinielaId } = params;
        const id = localStorage.getItem('PrensaUserId');

        const groupsID = [ 'ter' ];
        let error = false;
        let i = 0;
        /** #VALIDATOR1 **/
        const played = this.checkAlreadyPlayed('tercer');
        const playedCounter = played.playedCounter;
        /** VALIDATOR **/
        _.each(groupsID, groupId => {
            i++;
            const positionTable = this.state[groupId];
            if (_.isEmpty(positionTable)) {
                /** #VALIDATOR2 **/
                const isPlayed = _.findIndex(played.totalPlayedPerStru, playedGame => {
                    return playedGame.group === groupId;
                });
                if (isPlayed === -1) {
                    message.error('Aún no hay ganadores definidos para el juego: ' + i);
                    error = true;
                    return;
                }
                /** END VALIDATOR **/
            }
        });
        if(!error) {
            // Default positions
            const arrayDefaultValuesFinal = [
                { optionLeft: a2[0] && a2[0].countryId || '', optionRight: b2[0] && b2[0].countryId || '' }
            ];
            const finalGames = {};
            // array counter
            let ac = -1;
            _.map(final, juego => {
                ac++;
                // add by default the games prediction to octavos
                finalGames[juego.ID] = {
                    JUEGO: juego.ID,
                    QUINIELA: quinielaId,
                    USUARIO: id,
                    GOL_1: 0,
                    GOL_2: 0,
                    JUEGO_1: arrayDefaultValuesFinal[ac].optionLeft,
                    JUEGO_2: arrayDefaultValuesFinal[ac].optionRight
                };
            });
            const gamesCopy = this.state.games;
            const games = {...gamesCopy, ...finalGames};
            /** #VALIDATOR3 **/
            this.setState(() => ({ arrayDefaultValuesFinal, games, playedCounter }), () => {
                this.handleNext();
            });
        }
    };
    checkFinal = () => {
        this.savePrediction();
    };
    reset = () => {
        this._goDown();
        this.setState(() => ({ ...initialState }));
    };
    ResetButton = () => (
        <Button onClick={this.reset} style={{ background: '#454545', border: '#454545' }} type="primary" size="large">
            Comenzar de nuevo
        </Button>
    );
    renderSteps = () => {
        const {step} = this.state;

        switch (step) {
            case 0:
                return(
                    <div>
                        <Row>
                            { this.renderGroupGames() }
                            <Col>
                                <Button onClick={this.checkGroups} type="primary" size="large">
                                    Ir a octavos<Icon type="right" />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                );
            case 1:
                return(
                    <div>
                        <Row>
                            { this.renderOctavos() }
                            <ButtonGroup>
                                {this.ResetButton()}
                                <Button onClick={this.checkOctavos} type="primary" size="large">
                                    Ir a cuartos<Icon type="right" />
                                </Button>
                            </ButtonGroup>
                        </Row>
                    </div>
                );
            case 2:
                return(
                    <div>
                        <Row>
                            { this.renderCuartos() }
                            <ButtonGroup>
                                {this.ResetButton()}
                                <Button onClick={this.checkCuartos} type="primary" size="large">
                                    ir a semi-finales<Icon type="right" />
                                </Button>
                            </ButtonGroup>
                        </Row>
                    </div>
                );
            case 3:
                return(
                    <div>
                        <Row>
                            { this.renderSemiFinales() }
                            <ButtonGroup>
                                {this.ResetButton()}
                                <Button onClick={this.checkSemiFinal} type="primary" size="large">
                                    ir a tercero<Icon type="right" />
                                </Button>
                            </ButtonGroup>
                        </Row>
                    </div>
                );
            case 4:
                return(
                    <div>
                        <Row>
                            { this.renderTercer() }
                            <ButtonGroup>
                                {this.ResetButton()}
                                <Button onClick={this.checkTercer} type="primary" size="large">
                                    ir a final<Icon type="right" />
                                </Button>
                            </ButtonGroup>
                        </Row>
                    </div>
                );
            case 5:
                return(
                    <div>
                        <Row>
                            { this.renderFinal() }
                            <ButtonGroup>
                                {this.ResetButton()}
                                <Button onClick={this.checkFinal} type="primary" size="large">
                                    Colocar Quiniela<Icon type="right" />
                                </Button>
                            </ButtonGroup>
                        </Row>
                    </div>
                );
            default:
                return(
                    <div style={{ margin: '24px 0', padding: '25px' }}>
                        Has ido demasiado lejos!! :O
                    </div>
                );
        }
    };
    // End of new stepper code
    render() {
        const {
            quiniela,
            error,
            user,
            predictionsByUsers,
            quinielaPositions
        } = this.props;
        const { api_token } = user;
        const { userId } = this.state;
        const { getFieldDecorator } = this.props.form;
        const quinielaPositionsFilter = _.orderBy(quinielaPositions, ['PUNTOS'], ['desc'] );
        const quinielaPositionsArray = _.map(quinielaPositionsFilter, position => ({...position}));

        // Check if is valid token
        if (api_token === 'Token invalido') {
            this.updateToken();
        }

        // Invitations arrays
        const invitationsTypes = [
            { propName: 'sendInvitations', human: 'Enviadas', text: 'enviadas'},
            { propName: 'refusedInvitations', human: 'Rechazadas', text: 'rechazadas'},
            { propName: 'acceptedInvitations', human: 'Aceptadas', text: 'aceptadas'},
        ];
        const invitations = {};
        _.chain(invitationsTypes)
            .each(item => {
                invitations[item.propName] = {
                    invitation: _.uniqBy(this.props[item.propName], 'USUARIO.CORREO'),
                    human: item.human,
                    text: item.text
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
        const operations = <a onClick={this.showDeleteConfirm} style={{ padding: 20 }} type="dashed">Eliminar quiniela</a>;
        let i = 2; // to have the control of dynamic tab keys
        let x = 0; // to have the control of dynamic tab keys
        return (
            <div>
                <CardMedia
                    className={'banner'}
                    overlay={<CardTitle
                        title={quiniela.NOMBRE || 'cargando...' }
                        subtitle={quiniela.DESCRIPCION || 'cargando descripción...' }
                    />}
                >
                    <img src={bannerSource} alt="" />
                </CardMedia>
                <Card style={{ width: '100%' }}>
                    <Tabs
                        defaultActiveKey="1"
                        tabBarExtraContent={quiniela.CREADO_POR === userId ? operations : ''}
                    >
                        <TabPane tab={<span><Icon type="profile" />Mi predicción</span>} key="1">
                        {_.isEmpty(predictionsByUsers) ? (
                            <Card>
                                <Alert
                                    message="Completa tu quiniela"
                                    description="Para comenzar a participar en esta quiniela ingresa todas tus predicciones para cada una de las fases del mundial, nosotros actualizaremos los resultados de los partidos conforme vayan sucediendo. Ingresa constantemente a esta quiniela y descubre tu lugar en la tabla de posiciones."
                                    type="info"
                                    showIcon
                                />
                                <br />
                                <Steps current={this.state.step}>
                                    <Step title="Fase de Grupos" />
                                    <Step title="Fase de Octavos" />
                                    <Step title="Fase de Cuartos" />
                                    <Step title="Semifinales" />
                                    <Step title="Tercer y Cuarto lugar" />
                                    <Step title="Final" />
                                </Steps>
                                {this.renderSteps()}
                            </Card>
                        ) : (
                            <div>
                                <Alert
                                    message="¡Felicitaciones!"
                                    description="Ya estás participando en esta quiniela. Actualizaremos los resultados reales después de cada partido, consulta tus puntos y tu lugar en la tabla de posiciones conforme se vayan jugando los partidos."
                                    type="success"
                                    showIcon
                                />
                                <br />
                                    { this.renderMyPrediction() }
                            </div>
                            )
                        }
                        </TabPane>
                        <TabPane tab={<span><Icon type="user-add" />Invitaciones</span>} key="2">
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab="Invitar" key="1">
                                    <div style={{ margin: '24px 0' }} />
                                    <Form onSubmit={this.sendInvitation} className="login-form">
                                        <FormItem>
                                            <span>Ingresa los correos electrónicos separados por coma.</span>
                                            {getFieldDecorator('emailStrings', {
                                                rules: [{required: true, message: 'Por favor ingresa los correos electrónicos'}],
                                            })(<Input placeholder="Ingresa los correos electrónicos" />)}
                                        </FormItem>
                                        <FormItem>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                icon="mail"
                                                size="large"
                                                onClick={this.sendInvitation}
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
                                                locale={{ emptyText: 'Aún no hay invitaciones ' + invitation.text }}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src={avatar} />}
                                                            title={item.USUARIO.CORREO || 'Nombre no disponible'}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </TabPane>
                                    );
                                })}
                            </Tabs>
                        </TabPane>
                        <TabPane tab={<span className={'posiciones'}><Icon type="trophy" />Posiciones </span>} key="3">
                            <List
                                itemLayout="horizontal"
                                dataSource={quinielaPositionsArray}
                                renderItem={item => {
                                    x++;
                                    return (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={this.setFlag(x)}
                                                title={'Posición ' + x + ': ' + item.NOMBRE}
                                                description={'Puntos: ' + item.PUNTOS}
                                            />
                                        </List.Item>
                                    );
                                }}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
                <Button
                    onClick={this._goUp}
                    style={UpStyle}
                    size="large"
                    type="primary"
                    icon="up"
                />
                <Button
                    onClick={this._goDown}
                    style={DownStyle}
                    size="large"
                    type="primary"
                    icon="down"
                />
            </div>
        );
    }
}
QuinielaGame.propTypes = {
    history: React.PropTypes.object.isRequired,
    match: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    quiniela: React.PropTypes.object.isRequired,
    error: React.PropTypes.bool.isRequired,
    grupos: React.PropTypes.array.isRequired,
    octavos: React.PropTypes.array.isRequired,
    cuartos: React.PropTypes.object.isRequired,
    tercer: React.PropTypes.object.isRequired,
    semiFinales: React.PropTypes.object.isRequired,
    final: React.PropTypes.object.isRequired,
    postSuccesfull: React.PropTypes.bool.isRequired,
    CountriesByGroup: React.PropTypes.array.isRequired,
    refusedInvitations: React.PropTypes.array.isRequired,
    acceptedInvitations: React.PropTypes.array.isRequired,
    sendInvitations: React.PropTypes.array.isRequired,
    quinielaPositions: React.PropTypes.array.isRequired,
    predictionsByUsers: React.PropTypes.object.isRequired,
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
        quinielaPositions: state.game.quinielaPositions,
        postSuccesfull: state.game.postSuccesfull,
        sendInvitations: state.quiniela.sendInvitations,
        grupos: state.game.grupos,
        octavos: state.game.octavos,
        cuartos: state.game.cuartos,
        predictionsByUsers: state.game.predictionsByUsers,
        semiFinales: state.game.semiFinales,
        tercer: state.game.tercer,
        final: state.game.final,
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginFunction: login,
            getStructures: getQuinielaStructures,
            getQuinielaInfo: getQuiniela,
            getPredictionsPerUserActions: getPredictionsPerUser,
            DeleteQuinielaAction: deleteQuiniela,
            sendPredictionAction: sendPrediction,
            getQuinielaPositionsActions: getQuinielaPositions,
            inviteToQuiniela: sendQuinielaInvitations,
            getByGroup: getGroupList,
            getAllQuinielaInvitations: getInivtationsById,
            getAllGamesByGroupsAction: getAllGamesByGroups
        }, dispatch)
    };
}
const ShowTheLocationWithRouter = withRouter(QuinielaGame);

const WithRouterWithForm = Form.create()(ShowTheLocationWithRouter);

export default connect(mapStateToProps, mapDispatchToProps)(WithRouterWithForm);


