import { getCats } from '@/lib/woocommerce';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '0';
    const limit = searchParams.get('limit') || '12';

    const cats = await getCats(parseInt(limit), parseInt(page));
    return Response.json(cats);
  } catch (error) {
    console.error('Error fetching cats:', error);
    return Response.json(
      { error: 'Failed to fetch cats' },
      { status: 500 }
    );
  }
}
