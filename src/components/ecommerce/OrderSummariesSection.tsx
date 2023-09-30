import { Row, Col, Card, Statistic } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
    numSessions: number;
    numPurchases: number;
    numDollarRevenue: number;
}

export default function OrderSummariesSection(): React.ReactNode {
    const [orderDetails, setOrderDetails] = useState<Props | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const numSessions = orderDetails?.numSessions ?? 0;
    const numPurchases = orderDetails?.numPurchases ?? 0;
    const numDollarRevenue = orderDetails?.numDollarRevenue ?? 0;
    
    useEffect(
        () => {
            fetch('/api/ecommerce/order-summaries', { cache: 'no-cache' })
                .then(res => res.json())
                .then(data => {
                    setOrderDetails({
                        numSessions: data.num_sessions,
                        numPurchases: data.num_purchases,
                        numDollarRevenue: data.num_dollar_revenue,
                    });
                })
                .finally(() => setIsLoading(false));
        },
        []
    );
    
    return (
        <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Order Summaries</h2>
            <Row gutter={16}>
                <Col span={6}>
                    <Card 
                        bordered={false} 
                        loading={isLoading}
                    >
                        <Statistic
                            precision={0}
                            title='Sessions'
                            value={numSessions}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card 
                        bordered={false} 
                        loading={isLoading}
                    >
                        <Statistic
                            title='Purchases'
                            value={numPurchases}
                            precision={0}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card 
                        bordered={false} 
                        loading={isLoading}
                    >
                        <Statistic
                            title='Revenue'
                            value={numDollarRevenue}
                            precision={2}
                            prefix='$'
                        />
                    </Card>
                </Col>
            </Row>
        </section>
    );
}