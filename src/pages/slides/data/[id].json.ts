import { getSlideById, getSlides } from '../../../lib/microcms';
import { renderSlideHtml } from '../../../lib/slideHtml';

export async function getStaticPaths() {
  const slides = await getSlides();
  return slides.map((slide) => ({
    params: { id: slide.id },
  }));
}

export async function GET({ params }: { params: { id: string } }) {
  const slide = await getSlideById(params.id);

  return new Response(
    JSON.stringify({
      id: slide.id,
      title: slide.title,
      slides: renderSlideHtml(slide.content || ''),
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
}
