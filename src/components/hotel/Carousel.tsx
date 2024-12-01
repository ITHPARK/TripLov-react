import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { css } from '@emotion/react'

const Carousel = ({ images }: { images: string[] }) => {
    return (
        <Swiper spaceBetween={10} css={containerSwiper}>
            {images.map((url, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img
                            src={url}
                            alt={`${index}이미지`}
                            css={iamgeStyles}
                        />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

const containerSwiper = css`
    padding: 0 24px;
    width: 500px;
`

const iamgeStyles = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
`

export default Carousel
