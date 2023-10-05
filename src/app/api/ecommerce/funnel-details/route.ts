import EntityCommerceUserEventService from '@/services/ecommerce/EntityCommerceUserEventService';
import { NextResponse } from 'next/server';

const commerceUserEventService = new EntityCommerceUserEventService();

export async function GET(): Promise<NextResponse> {
    const numSessions = await commerceUserEventService.genNumRecentEventByType('session');
    const numProductViews = await commerceUserEventService.genNumRecentEventByType('product_view');
    const numCheckouts = await commerceUserEventService.genNumRecentEventByType('checkout');
    const numPurchases = await commerceUserEventService.genNumRecentEventByType('purchase');
    
    return NextResponse.json({
        num_sessions: numSessions,
        num_checkouts: numCheckouts,
        num_product_views: numProductViews,
        num_purchases: numPurchases
    });
}