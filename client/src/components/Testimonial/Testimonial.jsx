import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    address: "Barcelona, Spain",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    rating: 5,
    review:
      "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!",
  },
  {
    id: 2,
    name: "Liam Johnson",
    address: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    rating: 4,
    review:
      "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!",
  },
  {
    id: 3,
    name: "Sophia Lee",
    address: "Seoul, South Korea",
    image:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
    rating: 5,
    review:
      "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results.",
  },
];

const Testimonial = () => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 pt-20 pb-15">
      <div className="text-center">
        <p className="text-4xl font-serif">What Our Guests Say</p>
        <p className="pt-3 text-gray-600 max-w-2xl mx-auto font-light outfit">
          Discover what makes Stayza the go-to option for those who demand
          only the best. Our guests trust us to provide exceptional stays that
          exceed expectations at every turn.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
          >
            <div className="flex items-center gap-3">
              <img
              loading="lazy"
                className="w-16 h-16 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl playfair">{testimonial.name}</p>
                <p className="text-gray-500 outfit">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {/* Star Rating */}
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={index < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-gray-500 mt-4 outfit">{`"${testimonial.review}"`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
