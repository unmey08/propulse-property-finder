'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PropertyImageCarousel = ({ images, alt }) => {
    const [index, setIndex] = useState(0)

    if (!images || images.length === 0) {
        return null
    }

    const goTo = (i) => setIndex((i + images.length) % images.length)
    const prev = () => goTo(index - 1)
    const next = () => goTo(index + 1)

    return (
        <div className="rounded-xl shadow-md overflow-hidden bg-white">
            <div className="relative w-full h-72 sm:h-96 md:h-[28rem] overflow-hidden">
                <div
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {images.map((image, i) => (
                        <div key={i} className="relative w-full h-full flex-shrink-0">
                            <Image
                                src={`/images/properties/${image}`}
                                alt={`${alt} photo ${i + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 66vw"
                                className="object-cover"
                                priority={i === 0}
                            />
                        </div>
                    ))}
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow transition-colors"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow transition-colors"
                        >
                            <FaChevronRight />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to image ${i + 1}`}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${
                                        i === index ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/80'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-2">
                    {images.map((image, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Show image ${i + 1}`}
                            className={`relative aspect-square rounded-md overflow-hidden ring-2 transition-colors ${
                                i === index ? 'ring-blue-500' : 'ring-transparent hover:ring-gray-300'
                            }`}
                        >
                            <Image
                                src={`/images/properties/${image}`}
                                alt={`${alt} thumbnail ${i + 1}`}
                                fill
                                sizes="100px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PropertyImageCarousel
