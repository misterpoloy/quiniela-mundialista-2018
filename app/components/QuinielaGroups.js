import React from 'react';
import {Button, Icon, Badge, Row, Col} from 'antd';
const ButtonGroup = Button.Group;
import Flag from 'react-world-flags'; // Flags

const style = {
    margin: '5px',
    width: 38,
    borderRadius: 5
};


class QuinielaGroups extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            count2: 0,
            show: true,
        };
    }
    increase = () => {
        const count = this.state.count + 1;
        this.setState({ count });
    }

    decline = () => {
        let count = this.state.count - 1;
        if (count < 0) {
            count = 0;
        }
        this.setState({ count });
    }
    // Country 2
    increase2 = () => {
        const count2 = this.state.count2 + 1;
        this.setState({ count2 });
    }

    decline2 = () => {
        let count2 = this.state.count2 - 1;
        if (count2 < 0) {
            count2 = 0;
        }
        this.setState({ count2 });
    }
    render() {
        return (
                <div style={{ width: '100%' }}>
                    <Row>
                        <Col span={8}>
                            <label style={style}>{this.props.country1.name}</label>
                        </Col>
                        <Col span={8} offset={5}>
                            <label style={style}>{this.props.country2.name}</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <ButtonGroup>
                                <Button onClick={this.decline}>
                                    <Icon type="minus" />
                                </Button>
                                <Button onClick={this.increase}>
                                    <Icon type="plus" />
                                </Button>
                            </ButtonGroup>
                            <Flag style={style} code={this.props.country1.code} height="20" />
                            <Badge showZero count={this.state.count} />
                        </Col>
                        <Col span={2} offset={3}>
                            <h1 style={{ color: '#d6d6d6' }}>VS</h1>
                        </Col>
                        <Col span={6} offset={2}>
                            <ButtonGroup>
                                <Button onClick={this.decline2}>
                                    <Icon type="minus" />
                                </Button>
                                <Button onClick={this.increase2}>
                                    <Icon type="plus" />
                                </Button>
                            </ButtonGroup>
                            <Flag style={style} code={this.props.country2.code} height="20" />
                            <Badge showZero count={this.state.count2} />
                        </Col>
                    </Row>
                </div>

        );
    }
}
QuinielaGroups.propTypes = {
    country1: React.PropTypes.object.isRequired,
    country2: React.PropTypes.object.isRequired
};
export default QuinielaGroups;
