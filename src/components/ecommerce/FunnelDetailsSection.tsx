import { Row, Col, Card, Statistic, Empty } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { blue } from "@ant-design/colors";

/*
        num_sessions: numSessions,
        num_checkouts: numCheckouts,
        num_product_views: numProductViews,
        num_purchases: numPurchases
*/
interface Props {
    numSessions: number;
    numProductViews: number;
    numCheckouts: number;
    numPurchases: number;
}

interface FunnelProp {
    blueIndex: number;
    totalHeight: number;
    leftHeight: number;
    rightHeight: number;
  }
// This draws a canvas of totalHeight, with a trazepoid with base leftHeight to the left
// and top rightHeight to the right, fill to the blueIndex color

// 0, total height => tH - lH / 2, th+lH/2, 
const FunnelComponent: React.FC<FunnelProp> = ({ blueIndex, totalHeight, leftHeight, rightHeight }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.parentElement.offsetWidth;

        
        ctx.beginPath();
        ctx.moveTo(0, ( totalHeight - leftHeight) / 2);
        ctx.lineTo(width, (totalHeight - rightHeight) / 2);
        ctx.lineTo(width, (totalHeight + rightHeight) / 2);
        ctx.lineTo(0, (totalHeight + leftHeight) / 2);
        ctx.fillStyle = blue[blueIndex];
        ctx.fill();
    }, []);

    // NTS: interestingly if I add width below here, it is not defined
    return (
        <canvas class="rect" ref={canvasRef} height={totalHeight}></canvas>
    );
}

export default function FunnelDetailsSection(): React.ReactNode {
    const [funnelDetails, setFunnelDetails] = useState<Props | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const numSessions = funnelDetails?.numSessions ?? 0;
    const numProductViews = funnelDetails?.numProductViews ?? 0;
    const numCheckouts = funnelDetails?.numCheckouts ?? 0;
    const numPurchases = funnelDetails?.numPurchases ?? 0;

    useEffect(
        () => {
            fetch('/api/ecommerce/funnel-details', { cache: 'no-cache' })
                .then(res => res.json())
                .then(data => {
                    setFunnelDetails({
                        numSessions: data.num_sessions,
                        numProductViews: data.num_product_views,
                        numCheckouts: data.num_checkouts,
                        numPurchases: data.num_purchases,
                    });
                })
                .finally(() => setIsLoading(false));
        },
        []
    );

    /* Funnel function design
    <Funnel {} />
    */


    return (
        <section style={{ marginBottom: 48, padding: 16 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>
            {/*}    
            <Card>
                <Empty description='Missing implementation' />
                <p class='Hello'> Where are we going with this? </p>
                <li> Can you see this? </li>
                <li> Num of Sessions: {numSessions}</li>
                <li> Num of Views: {numProductViews}</li>
                <li> Num of Checkouts: {numCheckouts}</li>
                <li> Num of Purchases: {numPurchases}</li>
            </Card>
            */}

            <Row>
                <Col span={6}>
                    <Card 
                        bordered={false} 
                        loading={isLoading}
                        bodyStyle={{ padding: 0 }}
                    >
                        <Statistic
                            title='Sessions'
                            value={numSessions}
                            precision={0}
                        />
                        
                        <br></br>
                        <br></br>
                        <FunnelComponent blueIndex={8} totalHeight={200} leftHeight={120} rightHeight={80}/>
                        
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        bordered={false} 
                        loading={isLoading}
                        bodyStyle={{ padding: 0 }}
                    >
                        <Statistic
                            title='Product Views'
                            value={numProductViews}
                            precision={0}
                        />
                        <br></br>
                        <br></br>
                        <FunnelComponent blueIndex={6} totalHeight={200} leftHeight={80} rightHeight={40}/>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                         bordered={false} 
                         loading={isLoading}
                         bodyStyle={{ padding: 0 }}
                    >
                        <Statistic
                            title='Checkouts'
                            value={numCheckouts}
                            precision={0}
                        />
                        <br></br>
                        <br></br>
                        <FunnelComponent blueIndex={4} totalHeight={200} leftHeight={40} rightHeight={30}/>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        bordered={false} 
                        loading={isLoading}
                        bodyStyle={{ padding: 0 }}
                    >
                        <Statistic
                            title='Purchases'
                            value={numPurchases}
                            precision={0}
                        />
                        <br></br>
                        <br></br>
                        <FunnelComponent blueIndex={2} totalHeight={200} leftHeight={30} rightHeight={10}/>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title='Purchases'
                            value={numPurchases}
                            precision={0}
                        />
                    </Card>
                </Col>
            </Row>
        </section>
    );
}