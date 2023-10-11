import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";
import type { Data } from "../type/data";
import { SlideContent } from "./SlideContent";
import { useEffect, useState, useCallback } from "react";
const Wrap = styled.div`
  overflow: hidden;
  .embla__container {
    display: flex;
    column-gap: 10px;
    > div {
      flex: 0 0 70%;
      min-width: 0;
      &:first-child {
        margin-left: 10px;
      }
    }
  }

  a {
    color: #fff;
  }

  .embla__ui {
    margin-top: 16px;
    display: grid;
    grid-template-columns: 50px auto 50px;
  }

  .embla__dots {
    text-align: center;
  }

  .embla__dot {
    border-radius: 50%;
    color: transparent;
    &.embla__dot--selected {
      color: #000;
    }
  }
`;
export type Props = {
  data: Data[];
};
export const EmblaCarousel: React.FC<Props> = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    console.log(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);
  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    setSelectedIndex(0);
    emblaApi.scrollTo(0);
  }, [data]);

  return (
    <Wrap>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {data.map((item) => {
            return (
              <div key={item.id} className="embla__slide">
                <SlideContent
                  title={item.title}
                  img={item.img}
                  link={item.link}
                />
              </div>
            );
          })}
        </div>
      </div>
      {emblaApi && (
        <div className="embla__ui">
          <button
            className="embla__arrow embla__arrow--prev"
            onClick={scrollPrev}
          >
            prev
          </button>
          <div className="embla__dots">
            {Array.from({ length: data.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              >
                ●
              </button>
            ))}
          </div>
          <button
            className="embla__arrow embla__arrow--next"
            onClick={scrollNext}
          >
            next
          </button>
        </div>
      )}
    </Wrap>
  );
};
