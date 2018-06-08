import React, { Component } from 'react';


class RuleCreate extends Component {

    constructor(props){
        super(props);

    }

    render(){
        <Row>
            <Col xs="12">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <Row>
                        <Col sm="4">
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="label">Name</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="text" id="label" name="label" placeholder="Add a name for your rule" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="label">Description</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="textarea" id="description" name="description" placeholder="Add a description for your rule" />
                                </Col>
                            </FormGroup>
                        </Col>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Col sm="4">
                                <Card>
                                    <CardHeader>
                                        <strong>If...</strong>
                                    </CardHeader>
                                </Card>
                            </Col>
                        </DragDropContext>
                    </Row>
                </Form>
            </Col>
        </Row>
    }
}

export default RuleCreate;