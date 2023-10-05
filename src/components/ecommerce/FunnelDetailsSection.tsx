import { Row, Col, Card, Statistic, Empty } from 'antd';
import { useEffect, useState } from 'react';

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

    return (
        <section style={{ marginBottom: 48, padding: 16 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>
            <Card>
                <Empty description='Missing implementation' />
                <p class='Hello'> Where are we going with this? </p>
                <li> Can you see this? </li>
                <li> Num of Sessions: {numSessions}</li>
                <li> Num of Views: {numProductViews}</li>
                <li> Num of Checkouts: {numCheckouts}</li>
                <li> Num of Purchases: {numPurchases}</li>
            </Card>
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
        </section>
    );
}