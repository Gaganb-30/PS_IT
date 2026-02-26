import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 60,
    once = true,
    className = ''
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-80px' })

    const directions = {
        up: { y: distance, x: 0 },
        down: { y: -distance, x: 0 },
        left: { y: 0, x: distance },
        right: { y: 0, x: -distance },
        none: { y: 0, x: 0 }
    }

    const { x, y } = directions[direction] || directions.up

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, x, y, scale: direction === 'none' ? 0.95 : 1 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            {children}
        </motion.div>
    )
}
