import { getCatById } from '@/lib/woocommerce';

export async function GET(request, { params }) {
  try {
    const cat = await getCatById(params.id);
    return Response.json(cat);
  } catch (error) {
    console.error('Error fetching cat:', error);
    return Response.json(
      { error: 'Cat not found' },
      { status: 404 }
    );
  }
}
