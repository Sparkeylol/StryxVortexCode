import Image from 'next/image'
import { Row, Col, Card } from 'react-bootstrap'
import Link from 'next/link'
import { Component } from 'react'

export default class Server extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <Row style={{ marginBottom: '48px' }}>
                <Col style={{ height: "75px", width: "100%" }}>
                    <Link href={"/servers/"+this.props.id+"/general"}>
                        <Card>
                            <Card.Body style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <Image src={this.props.image} className="roundedImage" width="70px" height="70px"/>
                                <h1 style={{ marginLeft: "8px", fontSize: "28px", fontWeight: 600 }}>{this.props.serverName}</h1>
                            </Card.Body>
                        </Card>        
                    </Link>
                </Col>
            </Row>
        </>
    }
}