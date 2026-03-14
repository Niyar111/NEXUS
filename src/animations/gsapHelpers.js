import { gsap } from 'gsap';

/**
 * Fade and slide cards into view from below – staggered
 */
export const animateCards = (selector, delay = 0) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  gsap.fromTo(
    elements,
    { opacity: 0, y: 24, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      stagger: 0.08,
      delay,
      ease: 'power2.out',
    }
  );
};

/**
 * Fade a single element in
 */
export const fadeIn = (element, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.4, delay, ease: 'power2.out' }
  );
};

/**
 * Page entrance animation
 */
export const pageEnter = (element) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
  );
};

/**
 * Chart reveal – fade in from left
 */
export const animateChart = (element, delay = 0.1) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, x: -16 },
    { opacity: 1, x: 0, duration: 0.5, delay, ease: 'power2.out' }
  );
};

/**
 * Button press effect
 */
export const buttonPress = (element) => {
  if (!element) return;
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power1.inOut',
  });
};

/**
 * Animate a number counter
 */
export const animateCounter = (element, target, delay = 0) => {
  if (!element) return;
  const proxy = { value: 0 };
  gsap.to(proxy, {
    value: target,
    duration: 1.2,
    delay,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(proxy.value);
    },
  });
};

/**
 * Sidebar slide in animation
 */
export const sidebarEnter = (element) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { x: -24, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
  );
};
