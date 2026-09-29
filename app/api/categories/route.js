import { getCatBreeds } from '@/lib/woocommerce';

export async function GET() {
  try {
    const breeds = await getCatBreeds();
    return Response.json(breeds);
  } catch (error) {
    console.error('Error fetching breeds:', error);
    return Response.json(
      { error: 'Failed to fetch breeds' },
      { status: 500 }
    );
  }
}
