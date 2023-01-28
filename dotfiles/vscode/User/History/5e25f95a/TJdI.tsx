const Slideshow = () => {
  return (
    <SlideshowKaksi
      variant={V}
      items={slideShowImages.map((image) => ({
        originalSrc: image.originalSrc,
        responsiveWidths: [800, 600, 400],
        alt: image?.alt ?? '',
        content: () => null,
      }))}
      onNavNext={(index) => handleSlideshowNext(index, asPath)}
      onNavPrev={(index) => handleSlideshowPrev(index, asPath)}
    />
  );
};

export default Slideshow;
