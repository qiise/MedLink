
import { motion } from "framer-motion";
import { useEffect } from "react";

const Content = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Design Philosophy",
      description: "Creating experiences that blend form and function in perfect harmony.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
      title: "Thoughtful Details",
      description: "Every pixel is carefully considered to create a seamless experience.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    },
    {
      title: "Modern Innovation",
      description: "Pushing the boundaries of what's possible in digital design.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="mb-32 last:mb-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="inline-block px-4 py-1 bg-accent-light rounded-full text-sm text-gray-600">
                  Section {index + 1}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-600">
                  {section.description}
                </p>
              </div>
              <motion.div
                className={`relative overflow-hidden rounded-2xl ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Content;
