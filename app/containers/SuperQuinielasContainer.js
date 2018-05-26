import React from 'react';
import { Layout } from 'antd'; // Ant Styles
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import bannerSource from '../src/images/banner.jpeg';
import {Card as CardAnt, List, Avatar} from 'antd';


const data = [
    {
        title: '1er lugar',
    },
    {
        title: '2do Lugar',
    },
    {
        title: '3er Lugar',
    }
];

const tabList = [{
    key: 'tab1',
    tab: 'Información',
}, {
    key: 'tab2',
    tab: 'Premios',
}];

const contentList = {
    tab1:
        <div>
            <h3>Instrucciones</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu tristique mi. Maecenas nec ligula blandit, venenatis nisi a, accumsan augue. Quisque porttitor elit vel urna rutrum ornare sed sed odio. Donec posuere sem sed velit vulputate, non laoreet mauris lobortis. Nunc varius nulla nec neque sodales tristique pulvinar et velit. Aliquam ut lorem massa. Curabitur feugiat hendrerit justo et elementum. Donec varius magna vel consectetur feugiat.</p>
            <p>Vivamus porttitor eleifend ipsum, id commodo eros sagittis vel. Nullam eu lectus nec eros elementum aliquam. Suspendisse auctor porta nisi, quis ultricies turpis feugiat vel. Fusce fermentum nulla commodo, hendrerit velit non, mattis quam. Ut vitae ipsum a libero scelerisque consequat. Vestibulum eu diam in lorem mollis varius vitae quis risus. Morbi id condimentum ante. In bibendum dui purus, in tincidunt dolor interdum ac.</p>
        </div>,
    tab2: <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src="https://cdn0.iconfinder.com/data/icons/sport-balls/128/cup.png"/>}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED"
                />
            </List.Item>
        )}
    />,
};

class SuperQuiniela extends React.Component {
    constructor() {
        super();
        this.state = {
            key: 'tab1',
            noTitleKey: 'article',
        };
    }
    onTabChange = (key, type) => {
        this.setState({[type]: key});
    };
    render() {
        return (
            <div>
                <Layout>
                    <Card>
                        <CardHeader style={{marginTop: 110, width: '100%'}}
                            title="Clarlo"
                            subtitle="Super quiniela"
                            avatar="https://upload.wikimedia.org/wikipedia/commons/0/0c/Claro.svg"
                        />
                        <CardMedia
                            className={'banner'}
                            overlay={<CardTitle title="¡Participa en la Super Quiniela!" subtitle="Participa en muchos premios" />}
                        >
                            <img src={bannerSource} alt="" />
                        </CardMedia>
                        <CardTitle title="Reglas" subtitle="detalles de la quiniela" />
                        <div>
                            <CardAnt
                                style={{width: '100%'}}
                                tabList={tabList}
                                onTabChange={(key) => {
                                    this.onTabChange(key, 'key');
                                }}
                            >
                                {contentList[this.state.key]}
                            </CardAnt>
                        </div>
                        <CardActions>
                            <FlatButton label="Facebook" />
                            <FlatButton label="Correo" />
                        </CardActions>
                    </Card>
                </Layout>
            </div>
        );
    }
}

export default SuperQuiniela;
