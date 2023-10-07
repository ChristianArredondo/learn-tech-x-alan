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
        <canvas class="funnel" ref={canvasRef} height={totalHeight}></canvas>
    );
}

function NumberFormatter({ number }) {
    const formattedNumber = number.toLocaleString();
    return <div>{formattedNumber}</div>;
}
  

export default function FunnelDetailsSection(): React.ReactNode {
    const [funnelDetails, setFunnelDetails] = useState<Props | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const numSessions = funnelDetails?.numSessions ?? 0;
    const numProductViews = funnelDetails?.numProductViews ?? 0;
    const numCheckouts = funnelDetails?.numCheckouts ?? 0;
    const numPurchases = funnelDetails?.numPurchases ?? 0;

    // variables needed to draw funnel
    //var heightSession = 0, heightProductViews = 0, heightCheckouts = 0, heightPurchases = 0;
    

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
                    // we default heights to be 200, and height proportional to nums
                    /*
                    const heightSession = 200;
                    const heightProductViews = heightSession * ( numProductViews / numSessions)    
                    const heightCheckouts = heightProductViews * (numCheckouts / numProductViews) 
                    const heightPurchases = heightCheckouts * (numPurchases / numCheckouts)
                    debugger
                    console.log(heightCheckouts,heightPurchases)
                    */
                })
                .finally(() => setIsLoading(false));
        },
        []
    );
    
    if (isLoading || !funnelDetails) {
        return null;
    }
  
    // calculate heights of funnel sections
    const heightSession = 200;
    const heightProductViews = heightSession * (numProductViews / numSessions);
    const heightCheckouts = heightProductViews * (numCheckouts / numProductViews);
    const heightPurchases = heightCheckouts * (numPurchases / numCheckouts);

    return (
        <section style={{ marginBottom: 48, padding: 16 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>
            <Row>
                <Col span={6}>
                    <Card 
                        bordered={false} 
                        loading={isLoading}
                        bodyStyle={{ padding: 0 }}
                    >            
                        <p class="funnel-title">Sessions</p>
                        <div style={{color: blue[8]}}>
                            <p class="funnel-content"><NumberFormatter number={numSessions} /></p>
                            <p class="funnel-content"> </p>
                        </div>
                        <br></br>
                        <br></br>
                        <FunnelComponent blueIndex={8} totalHeight={200} leftHeight={heightSession} rightHeight={heightSession}/>
                        <p class="funnel-footnote"></p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        bordered={false} 
                        loading={isLoading}
                        bodyStyle={{ padding: 0 }}
                    >
                        <p class="funnel-title">Product Views</p>
                        <div style={{color: blue[6]}}>
                            <p class="funnel-content"><NumberFormatter number={numProductViews} /></p>
                            <p class="funnel-content">({(( numProductViews / numSessions) * 100).toFixed(1)}%)</p>
                        </div>
                        <br></br>
                        <br></br>
                        <FunnelComponent blueIndex={6} totalHeight={200} leftHeight={heightSession} rightHeight={heightProductViews}/>
                        <p class="funnel-footnote"></p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                         bordered={false} 
                         loading={isLoading}
                         bodyStyle={{ padding: 0 }}
                    >
                        <p class="funnel-title">Checkouts</p>
                        <div style={{color: blue[4]}}>
                            <p class="funnel-content"><NumberFormatter number={numCheckouts} /></p>
                            <p class="funnel-content">({(( numCheckouts / numProductViews) * 100).toFixed(1)}%)</p>
                        </div>
                        <br></br>
                        <br></br>
                        <FunnelComponent blueIndex={4} totalHeight={200} leftHeight={heightProductViews} rightHeight={heightCheckouts}/>
                        <p class="funnel-footnote"></p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        bordered={false} 
                        loading={isLoading}
                        bodyStyle={{ padding: 0 }}
                    >
                        <p class="funnel-title">Purchases</p>
                        <div style={{color: blue[3]}}>
                            <p class="funnel-content"><NumberFormatter number={numPurchases} /></p>
                            <p class="funnel-content">({(( numPurchases / numCheckouts) * 100).toFixed(1)}%)</p>
                        </div>
                        <br></br>
                        <br></br>
                        <FunnelComponent blueIndex={3} totalHeight={200} leftHeight={heightCheckouts} rightHeight={heightPurchases}/>
                        <p class="funnel-footnote">Net: {(( numPurchases / numSessions) * 100).toFixed(1)}%</p>
                    </Card>
                </Col>
            </Row>
        </section>
    );
}