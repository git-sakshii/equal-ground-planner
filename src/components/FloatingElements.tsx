import { motion } from 'framer-motion';
import { MapPin, Navigation, Coffee, Users } from 'lucide-react';

const FloatingElements = () => {
  const icons = [
    { Icon: MapPin, color: 'text-primary', delay: 0, x: '10%', y: '20%' },
    { Icon: Navigation, color: 'text-accent', delay: 0.5, x: '80%', y: '30%' },
    { Icon: Coffee, color: 'text-primary-glow', delay: 1, x: '15%', y: '70%' },
    { Icon: Users, color: 'text-accent', delay: 1.5, x: '85%', y: '75%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, color, delay, x, y }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0, 1.2, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        >
          <div className="relative">
            <Icon className="w-12 h-12" />
            <motion.div
              className="absolute inset-0 bg-current rounded-full blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;